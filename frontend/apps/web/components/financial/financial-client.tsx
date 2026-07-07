"use client";

import { useEffect, useState } from "react";
import { FinancialService } from "../../lib/api/financial";
import type { Financial } from "../../lib/types/financial";
import { FinancialFormModal } from "./financial-form-modal";
import { Button } from "@kit/ui/button";
import { Input } from "@kit/ui/input";
import { Card, CardContent, CardHeader } from "@kit/ui/card";
import { Plus, Search, Pencil, Trash2, Loader2, Wallet, ArrowDownCircle, ArrowUpCircle } from "lucide-react";

export function FinancialClient() {
  const [transactions, setTransactions] = useState<Financial[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<Financial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<Financial | null>(null);

  const fetchTransactions = async () => {
    try {
      setIsLoading(true);
      const data = await FinancialService.findAll();
      setTransactions(data);
      setFilteredTransactions(data);
    } catch (error) {
      console.error("Erro ao buscar transações:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  useEffect(() => {
    const lowerSearch = search.toLowerCase();
    setFilteredTransactions(
      transactions.filter((t) => t.description.toLowerCase().includes(lowerSearch))
    );
  }, [search, transactions]);

  const handleOpenCreate = () => {
    setSelectedTransaction(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (transaction: Financial) => {
    setSelectedTransaction(transaction);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm("Tem certeza que deseja excluir este registro financeiro?")) {
      try {
        await FinancialService.remove(id);
        fetchTransactions();
      } catch (error) {
        console.error("Erro ao excluir:", error);
        alert("Não foi possível excluir o registro.");
      }
    }
  };

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);

  const renderTypeBadge = (type: string) => {
    if (type === "INCOME") {
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-500">
          <ArrowUpCircle className="h-3 w-3" /> Receita
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-rose-500/10 px-2.5 py-0.5 text-xs font-semibold text-rose-500">
        <ArrowDownCircle className="h-3 w-3" /> Despesa
      </span>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Financeiro</h2>
          <p className="text-muted-foreground">Controle de receitas e despesas do sistema.</p>
        </div>
        <Button onClick={handleOpenCreate} className="bg-purple-600 hover:bg-purple-700">
          <Plus className="mr-2 h-4 w-4" /> Novo Lançamento
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center space-x-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar pela descrição..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="max-w-sm border-0 focus-visible:ring-0 px-0 shadow-none bg-transparent"
            />
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex h-40 items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-purple-500" />
            </div>
          ) : filteredTransactions.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-40 text-muted-foreground">
              <Wallet className="h-10 w-10 mb-2 opacity-20" />
              <p>Nenhuma transação encontrada.</p>
            </div>
          ) : (
            <div className="relative w-full overflow-auto">
              <table className="w-full caption-bottom text-sm">
                <thead className="[&_tr]:border-b">
                  <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Descrição</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Tipo</th>
                    <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">Valor</th>
                    <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">Ações</th>
                  </tr>
                </thead>
                <tbody className="[&_tr:last-child]:border-0">
                  {filteredTransactions.map((transaction) => (
                    <tr key={transaction.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                      <td className="p-4 align-middle font-medium">{transaction.description}</td>
                      <td className="p-4 align-middle">{renderTypeBadge(transaction.type)}</td>
                      <td className={`p-4 align-middle text-right font-semibold ${transaction.type === 'INCOME' ? 'text-emerald-500' : 'text-rose-500'}`}>
                        {transaction.type === 'INCOME' ? '+' : '-'}{formatCurrency(transaction.value)}
                      </td>
                      <td className="p-4 align-middle text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" onClick={() => handleOpenEdit(transaction)}>
                            <Pencil className="h-4 w-4 text-blue-500" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDelete(transaction.id)}>
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      <FinancialFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={fetchTransactions}
        transaction={selectedTransaction}
      />
    </div>
  );
}