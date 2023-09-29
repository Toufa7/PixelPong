import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { GateWayModule } from './socket/gateaway.module';
// import { SocketGateway } from './socket/socket.gateway';

@Module({
  imports: [AuthModule, UsersModule, GateWayModule],
  providers: [],
})
export class AppModule {}
