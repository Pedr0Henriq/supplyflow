import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service.js';

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: PrismaService) {}

  async getDashboardData() {
    const productsCount = await this.prisma.product.count();

    const clientsCount = await this.prisma.client.count();

    const financialGroup = await this.prisma.financial.groupBy({
      by: ['type'],
      _sum: {
        value: true,
      },
    });

    let revenue = 0;
    let expenses = 0;

    financialGroup.forEach((group) => {
      if (group.type === 'INCOME') {
        revenue = group._sum.value || 0;
      } else if (group.type === 'EXPENSE') {
        expenses = group._sum.value || 0;
      }
    });

    const balance = revenue - expenses;

    return {
      products: productsCount,
      clients: clientsCount,
      revenue,
      expenses,
      balance,
    };
  }
}