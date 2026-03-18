import { Test, TestingModule } from '@nestjs/testing';
import { RequestapprovalsController } from './requestapprovals.controller';
import { RequestapprovalsService } from './requestapprovals.service';

describe('RequestapprovalsController', () => {
  let controller: RequestapprovalsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RequestapprovalsController],
      providers: [RequestapprovalsService],
    }).compile();

    controller = module.get<RequestapprovalsController>(RequestapprovalsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
