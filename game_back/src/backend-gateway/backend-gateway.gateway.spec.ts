import { Test, TestingModule } from '@nestjs/testing';
import { BackendGatewayGateway } from './Game-gateway.gateway';
import { BackendGatewayService } from './entities/players-management.service';

describe('BackendGatewayGateway', () => {
  let gateway: BackendGatewayGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BackendGatewayGateway, BackendGatewayService],
    }).compile();

    gateway = module.get<BackendGatewayGateway>(BackendGatewayGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
