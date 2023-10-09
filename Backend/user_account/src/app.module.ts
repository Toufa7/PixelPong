import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ChatModule } from './chat/chat.module';
import { GateWayModule } from './socket/gateaway.module';
import { RelationModule } from './relation/relation.module';
import { CronService } from './game/cron/cron.service';
import { BackendGatewayModule } from './game/backend-gateway/backend-gateway.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [AuthModule, UsersModule, ChatModule, GateWayModule, BackendGatewayModule , ScheduleModule.forRoot()],
  providers: [CronService],
  controllers: [],
})
export class AppModule {}
