import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn
} from 'typeorm';

import { OneToMany } from 'typeorm';
import { Experience } from '../../experiences/entities/experience.entity';
import { WorkLog } from '../../worklogs/entities/worklog.entity';
import { LeaveRequest } from 'src/leaverequests/entities/leaverequest.entity';

@Entity('naatscorp_hr_employees')
export class Employee {

  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ unique: true, nullable: true })
  employee_code: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  department_id: number;

  @Column({ nullable: true })
  designation_id: number;

  @Column({ type: 'bigint' })
  reporting_manager_id: number;

  @Column({ type: 'date' })
  join_date: Date;

  @Column({ type: 'date', nullable: true })
  end_date: Date;

  @Column({
    type: 'enum',
    enum: ['full-time','part-time','contract','intern'],
    default: 'full-time'
  })
  employment_type: string;

  @Column({
    type: 'enum',
    enum: ['active','inactive'],
    default: 'active'
  })
  status: string;

  @Column({ type: 'text', nullable: true })
  address: string;

  /* Authentication */

  @Column({ unique: true })
  username: string;

  @Column()
  password_hash: string;

  @Column({
    type: 'enum',
    enum: ['admin','hr','manager','employee'],
    default: 'employee'
  })
  role: string;

  @Column({ default: true })
  must_change_password: boolean;

  @Column({
    type: 'enum',
    enum: ['active','disabled'],
    default: 'active'
  })
  account_status: string;

  @Column({ type: 'datetime', nullable: true })
  last_login: Date;

  @Column({ default: 0 })
  failed_login_attempts: number;

  @Column({ type: 'datetime', nullable: true })
  locked_until: Date;

  @Column({ type: 'datetime', nullable: true })
  password_changed_at: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Experience, (experience) => experience.employee)
  experiences: Experience[];

  @OneToMany(() => WorkLog, (worklog) => worklog.employee)
  worklogs: WorkLog[];

  @OneToMany(() => LeaveRequest, (leaveRequest) => leaveRequest.employee)
  leaveRequests: LeaveRequest[];
}