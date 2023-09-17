import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Profile ,VerifyCallback ,Strategy } from "passport-google-oauth20";
import { AuthService } from "../../auth/auth.service";
import { ConfigService } from "@nestjs/config";
import {config} from "dotenv";
import { request } from "http";

config();
@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, "google") {
    constructor(readonly authService: AuthService, readonly configService: ConfigService) {
        super({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URL,
            scope: ["email","profile"],
        });
    }
    async validate(accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback): Promise<any> {
        return await this.authService.validateUser(accessToken,refreshToken,profile, 1);
    }
}