import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('naatscorp_hr_employee_education')
export class Education {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  employee_id: number;

  @Column({ nullable: true })
  degree: string;

  @Column({ nullable: true })
  field_of_study: string;

  @Column({ nullable: true })
  institution: string;

  @Column({ type: 'year', nullable: true })
  start_year: number;

  @Column({ type: 'year', nullable: true })
  end_year: number;

  @Column({ nullable: true })
  grade: string;

  @CreateDateColumn()
  created_at: Date;
}