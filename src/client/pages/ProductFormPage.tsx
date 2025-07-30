import React, { useState, useEffect } from 'react';
import { useCreateProduct } from '../hooks/useCreateProduct';
import { useUpdateProduct } from '../hooks/useUpdateProduct';
import { useProduct } from '../hooks/useProduct';
import { productSchema, type ProductInput } from '../schemas/productSchema';
import ProductPreview from '../components/ProductPreview';

interface ProductFormPageProps {
  /**
   * Opcionalmente define o ID do produto a ser editado. Quando presente
   * o formulário atua em modo de edição. Quando ausente, cria‑se um
   * novo produto.
   */
  productId?: string | number;
  /**
   * Identificador do tenant em uso. O front‑end deve passar este valor
   * para que o produto seja associado corretamente ao B2B logado.
   */
  tenantId: string;
}

/**
 * Página de formulário responsável por criar ou editar produtos. Ela
 * decide dinamicamente se deve buscar um produto existente e qual
 * mutação executar (criar ou atualizar) com base na presença de
 * `productId`. Utiliza validação com Zod para garantir integridade.
 */
const ProductFormPage: React.FC<ProductFormPageProps> = ({ productId, tenantId }) => {
  const { product } = useProduct(productId ?? undefined);
  const { createProduct } = useCreateProduct();
  const { updateProduct } = useUpdateProduct();

  const [formData, setFormData] = useState<ProductInput>({
    tenant_id: tenantId,
    nome: '',
    descricao: '',
    preco: undefined,
    categorias: [],
    formasPagamento: [],
    metas_por_etapa: {},
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [savedProduct, setSavedProduct] = useState<any>(null);

  // Preenche os campos ao entrar em modo de edição
  useEffect(() => {
    if (product) {
      setFormData({
        tenant_id: product.tenant_id,
        nome: product.nome,
        descricao: product.descricao ?? '',
        preco: product.preco,
        categorias: product.categorias ?? [],
        formasPagamento: product.formasPagamento ?? [],
        metas_por_etapa: product.metas_por_etapa ?? {},
      });
    }
  }, [product]);

  // Manipula alterações em campos simples
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === 'categorias' || name === 'formasPagamento') {
      // Dividir valores separados por vírgula e eliminar espaços extras
      setFormData((prev) => ({
        ...prev,
        [name]: value
          .split(',')
          .map((s) => s.trim())
          .filter((s) => s.length > 0),
      }));
    } else if (name === 'preco') {
      setFormData((prev) => ({
        ...prev,
        preco: value === '' ? undefined : parseFloat(value),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Manipula alterações nos campos de metas, convertendo valores para número
  const handleMetaChange = (etapa: string, value: string) => {
    const numeric = value === '' ? undefined : parseInt(value, 10);
    setFormData((prev) => ({
      ...prev,
      metas_por_etapa: {
        ...prev.metas_por_etapa,
        [etapa]: numeric === undefined ? 0 : numeric,
      },
    }));
  };

  // Submete o formulário. Valida os dados e chama o hook correto.
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    try {
      const parsed = productSchema.parse(formData);
      let result;
      if (productId) {
        result = await updateProduct(productId, parsed);
      } else {
        result = await createProduct(parsed);
      }
      setSavedProduct(result);
    } catch (err: any) {
      // Captura erros de validação do Zod
      if (err.errors) {
        const fieldErrors: Record<string, string> = {};
        err.errors.forEach((e: any) => {
          const path = e.path?.[0];
          if (path) fieldErrors[path] = e.message;
        });
        setErrors(fieldErrors);
      } else {
        // Erro inesperado (ex.: falha na API)
        setErrors({ geral: err.message ?? 'Ocorreu um erro desconhecido' });
      }
    }
  };

  // Renderização condicional: preview se salvo, formulário caso contrário
  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">
        {productId ? 'Editar Produto' : 'Cadastrar Produto'}
      </h1>
      {savedProduct ? (
        <ProductPreview product={savedProduct} />
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="nome">
              Nome
            </label>
            <input
              id="nome"
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              className="border rounded px-2 py-1 w-full"
              required
            />
            {errors.nome && <p className="text-red-500 text-sm">{errors.nome}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="descricao">
              Descrição
            </label>
            <textarea
              id="descricao"
              name="descricao"
              value={formData.descricao}
              onChange={handleChange}
              className="border rounded px-2 py-1 w-full"
            />
            {errors.descricao && <p className="text-red-500 text-sm">{errors.descricao}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="preco">
              Preço (R$)
            </label>
            <input
              id="preco"
              type="number"
              name="preco"
              min="0"
              step="0.01"
              value={formData.preco ?? ''}
              onChange={handleChange}
              className="border rounded px-2 py-1 w-full"
            />
            {errors.preco && <p className="text-red-500 text-sm">{errors.preco}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="categorias">
              Categorias (separadas por vírgula)
            </label>
            <input
              id="categorias"
              type="text"
              name="categorias"
              value={formData.categorias.join(', ')}
              onChange={handleChange}
              className="border rounded px-2 py-1 w-full"
            />
            {errors.categorias && <p className="text-red-500 text-sm">{errors.categorias}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="formasPagamento">
              Formas de Pagamento (separadas por vírgula)
            </label>
            <input
              id="formasPagamento"
              type="text"
              name="formasPagamento"
              value={formData.formasPagamento.join(', ')}
              onChange={handleChange}
              className="border rounded px-2 py-1 w-full"
            />
            {errors.formasPagamento && (
              <p className="text-red-500 text-sm">{errors.formasPagamento}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Metas por Etapa</label>
            {['descoberta', 'consideracao', 'fechamento'].map((etapa) => (
              <div key={etapa} className="flex items-center space-x-2 mb-2">
                <label className="w-32 capitalize" htmlFor={`meta-${etapa}`}>
                  {etapa}
                </label>
                <input
                  id={`meta-${etapa}`}
                  type="number"
                  min="0"
                  name={`meta-${etapa}`}
                  value={(formData.metas_por_etapa as any)[etapa] ?? ''}
                  onChange={(e) => handleMetaChange(etapa, e.target.value)}
                  className="border rounded px-2 py-1 flex-grow"
                />
              </div>
            ))}
            {errors.metas_por_etapa && (
              <p className="text-red-500 text-sm">{errors.metas_por_etapa}</p>
            )}
          </div>
          {errors.geral && <p className="text-red-500 text-sm">{errors.geral}</p>}
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            {productId ? 'Atualizar' : 'Salvar'}
          </button>
        </form>
      )}
    </div>
  );
};

export default ProductFormPage;