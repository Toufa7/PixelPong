import {HttpStatus,HttpException,StreamableFile, Body, Controller, Get,Post,Put,Req,Res, UploadedFile, UseGuards, UseInterceptors, Param, ParseUUIDPipe, Header, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtGuard } from '../guards/jwt.guards';
import { FileInterceptor } from '@nestjs/platform-express';
import { UsersService } from 'src/users/users.service';
import { TokenBlacklistService } from './token-blacklist.service';
import {authenticator, totp} from 'otplib';
import { diskStorage } from 'multer';
import { Extensions } from '@nestjs/graphql';
import { Prisma, PrismaClient, User } from '@prisma/client';
import { createReadStream, promises as fsPromises } from 'fs';
// import {fs} from 'extfs';


import * as qrcode from 'qrcode';

import { join } from 'path';
import { UserDto } from 'src/dto/user.dto';
import { Console, error } from 'console';
import { validate } from 'class-validator';
import { PrismaService } from './prisma.service';
import { inputDto } from 'src/dto/input.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, 
    private usersService: UsersService, private Prismaservice:PrismaService,
    private readonly bantoken:TokenBlacklistService) {}
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
    try {
      const acces_token = this.authService.fourtwoLogin(req.user);
      this.setResandCookie(res, req.user.id, acces_token.access_token);
      const user = await this.usersService.findOne(req.user.id);
      console.log("1st time loggin -> ",user.firstlogin);
      // if(!user.firstlogin) 
      //   return res.redirect('http://localhost:5173/settings');
      // return res.redirect('http://localhost:5173/home');
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
  @Get('2fa/set2fa')
  @UseGuards(JwtGuard)
  async setTwoFA(@Req() req, user: User)
  {
    // if(!user.twofa){
    //   throw new HttpException("2FA Not Enabled",HttpStatus.FORBIDDEN);
    // }
    try
    {
      const secret = authenticator.generateSecret();
      const otpauth = authenticator.keyuri(req.user.id, '2FA', secret);
      const qr = await qrcode.toDataURL(otpauth);
      await this.authService.set2FAsecret(req.user.id, secret,otpauth);
      return qr
    }
    catch(err)
    {
      console.log(err);
      throw new HttpException(err.message,HttpStatus.BAD_REQUEST);  
    }
    
  }
  @Put('2fa/enabled')
  @UseGuards(JwtGuard)
  async change2FAstatus(@Req() req)
  {
    await this.authService.changetwofastatus(req.user.id);
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
        const filename: string = (req.user as User).id;
        console.log("hhhh", filename);
      const extension = file.originalname.split('.')[1];
      cb(null,`${filename}.${extension}`);
    },
  }),
}))
  UploadFile(@UploadedFile() file :  Express.Multer.File, @Req() req) {
    console.log("file : ",file);
    this.authService.updateimage(file.filename, req.user.id);
    return {image: file};
  }


  @Post('2fa/validate')
  @UseGuards(JwtGuard)
  async validateOTP(@Body() body: inputDto, @Req() req, @Res() res){
    const user = await this.usersService.findOne(req.user.id);
    console.log("I Get this => ",body.otp);
    const isValid = authenticator.check(body.otp, user.twofasecret);
      if (isValid) {
      return {
        
        message: 'OTP is valid. Allow the user to log in.',
      };
    } else {
      return  res.status(400).json({ message: 'OTP is invalid. Deny access.' })
    }
  }

  @Get('avatar/:id')
  @UseGuards(JwtGuard)
  async getImage(@Param('id') id: string,@Res() res)
  {
    try {
      const {profileImage} = await this.usersService.findOne(id);
      const path = join("./uploads/", (profileImage));
      const access = await fsPromises.access(path, fsPromises.constants.F_OK);
      const file = createReadStream(path);
      console.log("image :", profileImage)
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
    console.log("intra 42",username);
    
    const user = await this.authService.updateinfo(req.user.id , username);
    
    if (user) {
      return res.status(200).json({ message: 'User updated' });
    } else {
      return res.status(400).json({ message: 'User not updated' });
    }
  }
  @Post('logout')
  @UseGuards(JwtGuard)
  async logout(@Req() req, @Res() res) {
    this.bantoken.addtokentoblacklist(req.cookies.jwt)
    res.clearCookie('jwt');
    return res.status(200).json({ message: 'User logged out' });
  }
}

