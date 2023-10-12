import { Module } from '@nestjs/common';
import { Players_Management } from './entities/players-management.service';
import { BackendGateway } from './Game-gateway.gateway';
import { Rooms } from './entities/room.service';
import { UsersModule } from 'src/users/users.module';
import { PrismaService } from 'src/auth/prisma.service';

@Module({
  imports : [UsersModule],
  providers: [BackendGateway, Players_Management , Rooms , PrismaService],
})
export class BackendGatewayModule {}
