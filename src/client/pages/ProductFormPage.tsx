// ===============================
// File: src/client/pages/ProductFormPage.tsx
// ===============================

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema } from "../schemas/productSchema";
import type { ProductFormData } from "../schemas/productSchema";
import { useProductForm } from "../hooks/useProductForm";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { useParams, useNavigate } from "react-router-dom";

export default function ProductFormPage() {
  const { id } = useParams();
  const isEditing = Boolean(id);
  const navigate = useNavigate();

  const {
    product,
    isSaving,
    fetchProduct,
    saveProduct,
    resetForm,
  } = useProductForm(id);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: product ?? {},

  });

    useEffect(() => {
    if (isEditing) fetchProduct();
    }, [id, isEditing, fetchProduct]);

    useEffect(() => {
    if (product) reset(product);
    }, [product, reset]);

  const onSubmit = async (data: ProductFormData, shouldReset = false) => {
    await saveProduct(data);
    if (shouldReset) {
      resetForm();
      reset();
    } else {
      navigate("/products");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">
        {isEditing ? "Editar Produto" : "Cadastrar Produto"}
      </h1>

      <form onSubmit={handleSubmit((data: ProductFormData) => onSubmit(data))}>
        <Card className="mb-4">
          <CardContent className="space-y-4 p-6">
            <div>
              <Label htmlFor="nome">Nome</Label>
              <Input id="nome" {...register("nome")} />
              {errors.nome && (
                <p className="text-sm text-red-500">{errors.nome.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="descricao">Descrição</Label>
              <Input id="descricao" {...register("descricao")} />
              {errors.descricao && (
                <p className="text-sm text-red-500">
                  {errors.descricao.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="preco">Preço</Label>
              <Input
                type="number"
                step="0.01"
                id="preco"
                {...register("preco", { valueAsNumber: true })}
              />
              {errors.preco && (
                <p className="text-sm text-red-500">{errors.preco.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="formas_pagamento">
                Formas de pagamento (separadas por vírgula)
              </Label>
              <Input id="formas_pagamento" {...register("formas_pagamento_raw")} />
              {errors.formas_pagamento_raw && (
                <p className="text-sm text-red-500">
                  {errors.formas_pagamento_raw.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="categoria">Categoria</Label>
              <Input id="categoria" {...register("categoria")} />
              {errors.categoria && (
                <p className="text-sm text-red-500">
                  {errors.categoria.message}
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-4">
          <Button type="submit" disabled={isSaving}>
            Salvar
          </Button>

          <Button
            type="button"
            variant="secondary"
            onClick={handleSubmit((data: ProductFormData) =>
              onSubmit(data, true)
            )}
            disabled={isSaving}
          >
            Salvar e adicionar outro
          </Button>

          <Button
            type="button"
            variant="ghost"
            onClick={() => navigate("/products")}
          >
            Cancelar
          </Button>
        </div>
      </form>
    </div>
  );
}
