import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service.js';
import { CreateFinancialDto } from './dto/create-financial.dto.js';
import { UpdateFinancialDto } from './dto/update-financial.dto.js';

@Injectable()
export class FinancialService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateFinancialDto) {
    return this.prisma.financial.create({ data });
  }

  async findAll() {
    return this.prisma.financial.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number) {
    const transaction = await this.prisma.financial.findUnique({ where: { id } });
    if (!transaction) {
      throw new NotFoundException(`Transação financeira com ID ${id} não encontrada.`);
    }
    return transaction;
  }

  async update(id: number, data: UpdateFinancialDto) {
    await this.findOne(id);
    return this.prisma.financial.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.financial.delete({ where: { id } });
  }
}