import { Test, TestingModule } from '@nestjs/testing';
import { RequestapprovalsService } from './requestapprovals.service';

describe('RequestapprovalsService', () => {
  let service: RequestapprovalsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RequestapprovalsService],
    }).compile();

    service = module.get<RequestapprovalsService>(RequestapprovalsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
