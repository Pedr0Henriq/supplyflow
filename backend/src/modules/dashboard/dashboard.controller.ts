import { Controller, Get } from '@nestjs/common';
import { DashboardService } from './dashboard.service.js';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Dashboard')
@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get()
  @ApiOperation({ summary: 'Obter dados consolidados e métricas para o painel inicial' })
  @ApiResponse({ status: 200, description: 'Dados do dashboard retornados com sucesso.' })
  getDashboard() {
    return this.dashboardService.getDashboardData();
  }
}