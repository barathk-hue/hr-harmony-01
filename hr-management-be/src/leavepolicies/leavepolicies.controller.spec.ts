import { Test, TestingModule } from '@nestjs/testing';
import { LeavepoliciesController } from './leavepolicies.controller';
import { LeavepoliciesService } from './leavepolicies.service';

describe('LeavepoliciesController', () => {
  let controller: LeavepoliciesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LeavepoliciesController],
      providers: [LeavepoliciesService],
    }).compile();

    controller = module.get<LeavepoliciesController>(LeavepoliciesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
