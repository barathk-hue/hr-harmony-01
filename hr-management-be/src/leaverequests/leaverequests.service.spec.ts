import { Test, TestingModule } from '@nestjs/testing';
import { LeaverequestsService } from './leaverequests.service';

describe('LeaverequestsService', () => {
  let service: LeaverequestsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LeaverequestsService],
    }).compile();

    service = module.get<LeaverequestsService>(LeaverequestsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
