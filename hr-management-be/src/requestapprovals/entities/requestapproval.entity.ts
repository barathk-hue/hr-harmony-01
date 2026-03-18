import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Employee } from '../../employees/entities/employee.entity';

export enum RequestType {
  LEAVE = 'leave',
  PERMISSION = 'permission',
}

export enum ApprovalStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

@Entity('naatscorp_hr_request_approvals')
export class RequestApproval {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: RequestType,
  })
  request_type: RequestType;

  @Column()
  request_id: number;

  @Column()
  approval_level: number;

  @ManyToOne(() => Employee)
  @JoinColumn({ name: 'approver_employee_id' })
  approver: Employee;

  @Column({
    type: 'enum',
    enum: ApprovalStatus,
    default: ApprovalStatus.PENDING,
  })
  status: ApprovalStatus;

  @Column({ type: 'text', nullable: true })
  comments: string;

  @Column({ type: 'datetime', nullable: true })
  action_date: Date;

  @CreateDateColumn()
  created_at: Date;
}