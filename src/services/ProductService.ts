/**
 * Este arquivo reexporta a implementação do serviço de produtos do
 * back‑end para ser utilizado pelo bot. Desta forma, evitamos
 * duplicação de lógica e garantimos que o bot sempre consulte os
 * dados reais armazenados no banco de dados (mesmo que simulados
 * nesta implementação em memória).
 */
import ProductService from '../server/services/ProductService';

export default ProductService;