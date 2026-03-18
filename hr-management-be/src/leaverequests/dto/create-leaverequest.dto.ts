import { LeaveType } from '../../leavepolicies/entities/leavepolicy.entity';
import { LeaveDuration } from '../entities/leaverequest.entity';
import { HalfDaySession } from '../entities/leaverequest.entity';

export class CreateLeaverequestDto {

  employee_id: number;

  type: LeaveType;

  from_date: Date;

  to_date: Date;

  days?: number;

  leave_duration?: LeaveDuration;

  half_day_session?: HalfDaySession;

  reason?: string;
}