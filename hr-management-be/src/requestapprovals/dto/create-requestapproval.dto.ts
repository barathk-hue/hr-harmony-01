import { RequestType, ApprovalStatus } from '../entities/requestapproval.entity';

export class CreateRequestapprovalDto {

  request_type: RequestType;

  request_id: number;

  approval_level: number;

  approver_employee_id: number;

  status?: ApprovalStatus;

  comments?: string;
}