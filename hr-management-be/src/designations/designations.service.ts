import { Injectable } from '@nestjs/common';
import { CreateDesignationDto } from './dto/create-designation.dto';
import { UpdateDesignationDto } from './dto/update-designation.dto';
import { Designation } from './entities/designation.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class DesignationsService {

  constructor(
    @InjectRepository(Designation)
    private designationRepo: Repository<Designation>,
  ) {}

  create(dto: CreateDesignationDto) {
    const d = this.designationRepo.create(dto);
    return this.designationRepo.save(d);
  }

  findAll() {
    return this.designationRepo.find();
  }

  findOne(id: number) {
    return this.designationRepo.findOne({ where: { id } });
  }

  async update(id: number, dto: UpdateDesignationDto) {
    await this.designationRepo.update(id, dto);
    return this.findOne(id);
  }

  remove(id: number) {
    return this.designationRepo.delete(id);
  }
}