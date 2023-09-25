import { Module } from '@nestjs/common';
import { Players_Management } from './players-management.service';
import { BackendGatewayGateway } from './backend-gateway.gateway';

@Module({
  providers: [BackendGatewayGateway, Players_Management],
})
export class BackendGatewayModule {}
