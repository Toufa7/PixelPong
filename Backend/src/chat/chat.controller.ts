import { Controller, Get, Param } from '@nestjs/common';

import { PrismaService } from 'src/auth/prisma.service';
import { User } from '@prisma/client';

@Controller('chat')
export class ChatController {
    constructor(private readonly prisma: PrismaService) {}

    // @Get(':id')
    // async getMessages(@Param('id') id: string) {
    //     const dMSChat =  await this.prisma.DMschat.findMany({
    //         where: {
    //             SenderId: "34",
    //             ReceiverId: id,
    //         },
    //     });
    //     if (dMSChat)
    //         return dMSChat;
    //     else
    //     {  
    //         const dMSChat =  await this.prisma.DMschat.create({
    //             date : {
    //                 SenderId: "34",
    //                 ReceiverId: id,
    //             },
    //         });
    //         return dMSChat;
    //     }
    // }

    // @Get('friends')
    // async getFriends(@Param('id') id: string) {
    //     const friends = await this.prisma.DMschat.findMany({
    //         where: {
    //             SenderId : id
    //         }
    //     });
    //     return friends;
    // }
}
