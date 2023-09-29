import { Module } from '@nestjs/common';
import { SocketGateway } from './socket.gateway';
import { AuthModule } from '../auth/auth.module';
// import { AuthService } from 'src/auth/auth.service';

@Module({
  imports: [AuthModule],
  providers: [SocketGateway],
  exports: [SocketGateway],
})
export class GateWayModule {}
