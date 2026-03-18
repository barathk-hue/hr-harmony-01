import { IsEmail, IsOptional, IsString, IsEnum } from 'class-validator';

export class CreateEmployeeDto {

  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsOptional()
  phone?: string;

  @IsOptional()
  department_id?: number;

  @IsOptional()
  designation_id?: number;

  @IsOptional()
  reporting_manager_id?: number;

  join_date: Date;

  @IsOptional()
  end_date?: Date;

  @IsEnum(['full-time','part-time','contract','intern'])
  employment_type: string;

  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsEnum(['admin','hr','manager','employee'])
  role: string;
}