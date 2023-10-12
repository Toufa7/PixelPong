import { Test, TestingModule } from '@nestjs/testing';
import { GameBackGateWay } from './Game-gateway.gateway';
// import { BackendGatewayGateway } from './Game-gateway.gateway';
// import { BackendGatewayService } from './entities/players-management.service';

describe('BackendGatewayGateway', () => {
  let gateway: GameBackGateWay;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GameBackGateWay, BackendGatewayService],
    }).compile();

    gateway = module.get<GameBackGateWay>(BackendGatewayGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
