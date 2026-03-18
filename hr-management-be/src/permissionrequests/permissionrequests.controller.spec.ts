import { Test, TestingModule } from '@nestjs/testing';
import { PermissionrequestsController } from './permissionrequests.controller';
import { PermissionrequestsService } from './permissionrequests.service';

describe('PermissionrequestsController', () => {
  let controller: PermissionrequestsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PermissionrequestsController],
      providers: [PermissionrequestsService],
    }).compile();

    controller = module.get<PermissionrequestsController>(PermissionrequestsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
