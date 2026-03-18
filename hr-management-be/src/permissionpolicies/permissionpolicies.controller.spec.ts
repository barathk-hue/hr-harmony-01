import { Test, TestingModule } from '@nestjs/testing';
import { PermissionpoliciesController } from './permissionpolicies.controller';
import { PermissionpoliciesService } from './permissionpolicies.service';

describe('PermissionpoliciesController', () => {
  let controller: PermissionpoliciesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PermissionpoliciesController],
      providers: [PermissionpoliciesService],
    }).compile();

    controller = module.get<PermissionpoliciesController>(PermissionpoliciesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
