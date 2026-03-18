import { Injectable } from '@nestjs/common';
import { CreatePermissionrequestDto } from './dto/create-permissionrequest.dto';
import { UpdatePermissionrequestDto } from './dto/update-permissionrequest.dto';
import { PermissionRequest } from './entities/permissionrequest.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PermissionrequestsService {

  constructor(
    @InjectRepository(PermissionRequest)
    private repo: Repository<PermissionRequest>,
  ) {}

  create(dto: CreatePermissionrequestDto) {

    const permission = this.repo.create({
      ...dto,
      employee: { id: dto.employee_id },
      applied_on: new Date(),
    });

    return this.repo.save(permission);
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

  async update(id: number, dto: UpdatePermissionrequestDto) {
    await this.repo.update(id, dto);
    return this.findOne(id);
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}
