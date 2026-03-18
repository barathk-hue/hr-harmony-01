export class CreateExperienceDto {

  employee_id: number;

  company_name: string;

  designation?: string;

  start_date?: Date;

  end_date?: Date;

  responsibilities?: string;
}