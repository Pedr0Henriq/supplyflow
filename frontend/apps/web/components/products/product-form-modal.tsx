"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@kit/ui/dialog";
import { Button } from "@kit/ui/button";
import { Input } from "@kit/ui/input";
import { Label } from "@kit/ui/label";
import { ProductsService } from "../../lib/api/products";
import type { Product } from "../../lib/types/product";
import { Loader2 } from "lucide-react";

const productSchema = z.object({
  name: z.string().min(1, "O nome é obrigatório"),
  description: z.string().optional(),
  price: z.coerce.number().min(0.01, "O preço deve ser maior que zero"),
  stock: z.coerce.number().min(0, "O estoque não pode ser negativo"),
});

type ProductFormValues = z.infer<typeof productSchema>;

interface ProductFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  product?: Product | null;
}

export function ProductFormModal({ isOpen, onClose, onSuccess, product }: ProductFormModalProps) {
  const isEditing = !!product;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      stock: 0,
    },
  });

  // Preenche o formulário ao abrir para edição
  useEffect(() => {
    if (product && isOpen) {
      reset({
        name: product.name,
        description: product.description || "",
        price: product.price,
        stock: product.stock,
      });
    } else if (!product && isOpen) {
      reset({ name: "", description: "", price: 0, stock: 0 });
    }
  }, [product, isOpen, reset]);

  const onSubmit = async (data: ProductFormValues) => {
    try {
      if (isEditing) {
        await ProductsService.update(product.id, data);
      } else {
        await ProductsService.create(data);
      }
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Erro ao salvar produto:", error);
      alert("Ocorreu um erro ao salvar o produto.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Editar Produto" : "Novo Produto"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome do Produto</Label>
            <Input id="name" placeholder="Ex: Teclado Mecânico" {...register("name")} />
            {errors.name && <span className="text-sm text-red-500">{errors.name.message}</span>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Input id="description" placeholder="Ex: Switch Brown..." {...register("description")} />
            {errors.description && <span className="text-sm text-red-500">{errors.description.message}</span>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Preço (R$)</Label>
              <Input id="price" type="number" step="0.01" {...register("price")} />
              {errors.price && <span className="text-sm text-red-500">{errors.price.message}</span>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="stock">Estoque</Label>
              <Input id="stock" type="number" {...register("stock")} />
              {errors.stock && <span className="text-sm text-red-500">{errors.stock.message}</span>}
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