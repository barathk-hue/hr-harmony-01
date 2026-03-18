import { Module } from '@nestjs/common';
import { LeavepoliciesService } from './leavepolicies.service';
import { LeavepoliciesController } from './leavepolicies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeavePolicy } from './entities/leavepolicy.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LeavePolicy])],
  controllers: [LeavepoliciesController],
  providers: [LeavepoliciesService],
})
export class LeavepoliciesModule {}
