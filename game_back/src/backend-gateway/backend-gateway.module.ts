import { Module } from '@nestjs/common';
import { Players_Management } from './entities/players-management.service';
import { BackendGatewayGateway } from './backend-gateway.gateway';
import { Rooms } from './entities/room.service';

@Module({
  providers: [BackendGatewayGateway, Players_Management , Rooms],
})
export class BackendGatewayModule {}
