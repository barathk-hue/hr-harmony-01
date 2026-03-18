import { Test, TestingModule } from '@nestjs/testing';
import { LeaverequestsController } from './leaverequests.controller';
import { LeaverequestsService } from './leaverequests.service';

describe('LeaverequestsController', () => {
  let controller: LeaverequestsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LeaverequestsController],
      providers: [LeaverequestsService],
    }).compile();

    controller = module.get<LeaverequestsController>(LeaverequestsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
