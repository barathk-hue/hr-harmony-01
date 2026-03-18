import { Injectable } from '@nestjs/common';
import { CreateLeavepolicyDto } from './dto/create-leavepolicy.dto';
import { UpdateLeavepolicyDto } from './dto/update-leavepolicy.dto';
import { LeavePolicy } from './entities/leavepolicy.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class LeavepoliciesService {

  constructor(
    @InjectRepository(LeavePolicy)
    private repo: Repository<LeavePolicy>,
  ) {}

  create(dto: CreateLeavepolicyDto) {
    const policy = this.repo.create(dto);
    return this.repo.save(policy);
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: number) {
    return this.repo.findOne({ where: { id } });
  }

  async update(id: number, dto: UpdateLeavepolicyDto) {
    await this.repo.update(id, dto);
    return this.findOne(id);
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}