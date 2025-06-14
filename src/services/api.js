const API_BASE = 'https://neidecosmeticos.com.br/wp-json/wc/v3';
const KEY = 'ck_8bd0bc7753cb68d047b17729b59ca6bf43b6010d';
const SECRET = 'cs_a5b450222e2b99e5d1f429b4722b4d3fe69ccffe';

import { Buffer } from 'buffer';

// Verificar conexão com a API
const checkConnection = async () => {
  try {
    const response = await fetch(`${API_BASE}/products?consumer_key=${KEY}&consumer_secret=${SECRET}&per_page=1`);
    return response.ok;
  } catch (error) {
    console.error('Erro ao verificar conexão:', error);
    return false;
  }
};

export const fetchProducts = async () => {
  try {
    console.log('🔄 Iniciando busca de produtos...');
    
    // Verificar conexão primeiro
    const isConnected = await checkConnection();
    if (!isConnected) {
      console.error('❌ Sem conexão com a API');
      return [];
    }

    let page = 1;
    let allProducts = [];
    let hasMore = true;
    const perPage = 100;

    while (hasMore) {
      const url = `${API_BASE}/products?consumer_key=${KEY}&consumer_secret=${SECRET}&per_page=${perPage}&status=publish&page=${page}`;
      console.log(`📡 Buscando página ${page}...`);
      
      const response = await fetch(url);
      console.log(`📥 Resposta da API - Status: ${response.status}`);
      
      if (!response.ok) {
        console.error('❌ Erro na resposta da API:', response.status, response.statusText);
        return []; // Retorna array vazio em caso de erro
      }

      const data = await response.json();
      console.log(`✅ Produtos recebidos na página ${page}:`, data.length);
      
      if (!Array.isArray(data)) {
        console.error('❌ Dados recebidos não são um array:', data);
        return []; // Retorna array vazio em caso de erro
      }

      if (data.length === 0) {
        hasMore = false;
      } else {
        allProducts = allProducts.concat(data);
        hasMore = data.length === perPage;
        page++;
      }
    }

    console.log(`🎉 Total de produtos encontrados: ${allProducts.length}`);

    const produtos = allProducts.map(produto => ({
      id: produto.id,
      name: produto.name || 'Produto',
      price: parseFloat(produto.price) || 0,
      category: produto.categories?.[0]?.name || 'Outros',
      categoryId: produto.categories?.[0]?.id || null,
      stock_quantity: produto.stock_quantity || 0,
      image: produto.images?.[0]?.src || null,
      slug: produto.slug || '',
      description: produto.short_description || produto.description || '',
      sold: Math.floor(Math.random() * 50) + 1, // Simulado para dashboard
      shortName: produto.name?.length > 15 ? produto.name.substring(0, 15) + '...' : produto.name || 'Produto'
    }));

    console.log('✨ Produtos processados com sucesso');
    return produtos;
  } catch (error) {
    console.error('❌ Erro ao buscar produtos:', error);
    return []; // Retorna array vazio em caso de erro
  }
};

// Buscar categorias
export const fetchCategories = async () => {
  try {
    const url = `${API_BASE}/products/categories?consumer_key=${KEY}&consumer_secret=${SECRET}&per_page=20&hide_empty=true`;

    const response = await fetch(url);
    
    if (!response.ok) {
      console.error('Erro categorias:', response.status);
      return [{ name: 'Todos', count: 0 }];
    }
    
    const data = await response.json();
    
    // Filtrar categorias que têm produtos e adicionar "Todos"
    const categorias = [
      { name: 'Todos', count: 0, id: null },
      ...data.filter(cat => cat.count > 0).map(cat => ({
        name: cat.name,
        count: cat.count,
        id: cat.id
      }))
    ];
    
    return categorias;
    
  } catch (error) {
    return [{ name: 'Todos', count: 0 }];
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

export const fetchSalesReport = async (after, before) => {
  const auth = Buffer.from(KEY + ':' + SECRET).toString('base64');
  let url = `https://neidecosmeticos.com.br/wp-json/wc-analytics/reports/orders`;
  if (after && before) {
    url += `?after=${after}&before=${before}`;
  }
  const response = await fetch(url, { headers: { Authorization: `Basic ${auth}` } });
  if (!response.ok) return { totalSales: 0, totalOrders: 0, averageSales: 0 };
  const data = await response.json();
  const totals = data.totals || {};
  return {
    totalSales: parseFloat(totals.net_revenue || 0),
    totalOrders: parseInt(totals.orders_count || 0),
    averageSales: parseFloat(totals.avg_order_value || 0)
  };
};

export const fetchTopSellingProducts = async (after, before, perPage = 100) => {
  let page = 1;
  let allProducts = [];
  let hasMore = true;
  while (hasMore) {
    let url = `https://neidecosmeticos.com.br/wp-json/wc-analytics/reports/products?consumer_key=${KEY}&consumer_secret=${SECRET}&orderby=items_sold&order=desc&per_page=${perPage}&page=${page}`;
    if (after && before) url += `&after=${after}&before=${before}`;
    const response = await fetch(url);
    if (!response.ok) break;
    const data = await response.json();
    if (!Array.isArray(data) || data.length === 0) {
      hasMore = false;
    } else {
      allProducts = allProducts.concat(data);
      hasMore = data.length === perPage;
      page++;
    }
  }
  return allProducts;
};

export const fetchTotalSales = async (after, before) => {
  const url = `https://neidecosmeticos.com.br/wp-json/wc-analytics/reports/performance-indicators?consumer_key=${KEY}&consumer_secret=${SECRET}` +
    (after && before ? `&after=${after}&before=${before}` : '');
  const response = await fetch(url);
  if (!response.ok) return null;
  const data = await response.json();
  // Pode ser array ou objeto, buscar os indicadores
  let totalSales = 0;
  let ordersCount = 0;
  let itemsSold = 0;
  if (Array.isArray(data)) {
    data.forEach(item => {
      if (item.stat === 'revenue/total_sales') totalSales = item.value;
      if (item.stat === 'orders/orders_count') ordersCount = item.value;
      if (item.stat === 'products/items_sold') itemsSold = item.value;
    });
  } else {
    if (data.stat === 'revenue/total_sales') totalSales = data.value;
    if (data.stat === 'orders/orders_count') ordersCount = data.value;
    if (data.stat === 'products/items_sold') itemsSold = data.value;
  }
  return { totalSales, ordersCount, itemsSold };
};

export const fetchOrders = async (after, before, perPage = 10) => {
  let url = `https://neidecosmeticos.com.br/wp-json/wc-analytics/reports/orders?consumer_key=${KEY}&consumer_secret=${SECRET}`;
  if (after && before) url += `&after=${after}&before=${before}`;
  if (perPage) url += `&per_page=${perPage}`;
  const response = await fetch(url);
  if (!response.ok) return [];
  const data = await response.json();
  return Array.isArray(data) ? data : [];
};

export const fetchStock = async (after, before, perPage = 10) => {
  let url = `https://neidecosmeticos.com.br/wp-json/wc-analytics/reports/stock?consumer_key=${KEY}&consumer_secret=${SECRET}`;
  if (after && before) url += `&after=${after}&before=${before}`;
  if (perPage) url += `&per_page=${perPage}`;
  const response = await fetch(url);
  if (!response.ok) return [];
  const data = await response.json();
  return Array.isArray(data) ? data : [];
}; 