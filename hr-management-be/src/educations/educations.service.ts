import { Injectable } from '@nestjs/common';
import { CreateEducationDto } from './dto/create-education.dto';
import { UpdateEducationDto } from './dto/update-education.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Education } from './entities/education.entity';

@Injectable()
export class EducationsService {

  constructor(
    @InjectRepository(Education)
    private educationRepo: Repository<Education>,
  ) {}

  create(createDto: CreateEducationDto) {
    const education = this.educationRepo.create(createDto);
    return this.educationRepo.save(education);
  }

  findAll() {
    return this.educationRepo.find();
  }

  findOne(id: number) {
    return this.educationRepo.findOne({ where: { id } });
  }

  findByEmployee(employeeId: number) {
    return this.educationRepo.find({
      where: { employee_id: employeeId },
    });
  }

  async update(id: number, updateDto: UpdateEducationDto) {
    await this.educationRepo.update(id, updateDto);
    return this.findOne(id);
  }

  remove(id: number) {
    return this.educationRepo.delete(id);
  }
}