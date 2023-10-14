import { Module } from '@nestjs/common';
import { GroupchatController } from './groupchat.controller';
import { GroupchatService } from './groupchat.service';
import { JwtGuard } from 'src/guards/jwt.guards';
import { PrismaService } from 'src/auth/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [GroupchatController],
  providers: [GroupchatService,JwtGuard, PrismaService,JwtService]
})
export class GroupchatModule {}