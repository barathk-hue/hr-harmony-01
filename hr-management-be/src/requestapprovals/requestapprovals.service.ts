import { Injectable } from '@nestjs/common';
import { CreateRequestapprovalDto } from './dto/create-requestapproval.dto';
import { UpdateRequestapprovalDto } from './dto/update-requestapproval.dto';
import { RequestApproval } from './entities/requestapproval.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RequestapprovalsService {

  constructor(
    @InjectRepository(RequestApproval)
    private repo: Repository<RequestApproval>,
  ) {}

  create(dto: CreateRequestapprovalDto) {

    const approval = this.repo.create({
      ...dto,
      approver: { id: dto.approver_employee_id },
    });

    return this.repo.save(approval);
  }

  findAll() {
    return this.repo.find({
      relations: ['approver'],
    });
  }

  findOne(id: number) {
    return this.repo.findOne({
      where: { id },
      relations: ['approver'],
    });
  }

  findByRequest(requestType: string, requestId: number) {
    return this.repo.find({
      where: {
        request_type: requestType as any,
        request_id: requestId,
      },
      relations: ['approver'],
    });
  }

  async update(id: number, dto: UpdateRequestapprovalDto) {
    await this.repo.update(id, dto);
    return this.findOne(id);
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}
