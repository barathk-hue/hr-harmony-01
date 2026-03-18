import { WorkStatus } from '../entities/worklog.entity';

export class CreateWorklogDto {

  employee_id: number;

  work_date: Date;

  project_name?: string;

  task_title?: string;

  work_description?: string;

  hours_spent?: number;

  status?: WorkStatus;
}