import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Employee } from '../../employees/entities/employee.entity';

export enum PermissionStatus {
  PENDING_MANAGER = 'pending_manager',
  PENDING_HR = 'pending_hr',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  CANCELLED = 'cancelled',
}

@Entity('naatscorp_hr_permission_requests')
export class PermissionRequest {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Employee)
  @JoinColumn({ name: 'employee_id' })
  employee: Employee;

  @Column({ type: 'date' })
  date: Date;

  @Column({ type: 'time', nullable: true })
  from_time: string;

  @Column({ type: 'time', nullable: true })
  to_time: string;

  @Column({ type: 'decimal', precision: 4, scale: 2, nullable: true })
  hours: number;

  @Column({ type: 'text', nullable: true })
  reason: string;

  @Column({
    type: 'enum',
    enum: PermissionStatus,
    default: PermissionStatus.PENDING_MANAGER,
  })
  status: PermissionStatus;

  @Column({ type: 'datetime', nullable: true })
  applied_on: Date;

  @CreateDateColumn()
  created_at: Date;
}