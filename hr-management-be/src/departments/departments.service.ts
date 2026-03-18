import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Department } from './entities/department.entity';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';

@Injectable()
export class DepartmentsService {

  constructor(
    @InjectRepository(Department)
    private departmentRepo: Repository<Department>,
  ) {}

  create(createDto: CreateDepartmentDto) {
    const dept = this.departmentRepo.create(createDto);
    return this.departmentRepo.save(dept);
  }

  findAll() {
    return this.departmentRepo.find();
  }

  findOne(id: number) {
    return this.departmentRepo.findOne({ where: { id } });
  }

  async update(id: number, updateDto: UpdateDepartmentDto) {
    await this.departmentRepo.update(id, updateDto);
    return this.findOne(id);
  }

  remove(id: number) {
    return this.departmentRepo.delete(id);
  }
}