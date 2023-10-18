import { Module } from '@nestjs/common';
import { GroupchatController } from './groupchat.controller';
import { GroupchatService } from './groupchat.service';
import { JwtGuard } from 'src/guards/jwt.guards';
import { PrismaService } from 'src/auth/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ScheduleModule } from '@nestjs/schedule';
import { GroupchatGateway } from './groupchat.gateway';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [ScheduleModule.forRoot(), PassportModule.register({ defaultStrategy: 'jwt' }),],
  controllers: [GroupchatController],
  providers: [GroupchatService,JwtGuard, PrismaService,JwtService, GroupchatGateway]
})
export class GroupchatModule {}