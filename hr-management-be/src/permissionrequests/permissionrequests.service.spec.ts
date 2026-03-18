import { Test, TestingModule } from '@nestjs/testing';
import { PermissionrequestsService } from './permissionrequests.service';

describe('PermissionrequestsService', () => {
  let service: PermissionrequestsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PermissionrequestsService],
    }).compile();

    service = module.get<PermissionrequestsService>(PermissionrequestsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
