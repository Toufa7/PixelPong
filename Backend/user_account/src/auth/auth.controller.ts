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
import { TokenBlacklistService } from './token-blacklist.service';
import { authenticator } from 'otplib';
import { diskStorage } from 'multer';
import { User, UserStatus } from '@prisma/client';
import { createReadStream, promises as fsPromises } from 'fs';
// import {fs} from 'extfs';

import * as qrcode from 'qrcode';

import { join } from 'path';
import { UserDto } from 'src/dto/user.dto';
import { PrismaService } from './prisma.service';
import { inputDto } from 'src/dto/input.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private usersService: UsersService,
    private Prismaservice: PrismaService,
    private readonly bantoken: TokenBlacklistService,
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

      if (user.firstlogin)
        return res.redirect('http://localhost:5173/settings');
      else{
        if(user.twofa)
          return res.redirect('http://localhost:5173/two-factor-authentication');
        return res.redirect('http://localhost:5173/home');
      }
    } catch (err) {
      console.log(err);
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
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
      // console.log('1st time loggin -> ', user.firstlogin);
      if (user.firstlogin)
        return res.redirect('http://localhost:5173/settings');
      else{
        if(user.twofa)
          return res.redirect('http://localhost:5173/two-factor-authentication');
        return res.redirect('http://localhost:5173/home');
      }
      // return res.redirect('signup-success');
    } catch (err) {
      console.log(err);
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }
  private setResandCookie(res, id, accessToken) {
    res
      .cookie('jwt', accessToken, { maxage: 3854654684, secure: false })
      .status(200);
    // .send('success');
  }
  @Get('2fa/set2fa')
  @UseGuards(JwtGuard)
  async setTwoFA(@Req() req) {
    const secret = authenticator.generateSecret();
    const otpauth = authenticator.keyuri(req.user.id, '2FA', secret);
    const qr = await qrcode.toDataURL(otpauth);
    await this.authService.set2Fasecret(req.user.id, secret, otpauth);
    return qr;
  }

  @Get('2fa/get2FAstatus')
  @UseGuards(JwtGuard)
  async gettwofastatus(@Req() req) {
    const user = await this.usersService.findOne(req.user.id);
    return user.twofa;
  }

  @Put('2fa/enable')
  @UseGuards(JwtGuard)
  async change2FAstatus(@Req() req) {
    await this.authService.changetwofastatus(req.user.id);
    return { status: true };
  }
  @Put('2fa/disable')
  @UseGuards(JwtGuard)
  async disabletwofa(@Req() req) {
    await this.authService.disabletwofastatus(req.user.username);
    return { status: false };
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
  UploadFile(@UploadedFile() file: Express.Multer.File, @Req() req) {
    this.authService.updateimage(file.filename, req.user.id);
    return { image: file };
  }
  @Post('2fa/validate')
  @UseGuards(JwtGuard)
  async validateOTP(@Body() body: inputDto, @Req() req, @Res() res) {
    const user = await this.usersService.findOne(req.user.id);
    const isValid = authenticator.check(body.otp, user.twofasecret);
    if (isValid) {
      user.authenticated = true;
      return res
        .status(200)
        .json({ message: 'OTP is valid. Allow the user to log in.' });
    } else {
      return res.status(400).json({ message: 'OTP is invalid. Deny access.' });
    }
  }

  @Get('avatar/:id')
  @UseGuards(JwtGuard)
  async getImage(@Param('id') id: string, @Res() res) {
    try {
      const { profileImage } = await this.usersService.findOne(id);
      const path = join('./uploads/', profileImage);
      await fsPromises.access(path, fsPromises.constants.F_OK);
      const file = createReadStream(path);
      const extension = profileImage.split('.')[1];
      res.setHeader('Content-Type', 'image/' + extension);
      return file.pipe(res);
    } catch (err) {
      res.setHeader('Content-Type', 'application/json');
      res.status(HttpStatus.NOT_FOUND).json('file not found');
    }
  }

  @Post('signup-success')
  @UseGuards(JwtGuard)
  async updateInfo(@Req() req, @Res() res, @Body() body: UserDto) {
    const { username } = body;

    const user = await this.authService.updateinfo(req.user.id, username);

    if (user) {
      return res.status(200).json({ message: 'User updated' });
    } else {
      return res.status(400).json({ message: 'User not updated' });
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
