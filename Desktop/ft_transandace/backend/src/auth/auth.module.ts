import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GoogleStrategy } from '../passport/Google-Strategy/google.strategy';
import { PrismaService } from './prisma.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports: [PassportModule, ConfigModule, JwtModule.register({
    secret: process.env.JWT_SECRET,
    signOptions: { expiresIn: '1d' },
  })],
  providers: [AuthService, PrismaService, PassportModule, GoogleStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
