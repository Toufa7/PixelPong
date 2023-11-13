import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ChatModule } from './chat/chat.module';
import { GateWayModule } from './socket/gateaway.module';
import { CronService } from './game/cron/cron.service';
import { BackendGatewayModule } from './game/backend-gateway/backend-gateway.module';
import { ScheduleModule } from '@nestjs/schedule';
import { UsersService } from './users/users.service';
import { PrismaService } from './auth/prisma.service';
import { GroupchatModule } from './groupchat/groupchat.module';
import { achievementService } from './users/gamedata/acheievement.service';

@Module({
  imports: [GroupchatModule, AuthModule, UsersModule, ChatModule, GateWayModule, BackendGatewayModule , ScheduleModule.forRoot(), GroupchatModule],
  providers: [CronService , UsersService , PrismaService],
  controllers: [],
})
export class AppModule {}
