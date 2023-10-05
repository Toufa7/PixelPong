import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GoogleStrategy } from '../passport/Google-Strategy/google.strategy';
import { PrismaService } from './prisma.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { fourtwoStrategy } from '../passport/42-Strategy/42.strategy';
import { JwtGuard } from '../guards/jwt.guards';
import { JwtStrategy } from '../passport/jwt-startegy/jwt.strategy';
import { UsersModule } from 'src/users/users.module';
import { TokenBlacklistService } from './token-blacklist.service';
@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    ConfigModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
    PassportModule.register({ defaultStrategy: '42' }),
    UsersModule,
  ],
  providers: [
    AuthService,
    PrismaService,
    PassportModule,
    TokenBlacklistService,
    GoogleStrategy,
    fourtwoStrategy,
    JwtGuard,
    JwtStrategy,
  ],
  controllers: [AuthController],
  exports: [
    AuthService,
    JwtModule,
    JwtStrategy,
    PassportModule,
    TokenBlacklistService,
  ],
})
export class AuthModule {}
