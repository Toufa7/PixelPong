import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ChatModule } from './chat/chat.module';
import { GateWayModule } from './socket/gateaway.module';
import { RelationModule } from './users/relation/relation.module';

@Module({
  imports: [AuthModule, UsersModule, ChatModule, GateWayModule, RelationModule],
  providers: [],
  controllers: [],
})
export class AppModule {}
