"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@kit/ui/dialog";
import { Button } from "@kit/ui/button";
import { Input } from "@kit/ui/input";
import { Label } from "@kit/ui/label";
import { FinancialService } from "../../lib/api/financial";
import type { Financial, FinancialType } from "../../lib/types/financial";
import { Loader2 } from "lucide-react";

const financialSchema = z.object({
  description: z.string().min(1, "A descrição é obrigatória"),
  value: z.coerce.number().min(0.01, "O valor deve ser maior que zero"),
  type: z.enum(["INCOME", "EXPENSE"], { required_error: "Selecione o tipo" }),
});

type FinancialFormValues = z.infer<typeof financialSchema>;

interface FinancialFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  transaction?: Financial | null;
}

export function FinancialFormModal({ isOpen, onClose, onSuccess, transaction }: FinancialFormModalProps) {
  const isEditing = !!transaction;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FinancialFormValues>({
    resolver: zodResolver(financialSchema),
    defaultValues: {
      description: "",
      value: 0,
      type: "INCOME",
    },
  });

  useEffect(() => {
    if (transaction && isOpen) {
      reset({
        description: transaction.description,
        value: transaction.value,
        type: transaction.type,
      });
    } else if (!transaction && isOpen) {
      reset({ description: "", value: 0, type: "INCOME" });
    }
  }, [transaction, isOpen, reset]);

  const onSubmit = async (data: FinancialFormValues) => {
    try {
      if (isEditing) {
        await FinancialService.update(transaction.id, data);
      } else {
        await FinancialService.create(data);
      }
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Erro ao salvar transação:", error);
      alert("Ocorreu um erro ao salvar a transação.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Editar Transação" : "Nova Transação"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Input id="description" placeholder="Ex: Venda de Licença" {...register("description")} />
            {errors.description && <span className="text-sm text-red-500">{errors.description.message}</span>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="value">Valor (R$)</Label>
              <Input id="value" type="number" step="0.01" {...register("value")} />
              {errors.value && <span className="text-sm text-red-500">{errors.value.message}</span>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Tipo</Label>
              <select
                id="type"
                className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                {...register("type")}
              >
                <option value="INCOME" className="text-zinc-900">Receita (Entrada)</option>
                <option value="EXPENSE" className="text-zinc-900">Despesa (Saída)</option>
              </select>
              {errors.type && <span className="text-sm text-red-500">{errors.type.message}</span>}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting} className="bg-purple-600 hover:bg-purple-700">
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isEditing ? "Atualizar" : "Salvar"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}