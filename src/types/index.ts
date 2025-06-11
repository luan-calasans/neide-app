export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock_quantity?: number;
  image?: string | null;
  slug?: string;
  description?: string;
  sold?: number; // Para dados de vendas simulados
  shortName?: string; // Nome truncado para gráficos
}

export interface ProductCardProps {
  product: Product;
}

export interface SalesData {
  id: number;
  name: string;
  sold: number;
  shortName: string;
}

export interface ChartSectionProps {
  title: string;
  data: SalesData[];
  topCount: number;
}

export interface ProfileScreenProps {
  onLogout?: () => void;
}

export interface AuthCredentials {
  username: string;
  password: string;
}

// Tipos específicos da API WooCommerce
export interface WooCommerceProduct {
  id: number;
  name: string;
  price: string;
  stock_quantity: number | null;
  categories: Array<{
    id: number;
    name: string;
    slug: string;
  }>;
  images: Array<{
    id: number;
    src: string;
    alt: string;
  }>;
  slug: string;
  description: string;
  short_description: string;
}

export interface WooCommerceCategory {
  id: number;
  name: string;
  slug: string;
  count: number;
} 