import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LeaverequestsService } from './leaverequests.service';
import { CreateLeaverequestDto } from './dto/create-leaverequest.dto';
import { UpdateLeaverequestDto } from './dto/update-leaverequest.dto';

@Controller('leaverequests')
export class LeaverequestsController {
  constructor(private readonly leaverequestsService: LeaverequestsService) {}

  @Post()
  create(@Body() createLeaverequestDto: CreateLeaverequestDto) {
    return this.leaverequestsService.create(createLeaverequestDto);
  }

  @Get()
  findAll() {
    return this.leaverequestsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.leaverequestsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLeaverequestDto: UpdateLeaverequestDto) {
    return this.leaverequestsService.update(+id, updateLeaverequestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.leaverequestsService.remove(+id);
  }
}
