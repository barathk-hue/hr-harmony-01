import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PermissionpoliciesService } from './permissionpolicies.service';
import { CreatePermissionpolicyDto } from './dto/create-permissionpolicy.dto';
import { UpdatePermissionpolicyDto } from './dto/update-permissionpolicy.dto';

@Controller('permissionpolicies')
export class PermissionpoliciesController {
  constructor(private readonly permissionpoliciesService: PermissionpoliciesService) {}

  @Post()
  create(@Body() createPermissionpolicyDto: CreatePermissionpolicyDto) {
    return this.permissionpoliciesService.create(createPermissionpolicyDto);
  }

  @Get()
  findAll() {
    return this.permissionpoliciesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.permissionpoliciesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePermissionpolicyDto: UpdatePermissionpolicyDto) {
    return this.permissionpoliciesService.update(+id, updatePermissionpolicyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.permissionpoliciesService.remove(+id);
  }
}
