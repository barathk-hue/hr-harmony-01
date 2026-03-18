import { PartialType } from '@nestjs/mapped-types';
import { CreateLeaverequestDto } from './create-leaverequest.dto';

export class UpdateLeaverequestDto extends PartialType(CreateLeaverequestDto) {}
