import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Employee } from '../../employees/entities/employee.entity';
import { LeaveType } from '../../leavepolicies/entities/leavepolicy.entity';

export enum LeaveDuration {
  FULL = 'full_day',
  HALF = 'half_day',
}

export enum HalfDaySession {
  FIRST = 'first_half',
  SECOND = 'second_half',
}

export enum LeaveStatus {
  PENDING_MANAGER = 'pending_manager',
  PENDING_HR = 'pending_hr',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  CANCELLED = 'cancelled',
}

@Entity('naatscorp_hr_leave_requests')
export class LeaveRequest {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Employee)
  @JoinColumn({ name: 'employee_id' })
  employee: Employee;

  @Column({
    type: 'enum',
    enum: LeaveType,
  })
  type: LeaveType;

  @Column({ type: 'date' })
  from_date: Date;

  @Column({ type: 'date' })
  to_date: Date;

  @Column({ type: 'decimal', precision: 3, scale: 1, nullable: true })
  days: number;

  @Column({
    type: 'enum',
    enum: LeaveDuration,
    default: LeaveDuration.FULL,
  })
  leave_duration: LeaveDuration;

  @Column({
    type: 'enum',
    enum: HalfDaySession,
    nullable: true,
  })
  half_day_session: HalfDaySession;

  @Column({ type: 'text', nullable: true })
  reason: string;

  @Column({
    type: 'enum',
    enum: LeaveStatus,
    default: LeaveStatus.PENDING_MANAGER,
  })
  status: LeaveStatus;

  @Column({ type: 'datetime', nullable: true })
  applied_on: Date;

  @CreateDateColumn()
  created_at: Date;
}