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

  

}