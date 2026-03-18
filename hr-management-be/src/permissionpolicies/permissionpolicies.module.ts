import { Module } from '@nestjs/common';
import { PermissionpoliciesService } from './permissionpolicies.service';
import { PermissionpoliciesController } from './permissionpolicies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionPolicy } from './entities/permissionpolicy.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PermissionPolicy])],
  controllers: [PermissionpoliciesController],
  providers: [PermissionpoliciesService],
})
export class PermissionpoliciesModule {}
