import { Module } from '@nestjs/common';
import { LeaverequestsService } from './leaverequests.service';
import { LeaverequestsController } from './leaverequests.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeaveRequest } from './entities/leaverequest.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LeaveRequest])],
  controllers: [LeaverequestsController],
  providers: [LeaverequestsService],
})
export class LeaverequestsModule {}
