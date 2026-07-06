import { Module } from '@nestjs/common';
import { PrismaModule } from './common/prisma/prisma.module.js';
import { ProductsModule } from './modules/products/products.module.js';
import { ClientsModule } from './modules/clients/clients.module.js'
import { FinancialModule } from './modules/financial/financial.module.js';
import { DashboardModule } from './modules/dashboard/dashboard.module.js';

@Module({
  imports: [PrismaModule, ProductsModule, ClientsModule, FinancialModule, DashboardModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
