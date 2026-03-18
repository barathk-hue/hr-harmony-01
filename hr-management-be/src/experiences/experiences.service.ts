import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Experience } from './entities/experience.entity';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';

@Injectable()
export class ExperiencesService {

  constructor(
    @InjectRepository(Experience)
    private experienceRepo: Repository<Experience>,
  ) {}

  create(dto: CreateExperienceDto) {
    const experience = this.experienceRepo.create({
      ...dto,
      employee: { id: dto.employee_id },
    });

    return this.experienceRepo.save(experience);
  }

  findAll() {
    return this.experienceRepo.find({
      relations: ['employee'],
    });
  }

  findOne(id: number) {
    return this.experienceRepo.findOne({
      where: { id },
      relations: ['employee'],
    });
  }

  findByEmployee(employeeId: number) {
    return this.experienceRepo.find({
      where: { employee: { id: employeeId } },
    });
  }

  async update(id: number, dto: UpdateExperienceDto) {
    await this.experienceRepo.update(id, dto);
    return this.findOne(id);
  }

  remove(id: number) {
    return this.experienceRepo.delete(id);
  }
}