import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { AuthService } from "../../auth/auth.service";
import { ConfigService } from "@nestjs/config";
import { Profile ,VerifyCallback ,Strategy } from 'passport-42';
import {config} from "dotenv";
import { request } from "http";

config();
@Injectable()
export class fourtwoStrategy extends PassportStrategy(Strategy, "42") {
    constructor(readonly authService: AuthService, readonly configService: ConfigService) {
        super({
            clientID: process.env.FOURTWO_UID,
            clientSecret: process.env.FOURTWO_SEC,
            callbackURL: process.env.FOURTWO_URL,
        });
    }
    async validate(accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback): Promise<any> {
        return await this.authService.validateUser(accessToken,refreshToken,profile, 0);
    }
}