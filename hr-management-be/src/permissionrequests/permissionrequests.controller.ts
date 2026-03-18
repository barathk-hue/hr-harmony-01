import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PermissionrequestsService } from './permissionrequests.service';
import { CreatePermissionrequestDto } from './dto/create-permissionrequest.dto';
import { UpdatePermissionrequestDto } from './dto/update-permissionrequest.dto';

@Controller('permissionrequests')
export class PermissionrequestsController {
  constructor(private readonly permissionrequestsService: PermissionrequestsService) {}

  @Post()
  create(@Body() createPermissionrequestDto: CreatePermissionrequestDto) {
    return this.permissionrequestsService.create(createPermissionrequestDto);
  }

  @Get()
  findAll() {
    return this.permissionrequestsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.permissionrequestsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePermissionrequestDto: UpdatePermissionrequestDto) {
    return this.permissionrequestsService.update(+id, updatePermissionrequestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.permissionrequestsService.remove(+id);
  }
}
