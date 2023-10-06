import { Global, Module } from '@nestjs/common';
import { SocketGateway } from './socket.gateway';
import { AuthModule } from '../auth/auth.module';
import { WSGuard } from 'src/guards/jwt.guards';
import { UsersModule } from 'src/users/users.module';
import { GateWayService } from './socket.service';
import { UsersService } from 'src/users/users.service';
import { PrismaService } from 'src/auth/prisma.service';
// import { AuthService } from 'src/auth/auth.service';

@Global()
@Module({
  imports: [AuthModule],
  providers: [GateWayService, SocketGateway, UsersService, PrismaService],
  exports: [GateWayService, SocketGateway],
})
export class GateWayModule {}
