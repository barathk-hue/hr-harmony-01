import { Test, TestingModule } from '@nestjs/testing';
import { TimelogsController } from './timelogs.controller';
import { TimelogsService } from './timelogs.service';

describe('TimelogsController', () => {
  let controller: TimelogsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TimelogsController],
      providers: [TimelogsService],
    }).compile();

    controller = module.get<TimelogsController>(TimelogsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
