import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TimelogsService } from './timelogs.service';
import { CreateTimelogDto } from './dto/create-timelog.dto';
import { UpdateTimelogDto } from './dto/update-timelog.dto';

@Controller('timelogs')
export class TimelogsController {
  constructor(private readonly timelogsService: TimelogsService) {}

  @Post()
  create(@Body() createTimelogDto: CreateTimelogDto) {
    return this.timelogsService.create(createTimelogDto);
  }

  @Get()
  findAll() {
    return this.timelogsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.timelogsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTimelogDto: UpdateTimelogDto) {
    return this.timelogsService.update(+id, updateTimelogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.timelogsService.remove(+id);
  }
}
