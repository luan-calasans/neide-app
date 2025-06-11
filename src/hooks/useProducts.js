import { useState, useEffect } from 'react';
import { fetchProducts, fetchCategories, generateSalesData } from '../services/api';

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(['Todos']);
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
      const cats = await fetchCategories();
      setCategories(cats);
      console.log('📂 Hook recebeu:', cats.length, 'categorias');
      
      if (produtos.length === 0) {
        setError('Nenhum produto encontrado');
      }
      
    } catch (err) {
      console.error('❌ Erro no hook:', err);
      setError('Erro ao carregar loja');
      setProducts([]);
      setCategories(['Todos']);
    }
    
    setLoading(false);
    console.log('⏹️ Carregamento finalizado');
  };

  const getSalesData = (period = 'mes') => {
    return generateSalesData(products, period);
  };

  const getProductsByCategory = (category) => {
    if (category === 'Todos') return products;
    return products.filter(p => p.category === category);
  };

  const searchProducts = (searchText, category = 'Todos') => {
    let filtered = getProductsByCategory(category);
    
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