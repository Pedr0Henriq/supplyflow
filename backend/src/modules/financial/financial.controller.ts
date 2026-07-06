import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { FinancialService } from './financial.service.js';
import { CreateFinancialDto } from './dto/create-financial.dto.js';
import { UpdateFinancialDto } from './dto/update-financial.dto.js';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Financial')
@Controller('financial')
export class FinancialController {
  constructor(private readonly financialService: FinancialService) {}

  @Post()
  @ApiOperation({ summary: 'Criar uma nova transação financeira' })
  @ApiResponse({ status: 201, description: 'Transação criada com sucesso.' })
  create(@Body() createFinancialDto: CreateFinancialDto) {
    return this.financialService.create(createFinancialDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas as transações' })
  findAll() {
    return this.financialService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar uma transação pelo ID' })
  @ApiResponse({ status: 404, description: 'Transação não encontrada.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.financialService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar uma transação' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateFinancialDto: UpdateFinancialDto,
  ) {
    return this.financialService.update(id, updateFinancialDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletar uma transação' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.financialService.remove(id);
  }
}