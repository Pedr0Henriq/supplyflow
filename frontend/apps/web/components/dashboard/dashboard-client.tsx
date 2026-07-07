"use client";

import { useEffect, useState } from "react";
import { DashboardService } from "../../lib/api/dashboard";
import type { DashboardData } from "../../lib/types/dashboard";
import { Card, CardContent, CardHeader, CardTitle } from "@kit/ui/card";
import { Package, Users, TrendingUp, TrendingDown, Wallet, Loader2 } from "lucide-react";

export function DashboardClient() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setIsLoading(true);
        const summary = await DashboardService.getSummary();
        setData(summary);
      } catch (err) {
        setError("Não foi possível carregar as métricas do dashboard. Verifique se a API está rodando.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (isLoading) {
    return (
      <div className="flex h-[50vh] flex-col items-center justify-center space-y-4">
        <Loader2 className="h-10 w-10 animate-spin text-purple-500" />
        <p className="text-sm font-medium text-muted-foreground animate-pulse">Carregando métricas...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-6 text-center text-red-500 shadow-sm">
          <p className="font-medium">{error}</p>
        </div>
      </div>
    );
  }

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight dark:text-zinc-100">Dashboard</h2>
        <p className="text-muted-foreground">
          Visão geral do seu ERP SupplyFlow.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        <Card className="border-purple-500/10 shadow-sm transition-all hover:shadow-md dark:bg-zinc-950/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Produtos</CardTitle>
            <div className="rounded-full bg-purple-100 p-2 dark:bg-purple-900/30">
              <Package className="h-4 w-4 text-purple-600 dark:text-purple-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.products}</div>
          </CardContent>
        </Card>

        <Card className="border-purple-500/10 shadow-sm transition-all hover:shadow-md dark:bg-zinc-950/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clientes Ativos</CardTitle>
            <div className="rounded-full bg-purple-100 p-2 dark:bg-purple-900/30">
              <Users className="h-4 w-4 text-purple-600 dark:text-purple-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.clients}</div>
          </CardContent>
        </Card>

        <Card className="border-emerald-500/10 shadow-sm transition-all hover:shadow-md dark:bg-zinc-950/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receitas</CardTitle>
            <div className="rounded-full bg-emerald-100 p-2 dark:bg-emerald-900/30">
              <TrendingUp className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
              {formatCurrency(data.revenue)}
            </div>
          </CardContent>
        </Card>

        <Card className="border-rose-500/10 shadow-sm transition-all hover:shadow-md dark:bg-zinc-950/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Despesas</CardTitle>
            <div className="rounded-full bg-rose-100 p-2 dark:bg-rose-900/30">
              <TrendingDown className="h-4 w-4 text-rose-600 dark:text-rose-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-rose-600 dark:text-rose-400">
              {formatCurrency(data.expenses)}
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-500/10 shadow-sm transition-all hover:shadow-md dark:bg-zinc-950/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Saldo Atual</CardTitle>
            <div className="rounded-full bg-blue-100 p-2 dark:bg-blue-900/30">
              <Wallet className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {formatCurrency(data.balance)}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}