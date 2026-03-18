import { Test, TestingModule } from '@nestjs/testing';
import { LeavepoliciesService } from './leavepolicies.service';

describe('LeavepoliciesService', () => {
  let service: LeavepoliciesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LeavepoliciesService],
    }).compile();

    service = module.get<LeavepoliciesService>(LeavepoliciesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
