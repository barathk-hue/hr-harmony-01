import { LeaveType } from '../entities/leavepolicy.entity';

export class CreateLeavepolicyDto {
  type: LeaveType;
  total_days: number;
  carry_forward?: boolean;
  max_carry_forward?: number;
}