import { Injectable } from '@nestjs/common';
import { CreateLeaverequestDto } from './dto/create-leaverequest.dto';
import { UpdateLeaverequestDto } from './dto/update-leaverequest.dto';
import { LeaveRequest } from './entities/leaverequest.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class LeaverequestsService {

  constructor(
    @InjectRepository(LeaveRequest)
    private repo: Repository<LeaveRequest>,
  ) {}

  create(dto: CreateLeaverequestDto) {
    const leave = this.repo.create({
      ...dto,
      employee: { id: dto.employee_id },
      applied_on: new Date(),
    });

    return this.repo.save(leave);
  }

  findAll() {
    return this.repo.find({
      relations: ['employee'],
    });
  }

  findOne(id: number) {
    return this.repo.findOne({
      where: { id },
      relations: ['employee'],
    });
  }

  findByEmployee(employeeId: number) {
    return this.repo.find({
      where: { employee: { id: employeeId } },
    });
  }

  async update(id: number, dto: UpdateLeaverequestDto) {
    await this.repo.update(id, dto);
    return this.findOne(id);
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}