import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/auth/prisma.service';

@Injectable()
export class ChatService {

  constructor(
    private readonly prisma: PrismaService,
    private jwtService: JwtService,
  ) { }


  //get old messages from dmschat
  async getOldMessages(idsender: string, idrecever: string) {

    //get userblock
    const userblock = await this.prisma.user.findUnique({
      where: {
        id: idrecever
      },
      select: {
        block: {
          select: {
            id: true
          }
        }
      }
    });
    if(userblock.block.find((element) => element.id === idsender))
    {
      console.log("userblock");
      return [];
    }
    return await this.prisma.dmschat.findMany({
      where: {
        OR: [
          {
            senderId: idsender,
            receiverId: idrecever
          },
          {
            senderId: idrecever,
            receiverId: idsender
          }
        ]
      },
      orderBy: {
        createdAt: 'asc'
      },
    });

  }
  //accept request to join game
  acceptrequestjoingame(idrequest: string, token: string) {
    return this.prisma.user.update({
      where: { id: idrequest },
      data: {
        tokenjoingame : token,
      },

    });
  }

  //refuse request to join game
  refuserequestjoingame(idrequest: string) {
    return this.prisma.user.update({
      where: { id: idrequest },
      data: {
        tokenjoingame : null,
      },
    });
  }
  

}