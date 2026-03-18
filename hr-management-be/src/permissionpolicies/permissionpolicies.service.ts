import { Injectable } from '@nestjs/common';
import { CreatePermissionpolicyDto } from './dto/create-permissionpolicy.dto';
import { UpdatePermissionpolicyDto } from './dto/update-permissionpolicy.dto';
import { PermissionPolicy } from './entities/permissionpolicy.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PermissionpoliciesService {

  constructor(
    @InjectRepository(PermissionPolicy)
    private repo: Repository<PermissionPolicy>,
  ) {}

  create(dto: CreatePermissionpolicyDto) {
    const policy = this.repo.create(dto);
    return this.repo.save(policy);
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: number) {
    return this.repo.findOne({ where: { id } });
  }

  async update(id: number, dto: UpdatePermissionpolicyDto) {
    await this.repo.update(id, dto);
    return this.findOne(id);
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}
