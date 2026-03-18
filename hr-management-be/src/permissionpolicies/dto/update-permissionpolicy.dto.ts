import { PartialType } from '@nestjs/mapped-types';
import { CreatePermissionpolicyDto } from './create-permissionpolicy.dto';

export class UpdatePermissionpolicyDto extends PartialType(CreatePermissionpolicyDto) {}
