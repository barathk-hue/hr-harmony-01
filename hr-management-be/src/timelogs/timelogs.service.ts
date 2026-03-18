import { Injectable } from '@nestjs/common';
import { CreateTimelogDto } from './dto/create-timelog.dto';
import { UpdateTimelogDto } from './dto/update-timelog.dto';

@Injectable()
export class TimelogsService {
  create(createTimelogDto: CreateTimelogDto) {
    return 'This action adds a new timelog';
  }

  findAll() {
    return `This action returns all timelogs`;
  }

  findOne(id: number) {
    return `This action returns a #${id} timelog`;
  }

  update(id: number, updateTimelogDto: UpdateTimelogDto) {
    return `This action updates a #${id} timelog`;
  }

  remove(id: number) {
    return `This action removes a #${id} timelog`;
  }
}
