import { PartialType } from '@nestjs/mapped-types';
import { CreatePermissionrequestDto } from './create-permissionrequest.dto';

export class UpdatePermissionrequestDto extends PartialType(CreatePermissionrequestDto) {}
