import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ChatModule } from './chat/chat.module';
import { GateWayModule } from './socket/gateaway.module';
import { RelationModule } from './relation/relation.module';
import { GroupchatModule } from './groupchat/groupchat.module';


@Module({
  imports: [AuthModule, UsersModule, ChatModule, GateWayModule, RelationModule, GroupchatModule],
  providers: [],
  controllers: [],
})
export class AppModule {}
