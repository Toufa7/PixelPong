import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Dmschat } from '@prisma/client';
import { PrismaService } from 'src/auth/prisma.service';

@Injectable()
export class ChatService {

  constructor(
    private readonly prisma: PrismaService,
    private jwtService: JwtService,
  ) { }


  //get old messages from dmschat
  async getOldMessages(idsender: string, idrecever: string): Promise<Dmschat[]> {

    //get userblock
    try {
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
    catch (err) {
      throw new HttpException("BAD_REQUEST", HttpStatus.BAD_REQUEST);
    }
  }


}