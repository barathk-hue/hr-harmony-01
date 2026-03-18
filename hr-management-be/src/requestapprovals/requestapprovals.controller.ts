import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RequestapprovalsService } from './requestapprovals.service';
import { CreateRequestapprovalDto } from './dto/create-requestapproval.dto';
import { UpdateRequestapprovalDto } from './dto/update-requestapproval.dto';

@Controller('requestapprovals')
export class RequestapprovalsController {
  constructor(private readonly requestapprovalsService: RequestapprovalsService) {}

  @Post()
  create(@Body() createRequestapprovalDto: CreateRequestapprovalDto) {
    return this.requestapprovalsService.create(createRequestapprovalDto);
  }

  @Get()
  findAll() {
    return this.requestapprovalsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.requestapprovalsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRequestapprovalDto: UpdateRequestapprovalDto) {
    return this.requestapprovalsService.update(+id, updateRequestapprovalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.requestapprovalsService.remove(+id);
  }
}
