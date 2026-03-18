import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { WorkLog } from './entities/worklog.entity';
import { CreateWorklogDto } from './dto/create-worklog.dto';
import { UpdateWorklogDto } from './dto/update-worklog.dto';

@Injectable()
export class WorklogsService {

  constructor(
    @InjectRepository(WorkLog)
    private worklogRepo: Repository<WorkLog>,
  ) {}

  create(dto: CreateWorklogDto) {
    const worklog = this.worklogRepo.create({
      ...dto,
      employee: { id: dto.employee_id },
    });

    return this.worklogRepo.save(worklog);
  }

  findAll() {
    return this.worklogRepo.find({
      relations: ['employee'],
    });
  }

  findOne(id: number) {
    return this.worklogRepo.findOne({
      where: { id },
      relations: ['employee'],
    });
  }

  findByEmployee(employeeId: number) {
    return this.worklogRepo.find({
      where: { employee: { id: employeeId } },
    });
  }

  async update(id: number, dto: UpdateWorklogDto) {
    await this.worklogRepo.update(id, dto);
    return this.findOne(id);
  }

  remove(id: number) {
    return this.worklogRepo.delete(id);
  }
}