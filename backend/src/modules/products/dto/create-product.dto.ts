import { IsString, IsNumber, IsOptional, Min, IsNotEmpty } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ example: 'Teclado Mecânico', description: 'Nome do produto' })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiPropertyOptional({ example: 'Teclado switch brown', description: 'Descrição detalhada' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: 250.50, description: 'Preço unitário' })
  @IsNumber()
  @Min(0)
  price!: number;

  @ApiProperty({ example: 50, description: 'Quantidade em estoque' })
  @IsNumber()
  @Min(0)
  stock!: number;
}