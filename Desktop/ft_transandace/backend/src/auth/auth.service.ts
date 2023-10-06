import { Injectable } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { JwtService } from "@nestjs/jwt";


@Injectable()
export class AuthService {
    constructor(private readonly prisma: PrismaService,
        private jwtService : JwtService) {}
    googleLogin(id : string) {
        const payload = { id };
        return {
          accesstoken: this.jwtService.sign(payload),
        }
      }
     fourtwologin(id : string) {
        const payload = { id };
        return {
          accesstoken: this.jwtService.sign(payload),
        }
      }
    async validateUser(accessToken: string, refreshToken: string, profile: any) {
        console.log("issam ostora");
        const {id  , emails, name} = profile;
        console.log(profile.name.givenName);
        const user = await this.prisma.user.create({
            data: {
                email: emails[0].value,
                username: name.givenName,
                token: accessToken,
            },
        });
        return user;
    }
}