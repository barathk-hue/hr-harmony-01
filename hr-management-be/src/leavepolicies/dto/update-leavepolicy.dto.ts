import { PartialType } from '@nestjs/mapped-types';
import { CreateLeavepolicyDto } from './create-leavepolicy.dto';

export class UpdateLeavepolicyDto extends PartialType(CreateLeavepolicyDto) {}
