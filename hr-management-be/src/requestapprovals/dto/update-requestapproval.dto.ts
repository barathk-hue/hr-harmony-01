import { PartialType } from '@nestjs/mapped-types';
import { CreateRequestapprovalDto } from './create-requestapproval.dto';

export class UpdateRequestapprovalDto extends PartialType(CreateRequestapprovalDto) {}
