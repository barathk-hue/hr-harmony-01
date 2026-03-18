import { Test, TestingModule } from '@nestjs/testing';
import { PermissionpoliciesService } from './permissionpolicies.service';

describe('PermissionpoliciesService', () => {
  let service: PermissionpoliciesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PermissionpoliciesService],
    }).compile();

    service = module.get<PermissionpoliciesService>(PermissionpoliciesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
