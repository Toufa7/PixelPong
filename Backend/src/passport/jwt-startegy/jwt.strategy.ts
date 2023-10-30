import { Strategy, ExtractJwt } from 'passport-jwt';
import {HttpStatus, HttpException} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { configDotenv } from 'dotenv';
// import { TokenBlacklistService } from '../../auth/token-blacklist.service';

configDotenv();

export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => {
          // //console.log(process.env.JWT_SECRET);
          return req.cookies['jwt'];
        },
      ]),
    });
    // //console.log(ExtractJwt.fromAuthHeaderAsBearerToken().toString);
  }
  async validate(payload: any) {
    try {
      return {
        id: payload.id,
        username: payload.username,
        email: payload.email,
        image: payload.profileImage,
      };
    } catch (e) {
        throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
  }
}
