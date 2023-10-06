import { Controller, Post, Body, Get, Req,Res,UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PrismaService } from './prisma.service';
import { AuthGuard } from '@nestjs/passport';
import {config} from "dotenv";


config();

@Controller('google')

// @Post('signup')
//     async function signin(@Body()) {

//     }

export class AuthController {
    // constructor (private readonly prisma: PrismaService){}
    constructor (private readonly authservice: AuthService){}
    @Get()
    @UseGuards(AuthGuard('google'))
    google() {}
    
    @Get('redirect')
    @UseGuards(AuthGuard('google'))
    googleRedirect(@Req() req) {
      return this.authservice.googleLogin(req.user.id);
    }

    @Get()
    @UseGuards(AuthGuard('google'))
    42() {}

    @Get('redirect')
    @UseGuards(AuthGuard('42'))
    Redirect42(@Req() req) {
      return this.authservice.fourtwologin(req.user.id);
    }
  }   
