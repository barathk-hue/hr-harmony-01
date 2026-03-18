import { Module } from '@nestjs/common';
import { PermissionrequestsService } from './permissionrequests.service';
import { PermissionrequestsController } from './permissionrequests.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionRequest } from './entities/permissionrequest.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PermissionRequest])],
  controllers: [PermissionrequestsController],
  providers: [PermissionrequestsService],
})
export class PermissionrequestsModule {}
