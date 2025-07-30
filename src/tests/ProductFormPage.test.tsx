import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProductFormPage from '../client/pages/ProductFormPage';
import * as createHook from '../client/hooks/useCreateProduct';
import * as updateHook from '../client/hooks/useUpdateProduct';
import * as productHook from '../client/hooks/useProduct';

/**
 * Teste de integração para o componente ProductFormPage. Utiliza
 * mocks de hooks de criação/atualização e busca de produto para
 * simular o comportamento real sem realizar chamadas HTTP.
 */
describe('ProductFormPage', () => {
  it('renderiza formulário e envia novo produto', async () => {
    // Mock para criação de produto
    const createSpy = jest.fn().mockResolvedValue({
      id: 1,
      tenant_id: 'tenant-1',
      nome: 'Produto Teste',
      descricao: 'Desc',
      preco: 10,
      categorias: ['cat'],
      formasPagamento: ['credito'],
      metas_por_etapa: { descoberta: 1 },
    });
    jest.spyOn(createHook, 'useCreateProduct').mockReturnValue({ createProduct: createSpy, loading: false, error: null });
    jest.spyOn(updateHook, 'useUpdateProduct').mockReturnValue({ updateProduct: jest.fn(), loading: false, error: null });
    jest.spyOn(productHook, 'useProduct').mockReturnValue({ product: null, loading: false, error: null });

    render(<ProductFormPage tenantId="tenant-1" />);

    // Preencher campos
    fireEvent.change(screen.getByLabelText(/Nome/i), { target: { value: 'Produto Teste' } });
    fireEvent.change(screen.getByLabelText(/Descrição/i), { target: { value: 'Desc' } });
    fireEvent.change(screen.getByLabelText(/Preço/i), { target: { value: '10' } });
    fireEvent.change(screen.getByLabelText(/Categorias/i), { target: { value: 'cat' } });
    fireEvent.change(screen.getByLabelText(/Formas de Pagamento/i), { target: { value: 'credito' } });
    // Metas por etapa (descoberta)
    const metaInputs = screen.getAllByRole('spinbutton');
    fireEvent.change(metaInputs[0], { target: { value: '1' } });

    // Submeter
    fireEvent.click(screen.getByRole('button', { name: /Salvar/i }));

    // Verificar se createProduct foi chamado
    await waitFor(() => {
      expect(createSpy).toHaveBeenCalled();
    });

    // Verificar se o preview é renderizado
    expect(await screen.findByText(/Preview do Produto/i)).toBeInTheDocument();
    expect(screen.getByText(/Produto Teste/i)).toBeInTheDocument();
  });
});