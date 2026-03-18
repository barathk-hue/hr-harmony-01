import { Test, TestingModule } from '@nestjs/testing';
import { TimelogsService } from './timelogs.service';

describe('TimelogsService', () => {
  let service: TimelogsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TimelogsService],
    }).compile();

    service = module.get<TimelogsService>(TimelogsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
