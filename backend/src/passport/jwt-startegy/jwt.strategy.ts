import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from "@nestjs/passport";
import { config, configDotenv } from 'dotenv';

config();

export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor() {
        super({
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET,
            jwtFromRequest: ExtractJwt.fromExtractors([
                (req)=>{
                   return  req.cookies['jwt'];
                }
            ])
        })
        console.log(ExtractJwt.fromAuthHeaderAsBearerToken().toString);
    }
    async validate(payload: any) {
        console.log("what is going on  : ", payload)
        return { id: payload.sub, 
                username: payload.username,
                email: payload.email,
                image: payload.profileImage};
    }
}