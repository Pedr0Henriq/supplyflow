import { PartialType } from '@nestjs/swagger';
import { CreateFinancialDto } from './create-financial.dto.js';

export class UpdateFinancialDto extends PartialType(CreateFinancialDto) {}