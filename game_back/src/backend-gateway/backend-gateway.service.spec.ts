import { Test, TestingModule } from '@nestjs/testing';
import { BackendGatewayService } from './players-management.service';

describe('BackendGatewayService', () => {
  let service: BackendGatewayService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BackendGatewayService],
    }).compile();

    service = module.get<BackendGatewayService>(BackendGatewayService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
