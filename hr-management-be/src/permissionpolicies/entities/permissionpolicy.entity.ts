import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('naatscorp_hr_permission_policies')
export class PermissionPolicy {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  max_per_month: number;

  @Column({ nullable: true })
  max_hours_per_permission: number;

  @Column({ nullable: true })
  min_gap_between_permissions: number;

  @CreateDateColumn()
  created_at: Date;
}