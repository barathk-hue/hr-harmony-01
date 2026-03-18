import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LeavepoliciesService } from './leavepolicies.service';
import { CreateLeavepolicyDto } from './dto/create-leavepolicy.dto';
import { UpdateLeavepolicyDto } from './dto/update-leavepolicy.dto';

@Controller('leavepolicies')
export class LeavepoliciesController {
  constructor(private readonly leavepoliciesService: LeavepoliciesService) {}

  @Post()
  create(@Body() createLeavepolicyDto: CreateLeavepolicyDto) {
    return this.leavepoliciesService.create(createLeavepolicyDto);
  }

  @Get()
  findAll() {
    return this.leavepoliciesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.leavepoliciesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLeavepolicyDto: UpdateLeavepolicyDto) {
    return this.leavepoliciesService.update(+id, updateLeavepolicyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.leavepoliciesService.remove(+id);
  }
}
