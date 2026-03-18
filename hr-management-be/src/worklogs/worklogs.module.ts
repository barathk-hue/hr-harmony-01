import { Module } from '@nestjs/common';
import { WorklogsService } from './worklogs.service';
import { WorklogsController } from './worklogs.controller';
import { WorkLog } from './entities/worklog.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([WorkLog])],
  controllers: [WorklogsController],
  providers: [WorklogsService],
})
export class WorklogsModule {}
