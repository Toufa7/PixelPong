import {
  HttpStatus,
  HttpException,
  Body,
  Controller,
  Get,
  Post,
  Put,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  Param,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtGuard } from '../guards/jwt.guards';
import { FileInterceptor } from '@nestjs/platform-express';
import { UsersService } from 'src/users/users.service';
import { authenticator } from 'otplib';
import { diskStorage } from 'multer';
import { User, UserStatus } from '@prisma/client';
import { createReadStream, promises as fsPromises } from 'fs';
import * as qrcode from 'qrcode';

import { join } from 'path';
import { UserDto } from 'src/authdto/user.dto';
import { PrismaService } from './prisma.service';
import { inputDto } from 'src/authdto/input.dto';
 
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private usersService: UsersService,
    private Prismaservice: PrismaService,
    // private readonly user: User,
  ) {}
  @Get('google')
  @UseGuards(AuthGuard('google'))
  googlelogin() {}
  @Get('google/redirect') 
  @UseGuards(AuthGuard('google'))
  async googleLogin(@Req() req: any, @Res() res: any) {
    try {
      const acces_token = this.authService.googleLogin(req.user);
      this.setResandCookie(res, req.user.id, acces_token.access_token);
      const user = await this.usersService.findOne(req.user.id);
      // Relace every hardcode URL with env variable that contain that url
      if (user.firstlogin)
        return res.redirect('http://localhost:5173/settings');
      else{
        if(user.twofa)
          return res.redirect('http://localhost:5173/two-factor-authentication');
        return res.redirect('http://localhost:5173/home');
      }
    } catch (err) {
      console.log(err);
      res.status(HttpStatus.BAD_REQUEST).json({ error: 'Something went wrong' });
    }
  }

  @Get('42')
  @UseGuards(AuthGuard('42'))
  fourtwLogin() {}
  @Get('42/redirect')
  @UseGuards(AuthGuard('42'))
  async fourtwoLogin(@Req() req: any, @Res() res: any) {
    try {
      const acces_token = this.authService.fourtwoLogin(req.user);
      this.setResandCookie(res, req.user.id, acces_token.access_token);
      const user = await this.usersService.findOne(req.user.id);
      if (user.firstlogin)
        return res.redirect('http://localhost:5173/settings');
      else{
        if(user.twofa)
          return res.redirect('http://localhost:5173/two-factor-authentication');
        return res.redirect('http://localhost:5173/home');
      }
    } catch (err) {
      console.log(err);
    }
  }
  private setResandCookie(res : any, id: string, accessToken: string) {
    res
      .cookie('jwt', accessToken, { maxage: 3854654684, secure: false })
      .status(200)
      // .json({ message: 'Cookie set successfully' });
  }
  @Get('2fa/set2fa')
  @UseGuards(JwtGuard)
  async setTwoFA(@Req() req: any) : Promise<string> {
    try{
    const secret = authenticator.generateSecret();
    const otpauth = authenticator.keyuri(req.user.id, '2FA', secret);
    const qr = await qrcode.toDataURL(otpauth);
    await this.authService.set2Fasecret(req.user.id, secret, otpauth);
    await this.usersService.isauthenticated(req.user.id, false);
    return qr;
    }
    catch(error){
      console.log(error.message);
    }
  }

  @Get('2fa/get2FAstatus')
  @UseGuards(JwtGuard)
  async gettwofastatus(@Req() req: any): Promise<boolean>{
    try {
      const user = await this.usersService.findOne(req.user.id);
      return user?.twofa;
    } catch (error) {
      console.error(error);
    }
  }
  @Put('2fa/enable')
async enable2FAStatus(@Req() req: any): Promise<{ status: boolean }> {
  try {
    await this.authService.change2FAStatus(req.user.id);
    return { status: true };
  } catch (error) {
    console.error(error);
  }
}
  @Put('2fa/disable')
  @UseGuards(JwtGuard)
  async disable2FAStatus(@Req() req: any): Promise<{ status: boolean }> {
    try {
      await this.authService.disable2FAStatus(req.user.username);
      return { status: false };
    } catch (error) {
      console.error(error); 
    }
  }
  @Post('uploads')
  @UseGuards(JwtGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const filename: string = (req.user as User).id;
          const extension = file.originalname.split('.')[1];
          cb(null, `${filename}.${extension}`);
        },
      }),
    }),
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Req() req: any): Promise<{ image: Express.Multer.File }> {
    try {
      this.authService.updateimage(file.filename, req.user.id);
      return { image: file };
    } catch (error) {
      console.error(error); // Log the error for debugging
    }
  }
  @Post('2fa/validate')
  @UseGuards(JwtGuard)
  async validateOTP(@Body() body: inputDto, @Req() req, @Res() res) {
    const user = await this.usersService.findOne(req.user.id);
    const isValid = authenticator.check(body.otp, user.twofasecret);
    if (isValid) {
      await this.usersService.isauthenticated(req.user.id, true);
      return res
        .status(200)
        .json({ message: 'OTP is valid. Allow the user to log in.' });
    } else {
      return res.status(400).json({ message: 'OTP is invalid. Deny access.' });
    }
  }

  @Get('avatar/:id')
  @UseGuards(JwtGuard)
  async getImage(@Param('id') id: string, @Res() res, @Req() req) {
    const user = await this.usersService.findOne(id);
    console.log("user",user)
    try {
      console.log("id",id);
      const path = join('./uploads/', user.profileImage);
      console.log("path"+path);
      await fsPromises.access(path, fsPromises.constants.F_OK);
      const file = createReadStream(path);
      const extension = user.profileImage.split('.')[1];
      res.setHeader('Content-Type', 'image/' + extension);
      return file.pipe(res);
    } catch (err) {
      res.setHeader('Content-Type', 'application/json');
      return res.status(400);
    }
  }

  @Post('updateprofil')
  @UseGuards(JwtGuard)
  async updateInfo(@Req() req, @Res() res, @Body() body: UserDto) {
    const { username } = body;

    const user = await this.authService.updateinfo(req.user.id, username);

    if (user) {
      return res.status(HttpStatus.OK).json({ message: 'User updated' });
    } else {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: 'User not updated' });
    }
  }
  @Post('logout')
  @UseGuards(JwtGuard)
  async logout(@Req() req, @Res() res) {
    res.clearCookie('jwt');
    const status = UserStatus.OFFLINE;
    await this.usersService.updatestatus(req.user, status);
    return res.status(200).json({ message: 'User logged out' });
  }
}
