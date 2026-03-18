import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Employee } from '../../employees/entities/employee.entity';

export enum WorkStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in-progress',
  COMPLETED = 'completed',
}

@Entity('naatscorp_hr_work_logs')
export class WorkLog {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Employee, (employee) => employee.worklogs, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'employee_id' })
  employee: Employee;

  @Column({ type: 'date' })
  work_date: Date;

  @Column({ nullable: true })
  project_name: string;

  @Column({ nullable: true })
  task_title: string;

  @Column({ type: 'text', nullable: true })
  work_description: string;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  hours_spent: number;

  @Column({
    type: 'enum',
    enum: WorkStatus,
    default: WorkStatus.PENDING,
  })
  status: WorkStatus;

  @CreateDateColumn()
  created_at: Date;
}