import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { styles } from './style';

export function ProductCard({ product }) {
  // Formatear preço em reais
  const formatPrice = (price) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  // Definir cor do status do estoque
  const getStockColor = (stock) => {
    if (stock === 0) return '#f44336'; // Vermelho - sem estoque
    if (stock <= 5) return '#ff9800'; // Laranja - estoque baixo
    return '#4caf50'; // Verde - estoque ok
  };

  // Obter ícone da categoria
  const getCategoryIcon = (category) => {
    const iconMap = {
      'Gloss': 'face',
      'Batom': 'face',
      'Base': 'face',
      'Pó': 'face',
      'Cabelos': 'content-cut',
      'Rosto': 'face',
      'Corpo': 'accessibility',
      'Maquiagem': 'palette',
      'Cuidados': 'spa'
    };
    
    return iconMap[category] || 'category';
  };

  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.7}>
      <View style={styles.cardContent}>
        {/* Imagem do produto ou placeholder */}
        <View style={styles.imageContainer}>
          {product.image ? (
            <Image 
              source={{ uri: product.image }} 
              style={styles.productImage}
              defaultSource={require('../../assets/logo.png')}
            />
          ) : (
            <View style={styles.placeholderImage}>
              <MaterialIcons 
                name={getCategoryIcon(product.category)} 
                size={32} 
                color="#d81b60" 
              />
            </View>
          )}
          
          {/* Badge da categoria */}
          <View style={styles.categoryBadge}>
            <MaterialIcons 
              name={getCategoryIcon(product.category)} 
              size={12} 
              color="#fff" 
            />
            <Text style={styles.categoryText}>{product.category}</Text>
          </View>
        </View>

        {/* Informações do produto */}
        <View style={styles.productInfo}>
          <Text style={styles.productName} numberOfLines={2}>
            {product.name}
          </Text>
          
          {/* Preço */}
          <View style={styles.priceContainer}>
            <Text style={styles.price}>
              {formatPrice(product.price)}
            </Text>
            {product.price > 50 && (
              <View style={styles.premiumBadge}>
                <MaterialIcons name="star" size={12} color="#ffd700" />
                <Text style={styles.premiumText}>Premium</Text>
              </View>
            )}
          </View>

          {/* Informações de estoque */}
          <View style={styles.stockContainer}>
            <MaterialIcons 
              name="inventory" 
              size={16} 
              color={getStockColor(product.stock_quantity || 0)} 
            />
            <Text style={[
              styles.stockText, 
              { color: getStockColor(product.stock_quantity || 0) }
            ]}>
              {product.stock_quantity === 0 
                ? 'Sem estoque'
                : product.stock_quantity <= 5
                ? `Apenas ${product.stock_quantity} restante${product.stock_quantity > 1 ? 's' : ''}`
                : `${product.stock_quantity} em estoque`
              }
            </Text>
          </View>

          {/* Descrição curta se disponível */}
          {product.description && (
            <Text style={styles.description} numberOfLines={2}>
              {product.description.replace(/<[^>]*>/g, '')} {/* Remove HTML tags */}
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
} 