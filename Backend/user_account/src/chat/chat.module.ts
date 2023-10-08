import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { JwtGuard } from 'src/guards/jwt.guards';
import { PrismaService } from 'src/auth/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ChatGateway } from './chat.gateway';

@Module({
  controllers: [],
  providers: [ChatGateway,ChatService,JwtGuard, PrismaService,JwtService]
})
export class ChatModule {}
