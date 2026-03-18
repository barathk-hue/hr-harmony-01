import { Module } from '@nestjs/common';
import { RequestapprovalsService } from './requestapprovals.service';
import { RequestapprovalsController } from './requestapprovals.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestApproval } from './entities/requestapproval.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RequestApproval])],
  controllers: [RequestapprovalsController],
  providers: [RequestapprovalsService],
})
export class RequestapprovalsModule {}
