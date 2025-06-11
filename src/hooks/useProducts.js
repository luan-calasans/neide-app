import { useState, useEffect } from 'react';
import { fetchProducts, fetchCategories, generateSalesData } from '../services/api';

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(['Todos']);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Carregar produtos e categorias
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [productsData, categoriesData] = await Promise.all([
        fetchProducts(),
        fetchCategories()
      ]);
      setProducts(productsData);
      setCategories(categoriesData);
      console.log('Produtos carregados:', productsData.length);
      console.log('Categorias carregadas:', categoriesData);
    } catch (err) {
      console.error('Erro ao carregar dados:', err);
      setError(err.message || 'Erro desconhecido');
      setProducts([]); // Garante que não retorna produto fake
    } finally {
      setLoading(false);
    }
  };

  // Gerar dados de vendas baseados nos produtos
  const getSalesData = (period = 'mes') => {
    return generateSalesData(products, period);
  };

  // Filtrar produtos por categoria
  const getProductsByCategory = (category) => {
    if (category === 'Todos') {
      return products;
    }
    return products.filter(product => product.category === category);
  };

  // Buscar produtos por texto
  const searchProducts = (searchText, category = 'Todos') => {
    let filteredProducts = getProductsByCategory(category);
    
    if (searchText.trim()) {
      filteredProducts = filteredProducts.filter(product =>
        product.name.toLowerCase().includes(searchText.toLowerCase())
      );
    }
    
    return filteredProducts;
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