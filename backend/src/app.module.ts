import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
// import { SocketModule } from './socket/socket.module';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [AuthModule, UsersModule, ChatModule],
  providers: [],
  controllers: [],
})
export class AppModule {}
