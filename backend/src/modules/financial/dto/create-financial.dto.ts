import { IsString, IsNumber, IsEnum, IsNotEmpty, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { FinancialType } from '@prisma/client';

export class CreateFinancialDto {
  @ApiProperty({ example: 'Venda de Licença', description: 'Descrição da transação' })
  @IsString()
  @IsNotEmpty()
  description!: string;

  @ApiProperty({ example: 1500.00, description: 'Valor da transação' })
  @IsNumber()
  @Min(0.01)
  value!: number;

  @ApiProperty({ enum: FinancialType, example: FinancialType.INCOME, description: 'Tipo da transação (INCOME ou EXPENSE)' })
  @IsEnum(FinancialType)
  @IsNotEmpty()
  type!: FinancialType;
}