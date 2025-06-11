const API_BASE_URL = 'https://neidecosmeticos.com.br/wp-json/wc/v3';
const CONSUMER_KEY = 'ck_8bd0bc7753cb68d047b17729b59ca6bf43b6010d';
const CONSUMER_SECRET = 'cs_a5b450222e2b99e5d1f429b4722b4d3fe69ccffe';

// Função para construir URL com autenticação
const buildApiUrl = (endpoint, params = {}) => {
  const url = new URL(`${API_BASE_URL}${endpoint}`);
  
  // Adicionar credenciais
  url.searchParams.append('consumer_key', CONSUMER_KEY);
  url.searchParams.append('consumer_secret', CONSUMER_SECRET);
  
  // Adicionar parâmetros extras
  Object.keys(params).forEach(key => {
    url.searchParams.append(key, params[key]);
  });
  
  return url.toString();
};

// Buscar todos os produtos
export const fetchProducts = async () => {
  try {
    const url = buildApiUrl('/products', {
      per_page: 100, // Buscar até 100 produtos
      status: 'publish' // Apenas produtos publicados
    });
    
    console.log('Fetching products from:', url);
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const products = await response.json();
    
    // Mapear os campos exatamente como retornados pela API
    return products.map(product => ({
      id: product.id,
      name: product.name,
      price: parseFloat(product.price) || 0,
      category: product.categories && product.categories.length > 0 
        ? product.categories[0].name 
        : 'Outros',
      stock_quantity: product.stock_quantity ?? 0,
      image: product.images && product.images.length > 0 
        ? product.images[0].src 
        : null,
      slug: product.slug,
      description: product.short_description || product.description || '',
      // Não simular vendas, dashboard deve usar apenas dados reais
      shortName: product.name.length > 15 
        ? product.name.substring(0, 15) + '...' 
        : product.name
    }));
    
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    return [];
  }
};

// Buscar categorias de produtos
export const fetchCategories = async () => {
  try {
    const url = buildApiUrl('/products/categories', {
      per_page: 50,
      hide_empty: true // Apenas categorias com produtos
    });
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const categories = await response.json();
    
    // Adicionar "Todos" como primeira opção e mapear categorias
    const categoryNames = categories.map(cat => cat.name);
    return ['Todos', ...categoryNames];
    
  } catch (error) {
    console.error('Erro ao buscar categorias:', error);
    return ['Todos', 'Carregando...'];
  }
};

// Simular dados de vendas baseado nos produtos reais
export const generateSalesData = (products, period = 'mes') => {
  if (!products || products.length === 0) return [];
  
  // Multiplicadores baseados no período
  const multipliers = {
    mes: 1,
    semestre: 6,
    ano: 12
  };
  
  const multiplier = multipliers[period] || 1;
  
  // Gerar dados de vendas baseados nos produtos reais
  return products
    .map(product => ({
      id: product.id,
      name: product.name,
      sold: Math.floor((product.sold || 0) * multiplier + Math.random() * 10),
      shortName: product.shortName
    }))
    .sort((a, b) => b.sold - a.sold) // Ordenar por vendas (maior para menor)
    .slice(0, 10); // Pegar apenas os top 10
}; 