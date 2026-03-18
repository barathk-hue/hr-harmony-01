import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

export enum LeaveType {
  CASUAL = 'casual',
  SICK = 'sick',
  EARNED = 'earned',
  MATERNITY = 'maternity',
  PATERNITY = 'paternity',
}

@Entity('naatscorp_hr_leave_policies')
export class LeavePolicy {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: LeaveType,
  })
  type: LeaveType;

  @Column()
  total_days: number;

  @Column({ default: false })
  carry_forward: boolean;

  @Column({ default: 0 })
  max_carry_forward: number;

  @CreateDateColumn()
  created_at: Date;
}