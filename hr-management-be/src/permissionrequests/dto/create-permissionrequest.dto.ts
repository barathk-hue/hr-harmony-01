import { PermissionStatus } from '../entities/permissionrequest.entity';

export class CreatePermissionrequestDto {

  employee_id: number;

  date: Date;

  from_time?: string;

  to_time?: string;

  hours?: number;

  reason?: string;

  status?: PermissionStatus;
}