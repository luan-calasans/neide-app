import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Image, ActivityIndicator, RefreshControl, Animated } from 'react-native';
import { Search, X, AlertCircle, CheckCircle } from 'lucide-react-native';
import { useProducts } from '../../hooks/useProducts';
import { ProductCard } from '../ProductCard';
import { styles } from './style';

export function ProductsScreen() {
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const scrollY = useRef(new Animated.Value(0)).current;
  
  const { 
    products, 
    categories, 
    loading, 
    error, 
    searchProducts, 
    refetch 
  } = useProducts();

  // Debug do estado
  useEffect(() => {
    console.log('🔍 ProductsScreen - Estado atual:', {
      produtos: products.length,
      categorias: categories.length,
      carregando: loading,
      erro: error
    });
  }, [products, categories, loading, error]);

  // Filtrar produtos baseado na busca e categoria
  const filteredProducts = searchProducts(searchText, selectedCategory);

  const getCategoryColor = (category, isSelected) => {
    const colorMap = {
      'Todos': isSelected ? '#d81b60' : '#e91e63',
      'Gloss': isSelected ? '#e91e63' : '#f48fb1',
      'Batom': isSelected ? '#ad1457' : '#c2185b',
      'Base': isSelected ? '#880e4f' : '#ad1457',
      'Pó': isSelected ? '#4a148c' : '#7b1fa2',
      'Cabelos': isSelected ? '#311b92' : '#512da8',
      'Rosto': isSelected ? '#1a237e' : '#303f9f',
      'Corpo': isSelected ? '#0d47a1' : '#1976d2',
      'Maquiagem': isSelected ? '#01579b' : '#0288d1',
      'Cuidados': isSelected ? '#006064' : '#0097a7',
      'Skincare': isSelected ? '#004d40' : '#00695c',
      'Limpeza': isSelected ? '#1b5e20' : '#388e3c'
    };
    
    return colorMap[category] || (isSelected ? '#d81b60' : '#666');
  };

  const renderProduct = ({ item, index }) => (
    <Animated.View style={styles.productItem}>
      <ProductCard product={item} />
    </Animated.View>
  );

  const renderCategory = ({ item: category, index }) => {
    const isSelected = selectedCategory === category;
    const backgroundColor = getCategoryColor(category, isSelected);
    
    return (
      <TouchableOpacity
        style={[
          styles.categoryCard,
          { 
            backgroundColor: isSelected ? backgroundColor : '#fff',
            borderColor: backgroundColor,
            elevation: isSelected ? 8 : 2,
            transform: [{ scale: isSelected ? 1.05 : 1 }]
          }
        ]}
        onPress={() => setSelectedCategory(category)}
        disabled={loading}
        activeOpacity={0.8}
      >
        <Text style={[
          styles.categoryText,
          { 
            color: isSelected ? '#fff' : backgroundColor,
            fontFamily: isSelected ? 'Montserrat_600SemiBold' : 'Montserrat_500Medium'
          }
        ]}>
          {category}
        </Text>
        {isSelected && (
          <View style={styles.selectedIndicator}>
            <CheckCircle size={16} color="#fff" />
          </View>
        )}
      </TouchableOpacity>
    );
  };

  const renderEmptyState = () => {
    if (loading) {
      return (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#d81b60" />
          <Text style={styles.loadingText}>Carregando produtos...</Text>
        </View>
      );
    }

    if (error) {
      return (
        <View style={styles.centerContainer}>
          <AlertCircle size={48} color="#d81b60" />
          <Text style={styles.errorText}>Erro ao carregar produtos</Text>
          <Text style={styles.errorSubtext}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={refetch}>
            <Text style={styles.retryButtonText}>Tentar Novamente</Text>
          </TouchableOpacity>
        </View>
      );
    }

    if (filteredProducts.length === 0 && searchText) {
      return (
        <View style={styles.centerContainer}>
          <AlertCircle size={48} color="#999" />
          <Text style={styles.emptyText}>Nenhum produto encontrado</Text>
          <Text style={styles.emptySubtext}>Tente uma busca diferente</Text>
        </View>
      );
    }

    return null;
  };

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0.9],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.screen}>
      {/* Header com animação */}
      <Animated.View style={[styles.headerContainer, { opacity: headerOpacity }]}>
        <View style={styles.headerContent}>
          <Image source={require('../../assets/logo.png')} style={styles.logoHeader} />
          <View style={styles.headerTextContainer}>
            <Text style={styles.header}>Produtos</Text>
            <Text style={styles.headerSubtitle}>
              {filteredProducts.length} produto{filteredProducts.length !== 1 ? 's' : ''} 
              {selectedCategory !== 'Todos' && ` em ${selectedCategory}`}
            </Text>
          </View>
          {loading && <ActivityIndicator size="small" color="#d81b60" style={styles.headerLoader} />}
        </View>
      </Animated.View>
      
      {/* Barra de busca moderna */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Search size={20} color="#999" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar produtos..."
            placeholderTextColor="#999"
            value={searchText}
            onChangeText={setSearchText}
            editable={!loading}
          />
          {searchText.length > 0 && (
            <TouchableOpacity 
              onPress={() => setSearchText('')}
              style={styles.clearButton}
            >
              <X size={20} color="#999" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Categorias modernas com scroll horizontal */}
      <View style={styles.categoriesSection}>
        <Text style={styles.sectionTitle}>Categorias</Text>
        <FlatList
          horizontal
          data={categories}
          keyExtractor={(item) => item}
          showsHorizontalScrollIndicator={false}
          renderItem={renderCategory}
          contentContainerStyle={styles.categoriesContainer}
          ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
          decelerationRate="fast"
          snapToAlignment="start"
          snapToInterval={130}
        />
      </View>

      {/* Lista de produtos ou estado vazio */}
      {filteredProducts.length > 0 ? (
        <Animated.FlatList
          data={filteredProducts}
          renderItem={renderProduct}
          keyExtractor={item => item.id.toString()}
          numColumns={2}
          key="two-columns"
          columnWrapperStyle={styles.row}
          style={styles.productList}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={refetch}
              colors={['#d81b60']}
              tintColor="#d81b60"
              progressBackgroundColor="#fff"
            />
          }
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }
          )}
          scrollEventThrottle={16}
          contentContainerStyle={styles.productListContent}
        />
      ) : (
        renderEmptyState()
      )}
    </View>
  );
} 