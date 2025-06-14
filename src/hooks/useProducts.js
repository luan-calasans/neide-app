import { useState, useEffect } from 'react';
import { fetchProducts, fetchCategories, generateSalesData } from '../services/api';

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([{ name: 'Todos', count: 0 }]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    loadData();
  }, [retryCount]);

  const loadData = async () => {
    console.log('🚀 Carregando dados da loja...');
    setLoading(true);
    setError(null);
    
    try {
      // Buscar produtos
      const produtos = await fetchProducts();
      
      if (produtos.length === 0) {
        if (retryCount < 3) {
          console.log(`⚠️ Tentativa ${retryCount + 1} falhou, tentando novamente...`);
          setRetryCount(prev => prev + 1);
          return;
        }
        setError('Nenhum produto encontrado');
      } else {
        setProducts(produtos);
        setRetryCount(0); // Reset retry count on success
      }
      
      // Buscar categorias
      let cats = await fetchCategories();
      // Atualizar o count da categoria 'Todos' para o total de produtos
      if (cats.length > 0) {
        cats = cats.map(cat =>
          cat.name === 'Todos' ? { ...cat, count: produtos.length } : cat
        );
      }
      setCategories(cats);
      
    } catch (err) {
      console.error('Erro no hook:', err);
      if (retryCount < 3) {
        console.log(`⚠️ Tentativa ${retryCount + 1} falhou, tentando novamente...`);
        setRetryCount(prev => prev + 1);
        return;
      }
      setError('Erro ao carregar loja');
      setProducts([]);
      setCategories([{ name: 'Todos', count: 0 }]);
    }
    
    setLoading(false);
  };

  const getSalesData = (period = 'mes') => {
    return generateSalesData(products, period);
  };

  const getProductsByCategory = (categoryId) => {
    if (!categoryId) return products; // 'Todos' ou null
    return products.filter(p => p.categoryId === categoryId);
  };

  const searchProducts = (searchText, categoryId = null) => {
    let filtered = getProductsByCategory(categoryId);
    
    if (searchText.trim()) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchText.toLowerCase())
      );
    }
    
    return filtered;
  };

  return {
    products,
    categories,
    loading,
    error,
    getSalesData,
    getProductsByCategory,
    searchProducts,
    refetch: () => {
      setRetryCount(0);
      loadData();
    }
  };
}; 