import { useState, useEffect } from 'react';
import { fetchProducts, fetchCategories, generateSalesData } from '../services/api';

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([{ name: 'Todos', count: 0 }]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    console.log('🚀 Carregando dados da loja...');
    setLoading(true);
    setError(null);
    
    try {
      // Buscar produtos
      const produtos = await fetchProducts();
      setProducts(produtos);
      console.log('📦 Hook recebeu:', produtos.length, 'produtos');
      
      // Buscar categorias
      let cats = await fetchCategories();
      // Atualizar o count da categoria 'Todos' para o total de produtos
      if (cats.length > 0) {
        cats = cats.map(cat =>
          cat.name === 'Todos' ? { ...cat, count: produtos.length } : cat
        );
      }
      setCategories(cats);
      console.log('📂 Hook recebeu:', cats.length, 'categorias');
      
      if (produtos.length === 0) {
        setError('Nenhum produto encontrado');
      }
      
    } catch (err) {
      console.error('❌ Erro no hook:', err);
      setError('Erro ao carregar loja');
      setProducts([]);
      setCategories([{ name: 'Todos', count: 0 }]);
    }
    
    setLoading(false);
    console.log('⏹️ Carregamento finalizado');
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
    refetch: loadData
  };
}; 