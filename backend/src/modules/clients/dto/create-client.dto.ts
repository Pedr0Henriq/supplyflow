import { IsString, IsEmail, IsOptional, IsNotEmpty } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateClientDto {
  @ApiProperty({ example: 'João da Silva', description: 'Nome completo do cliente' })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({ example: 'joao@email.com', description: 'E-mail do cliente (deve ser único)' })
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @ApiPropertyOptional({ example: '83999999999', description: 'Telefone para contato' })
  @IsString()
  @IsOptional()
  phone?: string;
}