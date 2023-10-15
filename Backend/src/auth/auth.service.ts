import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { JwtService } from '@nestjs/jwt';
import { User, UserStatus } from '@prisma/client';
import { UsersService } from 'src/users/users.service';
//import { exit } from "process";
// import { CookiesService } from '@nestjsplus/cookies';

interface Payload {
  id: string;
  username: string;
  email: string;
  image?: string;
  token: string;
}
@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}
  private generatePayload(user: User) {
    const payload: Payload = {
      id: user.id,
      username: user.username,
      email: user.email,
      token: user.token,
    };
    if (user.profileImage) payload.image = user.profileImage;
    return payload;
  }
  googleLogin(user: User) {
    const payload = this.generatePayload(user);
    const access_token = this.jwtService.sign(payload);
    return { access_token };
  }
  fourtwoLogin(user: User) {
    const payload = this.generatePayload(user);
    const access_token = this.jwtService.sign(payload);
    return { access_token };
  }

  async validateUser(
    accessToken: string,
    refreshToken: string,
    profile: any,
    type: number,
  ): Promise<User> {
    const { id, emails, name, _json, username, photos } = profile;
    const photo = type === 1 ? photos[0].value : _json.image.link;
    const name_ = type === 1 ? name.givenName : username;
    console.log(emails[0])
    let user = await this.usersService.findOneByEmail(emails[0]?.value);
    if (!user) {
      user = await this.prisma.user.create({
        data: {
          email: emails[0].value,
          username: name_,
          token: accessToken,
          profileImage: photo,
          status: UserStatus.ONLINE,
        },
      });
    } else this.usersService.updatestatus(user, null);
    return user;
  }

  async updateinfo(id: string, username: string): Promise<User | null> {
    try {
      const user = await this.prisma.user.update({
        where: {
          id: id,
        },
        data: {
          username: username,
        },
      });
      return user;
    } catch (error) {
      console.error(error); 
      return null; 
    }
  }
  
  async change2FAStatus(id: string): Promise<void> {
    try {
      await this.prisma.user.update({
        where: {
          id: id,
        },
        data: {
          twofa: true,
        },
      });
    } catch (error) {
      console.error(error); // Log the error for debugging
      throw new Error('Failed to change 2FA');
    }
  }
  // async set2Fastatus(id: string, secret: string, token: string){
  //     await this.prisma.user.update({
  //     where:{
  //         id: id
  //     },
  //     data:{
  //         twofa: true,
  //     }
  // })

  // }

  async disable2FAStatus(username: string): Promise<void> {
    try {
      await this.prisma.user.update({
        where: {
          username,
        },
        data: {
          twofa: false,
          twofasecret: null,
          twofatoken: null,
        },
      });
    } catch (error) {
      console.error(error); // Log the error for debugging
      throw new Error('Failed to disable 2FA');
    }
  }
  
  async set2Fasecret(id: string, secret: string, token: string): Promise<void> {
    try {
      await this.prisma.user.update({
        where: {
          id: id,
        },
        data: {
          twofasecret: secret,
          twofatoken: token,
        },
      });
    } catch (error) {
      console.error(error); // Log the error for debugging
      throw new Error('Failed to set 2FA');
    }
  }
  
  async updateimage(image: string, id: string): Promise<void> {
    try {
      await this.prisma.user.update({
        where: {
          id: id,
        },
        data: {
          profileImage: image,
        },
      });
    } catch (error) {
      console.error(error); // Log the error for debugging
      throw new Error('Failed to update image');
    }
  }
}
//add profile
