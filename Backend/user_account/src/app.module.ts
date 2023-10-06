import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ChatModule } from './chat/chat.module';
import { GateWayModule } from './socket/gateaway.module';
@Module({
  imports: [AuthModule, UsersModule, GateWayModule, ChatModule],
  providers: [],
  controllers: [],
})
export class AppModule {}
