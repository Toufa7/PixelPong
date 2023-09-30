import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { configDotenv } from 'dotenv';
import { TokenBlacklistService } from '../../auth/token-blacklist.service';

configDotenv();

export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly banedtoken: TokenBlacklistService) {
    super({
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => {
          console.log(process.env.JWT_SECRET);
          return req.cookies['jwt'];
        },
      ]),
    });
    console.log(ExtractJwt.fromAuthHeaderAsBearerToken().toString);
  }
  async validate(payload: any) {
    try {
      // if(this.banedtoken.verifybanedtoken(payload.token))
      //     throw new Error("token is baned");
      console.log('what is going on  : ', payload);
      return {
        id: payload.sub,
        username: payload.username,
        email: payload.email,
        image: payload.profileImage,
        token: payload.token,
      };
    } catch (e) {
      console.log(e);
    }
  }
}
