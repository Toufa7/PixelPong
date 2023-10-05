import { Module } from '@nestjs/common';
import { SocketGateway } from './socket.gateway';
import { AuthModule } from '../auth/auth.module';
import { WSGuard } from 'src/guards/jwt.guards';
import { UsersModule } from 'src/users/users.module';
// import { AuthService } from 'src/auth/auth.service';

@Module({
  imports: [AuthModule, UsersModule],
  providers: [SocketGateway, WSGuard],
  exports: [SocketGateway],
})
export class GateWayModule {}
