import { Module } from '@nestjs/common';
import { Players_Management } from './entities/players-management.service';
import { BackendGateway } from './backend-gateway.gateway';
import { Rooms } from './entities/room.service';

@Module({
  providers: [BackendGateway, Players_Management , Rooms],
})
export class BackendGatewayModule {}
