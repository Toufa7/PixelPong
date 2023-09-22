import { Injectable } from "@nestjs/common";
import { Controller, Post, UploadedFile, UseInterceptors, Req } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PrismaService } from "./prisma.service";
import { JwtService } from "@nestjs/jwt";
import { User, UserStatus } from "@prisma/client";
import { UsersService } from "src/users/users.service";
//import { exit } from "process";
// import { CookiesService } from '@nestjsplus/cookies';

interface Payload {
    sub: string;
    username: string;
    email: string;
    image?: string;
}
@Injectable()
export class AuthService {
    constructor(private readonly prisma: PrismaService,
        private jwtService : JwtService, private usersService: UsersService) {}
        private generatePayload(user: User) {
            const payload: Payload = {
                sub: user.id,
                username: user.username,
                email: user.email
            }
            if(user.profileImage)
                payload.image = user.profileImage;
            return payload;
        }
        googleLogin(user: User) {
            const payload =  this.generatePayload(user);
            const access_token = this.jwtService.sign(payload);
            return {access_token};
        }
        fourtwoLogin(user: User) {
            const payload =  this.generatePayload(user);
            const access_token = this.jwtService.sign(payload);
            return {access_token};
        }

    async validateUser(accessToken: string, refreshToken: string, profile: any, type: number): Promise<User> {
        const {id,emails, name, _json, username,photos} = profile;
        const photo = type === 1 ? photos[0].value : _json.image.link;
        const name_ = type === 1 ? name.givenName : username;
        // console.log(emails[0])
        let user : User = await this.usersService.findOneByEmail(emails[0].value);
        if(!user)
        {
        user = await this.prisma.user.create({
            data: {
                email: emails[0].value,
                username: name_,
                token: accessToken,
                profileImage: photo,
                status: UserStatus.ONLINE,
            },
        });
    }

    else
        this.usersService.updatestatus(user)
    return user;
}

    async updateinfo(id, username) {
        const user = await this.prisma.user.update({
            where: {
                id :id,
            },
            data: {
                username: username,
                profileImage:  username +".jepg",
            },
        });
        return user;
    }
    async changetwofastatus(id: string, secret: string, token: string){
        await this.prisma.user.update({
        where:{
            username: id
        },
        data:{
            twofa: true,
            twofasecret: secret,
            twofatoken: token,
        }
    })

    }

    async disabletwofastatus(username: string){
        await this.prisma.user.update({
        where:{
            username
        },
        data:{
            twofa: false,
            twofasecret: null,
            twofatoken: null,
        }
    })

    }

    async updateimage(image: string, id: string){
        await this.prisma.user.update({
            where:{
                id:id
                },
            data:{
                profileImage: image,
            }
        })
    }
    
}

//add profile
