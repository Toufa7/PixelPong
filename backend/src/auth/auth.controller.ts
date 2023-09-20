import {HttpStatus,HttpException,StreamableFile, Body, Controller, Get,Post,Put,Req,Res, UploadedFile, UseGuards, UseInterceptors, Param, ParseUUIDPipe, Header, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtGuard } from '../guards/jwt.guards';
import { FileInterceptor } from '@nestjs/platform-express';
import { UsersService } from 'src/users/users.service';
import {authenticator, totp} from 'otplib';
import { diskStorage } from 'multer';
import { Extensions } from '@nestjs/graphql';
import { Prisma, PrismaClient, User } from '@prisma/client';
import { createReadStream,promises as fsPromises } from 'fs';
import * as qrcode from 'qrcode';

import { join } from 'path';
import { UserDto } from 'src/dto/user.dto';
import { error } from 'console';
import { validate } from 'class-validator';
import { PrismaService } from './prisma.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, 
    private usersService: UsersService, private Prismaservice:PrismaService) {}
    @Get('google')
    @UseGuards(AuthGuard('google'))
    googlelogin(){}
    @Get('google/redirect')
    @UseGuards(AuthGuard('google'))
    googleLogin(@Req () req: any, @Res() res: any) {
      try{
        const acces_token = this.authService.googleLogin(req.user);
        this.setResandCookie(res, req.user.id ,acces_token.access_token);
      
        return res.redirect('signup-success');
      }
      catch(err)
      {
        console.log(err);
        throw new HttpException(err.message,HttpStatus.BAD_REQUEST);
      }
    }

    @Get('42')
    @UseGuards(AuthGuard('42'))
    fourtwLogin(){}
    @Get('42/redirect')
    @UseGuards(AuthGuard('42'))
    async fourtwoLogin(@Req () req: any, @Res() res: any) {
      try{
      const acces_token = this.authService.fourtwoLogin(req.user);
      this.setResandCookie(res, req.user.id ,acces_token.access_token);
      const user = await this.usersService.findOne(req.user.id);
      console.log("daaaaaaaaaaaaaaaaaaaaaaaaaamnd ",user.firstlogin);
      if(!user.firstlogin) 
        return res.redirect('done');
      return res.redirect('signup-success');
      }
      catch(err)
      {
        console.log(err);
        throw new HttpException(err.message,HttpStatus.BAD_REQUEST);
      }
    }
    private setResandCookie(res, id,accessToken) {
        res   
          .cookie('jwt', accessToken, { maxage:3854654684, secure: false })
          .status(200)
          // .send('success');
    }
  @Get('2fa/enable')
  @UseGuards(JwtGuard)
  async changetwofa(@Req() req)
  {
    const secret = authenticator.generateSecret();
    const otpauth = authenticator.keyuri(req.user.username, '2FA', secret);
    console.log(otpauth);
    const qr = await qrcode.toDataURL(otpauth);
    await this.authService.changetwofastatus(req.user.username, secret,otpauth);
    return qr
  }
  @Post('2fa/disable')
  @UseGuards(JwtGuard)
  async disabletwofa(@Req() req)
  {
    await this.authService.disabletwofastatus(req.user.username);
  }
  @Post('uploads')
  @UseGuards(JwtGuard)
  @UseInterceptors(FileInterceptor('file',
  {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        console.log("damnnn : ",__dirname);
        const filename: string = (req.user as User).username;
      const extension = file.originalname.split('.')[1];
      cb(null,`${filename}.${extension}`);
    },
  }),
}))
  UploadFile(@UploadedFile() file, @Req() req) {
    this.authService.updateimage(file.filename, req.user.username);
    return {image: file.filename};
  }


  @Post('2fa/validate')
  async validateOTP(@Body('otp') otp: string, @Req() req){
    const user = await this.usersService.findOne(req.user.username);
    console.log(user);
    const isValid = authenticator.check(otp, user.twofatoken);
    if (isValid) {
      return 'OTP is valid. Allow the user to log in.';
    } else {
      return 'OTP is invalid. Deny access.';
    }
  }

  @Get('avatar/:profileImage')
  @UseGuards(JwtGuard)
  async getImage(@Param('profileImage') profileImage: string,@Res() res)
  {
    try {
      const path = join("./uploads/", profileImage);
      await fsPromises.access(path, fsPromises.constants.F_OK);
      const file = createReadStream(path);
      const fileStream = new StreamableFile(file);
      const extension = profileImage.split('.')[1];
      res.setHeader('Content-Type', 'image/'+extension);
      return file.pipe(res);
    } catch (err) {
      res.setHeader('Content-Type', 'application/json');
      res.status(HttpStatus.NOT_FOUND).json('file not found');
    }
  }

  @Post('signup-success')
  @UseGuards(JwtGuard)
  async updateInfo(@Req() req, @Res() res, @Body() body: UserDto) {
    const { username} = body;
    console.log("intra 42",req.user.id);
    
    const user = await this.authService.updateinfo(req.user.id , username);
    
    if (user) {
      return res.status(200).json({ message: 'User updated' });
    } else {
      return res.status(400).json({ message: 'User not updated' });
    }
  }
}

