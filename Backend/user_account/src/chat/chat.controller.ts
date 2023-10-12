import { Controller, Get, Param } from '@nestjs/common';

import { PrismaService } from 'src/auth/prisma.service';
import { User } from '@prisma/client';

@Controller('chat')
export class ChatController {
    constructor(private readonly prisma: PrismaService) {}

    //get old messages between two users
    @Get(':id')
    
}
