// API simples para WooCommerce
const API_BASE = 'https://neidecosmeticos.com.br/wp-json/wc/v3';
const KEY = 'ck_8bd0bc7753cb68d047b17729b59ca6bf43b6010d';
const SECRET = 'cs_a5b450222e2b99e5d1f429b4722b4d3fe69ccffe';

// Buscar todos os produtos
export const fetchProducts = async () => {
  try {
    const url = `${API_BASE}/products?consumer_key=${KEY}&consumer_secret=${SECRET}&per_page=100&status=publish`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      return [];
    }
    
    const data = await response.json();
    
    // Mapear para o formato do app
    const produtos = data.map(produto => ({
      id: produto.id,
      name: produto.name || 'Produto',
      price: parseFloat(produto.price) || 0,
      category: produto.categories?.[0]?.name || 'Outros',
      stock_quantity: produto.stock_quantity || 0,
      image: produto.images?.[0]?.src || null,
      slug: produto.slug || '',
      description: produto.short_description || produto.description || '',
      sold: Math.floor(Math.random() * 50) + 1, // Simulado para dashboard
      shortName: produto.name?.length > 15 ? produto.name.substring(0, 15) + '...' : produto.name || 'Produto'
    }));
    
    if (produtos.length > 0) {
    }
    
    return produtos;
    
  } catch (error) {
    return [];
  }
};

// Buscar categorias
export const fetchCategories = async () => {
  try {
    const url = `${API_BASE}/products/categories?consumer_key=${KEY}&consumer_secret=${SECRET}&per_page=20&hide_empty=true`;

    const response = await fetch(url);
    
    if (!response.ok) {
      console.error('❌ Erro categorias:', response.status);
      return ['Todos'];
    }
    
    const data = await response.json();
    
    const categorias = ['Todos', ...data.map(cat => cat.name)];
    
    return categorias;
    
  } catch (error) {
    return ['Todos'];
  }
};

// Dashboard
export const generateSalesData = (products, period = 'mes') => {
  if (!products?.length) return [];
  
  const multiplier = period === 'ano' ? 12 : period === 'semestre' ? 6 : 1;
  
  return products
    .map(p => ({
      id: p.id,
      name: p.name,
      sold: (p.sold || 0) * multiplier,
      shortName: p.shortName,
      category: p.category,
      price: p.price,
      stock_quantity: p.stock_quantity
    }))
    .sort((a, b) => b.sold - a.sold)
    .slice(0, 20);
}; 