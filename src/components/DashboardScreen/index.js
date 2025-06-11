import React, { useState, useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, ActivityIndicator, RefreshControl, Animated, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useProducts } from '../../hooks/useProducts';
import { ChartSection } from '../ChartSection';
import { styles } from './style';

const { width } = Dimensions.get('window');

export function DashboardScreen() {
  const [selectedPeriod, setSelectedPeriod] = useState('mes');
  const [topCount, setTopCount] = useState(5);
  const scrollY = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  
  const { 
    products, 
    getSalesData, 
    loading, 
    error, 
    refetch 
  } = useProducts();

  React.useEffect(() => {
    if (!loading) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }).start();
    }
  }, [loading]);

  // Obter dados de vendas baseados no período selecionado  
  const salesData = getSalesData(selectedPeriod);

  // Estatísticas gerais
  const totalProducts = products.length;
  const totalSales = salesData.reduce((sum, item) => sum + item.sold, 0);
  const averageSales = salesData.length > 0 ? Math.round(totalSales / salesData.length) : 0;
  const outOfStock = products.filter(p => p.stock_quantity === 0).length;
  const lowStock = products.filter(p => p.stock_quantity > 0 && p.stock_quantity <= 5).length;
  const inStock = products.filter(p => p.stock_quantity > 5).length;

  // Produto mais vendido
  const topProduct = salesData.length > 0 ? salesData[0] : null;

  const periods = [
    { key: 'mes', label: 'Mês', icon: 'today', gradient: ['#e91e63', '#ad1457'] },
    { key: 'semestre', label: 'Semestre', icon: 'date-range', gradient: ['#2196f3', '#1565c0'] },
    { key: 'ano', label: 'Ano', icon: 'event', gradient: ['#4caf50', '#2e7d32'] }
  ];

  const topCounts = [
    { value: 1, label: '#1' },
    { value: 3, label: 'Top 3' },
    { value: 5, label: 'Top 5' },
    { value: 10, label: 'Top 10' }
  ];

  const statsCards = [
    {
      title: 'Total Produtos',
      value: totalProducts,
      icon: 'inventory',
      gradient: ['#667eea', '#764ba2'],
      subtitle: 'Catálogo completo'
    },
    {
      title: `Vendas ${periods.find(p => p.key === selectedPeriod)?.label}`,
      value: totalSales,
      icon: 'trending-up',
      gradient: ['#f093fb', '#f5576c'],
      subtitle: 'Total de vendas'
    },
    {
      title: 'Média de Vendas',
      value: averageSales,
      icon: 'analytics',
      gradient: ['#4facfe', '#00f2fe'],
      subtitle: 'Por produto'
    },
    {
      title: 'Em Estoque',
      value: inStock,
      icon: 'check-circle',
      gradient: ['#43e97b', '#38f9d7'],
      subtitle: 'Disponíveis'
    }
  ];

  const renderErrorState = () => (
    <View style={styles.centerContainer}>
      <MaterialIcons name="error-outline" size={64} color="#d81b60" />
      <Text style={styles.errorText}>Erro ao carregar dashboard</Text>
      <Text style={styles.errorSubtext}>{error}</Text>
      <TouchableOpacity style={styles.retryButton} onPress={refetch}>
        <Text style={styles.retryButtonText}>Tentar Novamente</Text>
      </TouchableOpacity>
    </View>
  );

  const renderLoadingState = () => (
    <View style={styles.centerContainer}>
      <ActivityIndicator size="large" color="#d81b60" />
      <Text style={styles.loadingText}>Carregando dashboard...</Text>
    </View>
  );

  const renderStatCard = (stat, index) => (
    <Animated.View
      key={stat.title}
      style={[
        styles.statCard,
        {
          opacity: fadeAnim,
          transform: [{
            translateY: fadeAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [50, 0],
            }),
          }],
        },
      ]}
    >
      <LinearGradient
        colors={stat.gradient}
        style={styles.statGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.statHeader}>
          <MaterialIcons name={stat.icon} size={28} color="#fff" />
          <Text style={styles.statValue}>{stat.value}</Text>
        </View>
        <Text style={styles.statTitle}>{stat.title}</Text>
        <Text style={styles.statSubtitle}>{stat.subtitle}</Text>
      </LinearGradient>
    </Animated.View>
  );

  if (error) return renderErrorState();
  if (loading) return renderLoadingState();

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0.9],
    extrapolate: 'clamp',
  });

  return (
    <ScrollView 
      style={styles.screen}
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
      showsVerticalScrollIndicator={false}
    >
      {/* Header moderno */}
      <Animated.View style={[styles.headerContainer, { opacity: headerOpacity }]}>
        <LinearGradient
          colors={['#667eea', '#764ba2']}
          style={styles.headerGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.headerContent}>
            <View style={styles.headerLeft}>
              <Image source={require('../../assets/logo.png')} style={styles.logoHeader} />
              <View>
                <Text style={styles.header}>Dashboard</Text>
                <Text style={styles.headerSubtitle}>Análise de vendas e estoque</Text>
              </View>
            </View>
            {loading && <ActivityIndicator size="small" color="#fff" />}
          </View>
        </LinearGradient>
      </Animated.View>

      {/* Cards de estatísticas */}
      <View style={styles.statsContainer}>
        <View style={styles.statsGrid}>
          {statsCards.map((stat, index) => renderStatCard(stat, index))}
        </View>
      </View>

      {/* Alertas de estoque */}
      {(outOfStock > 0 || lowStock > 0) && (
        <Animated.View style={[styles.alertsContainer, { opacity: fadeAnim }]}>
          <Text style={styles.alertsTitle}>⚠️ Alertas de Estoque</Text>
          <View style={styles.alertsGrid}>
            {outOfStock > 0 && (
              <View style={[styles.alertCard, styles.dangerAlert]}>
                <MaterialIcons name="error" size={24} color="#f44336" />
                <Text style={styles.alertNumber}>{outOfStock}</Text>
                <Text style={styles.alertText}>Sem estoque</Text>
              </View>
            )}
            {lowStock > 0 && (
              <View style={[styles.alertCard, styles.warningAlert]}>
                <MaterialIcons name="warning" size={24} color="#ff9800" />
                <Text style={styles.alertNumber}>{lowStock}</Text>
                <Text style={styles.alertText}>Estoque baixo</Text>
              </View>
            )}
          </View>
        </Animated.View>
      )}

      {/* Produto destaque */}
      {topProduct && (
        <Animated.View style={[styles.highlightContainer, { opacity: fadeAnim }]}>
          <LinearGradient
            colors={['#ffecd2', '#fcb69f']}
            style={styles.highlightGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.highlightHeader}>
              <MaterialIcons name="star" size={28} color="#ff6b35" />
              <Text style={styles.highlightTitle}>🏆 Produto Destaque</Text>
            </View>
            <Text style={styles.highlightProduct}>{topProduct.name}</Text>
            <View style={styles.highlightStats}>
              <View style={styles.highlightStat}>
                <Text style={styles.highlightStatNumber}>{topProduct.sold}</Text>
                <Text style={styles.highlightStatLabel}>Vendas</Text>
              </View>
              <View style={styles.highlightStat}>
                <Text style={styles.highlightStatNumber}>#{1}</Text>
                <Text style={styles.highlightStatLabel}>Posição</Text>
              </View>
            </View>
          </LinearGradient>
        </Animated.View>
      )}

      {/* Controles de período - Design moderno */}
      <Animated.View style={[styles.controlsContainer, { opacity: fadeAnim }]}>
        <Text style={styles.controlsTitle}>📊 Período de Análise</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.periodScroll}>
          {periods.map(period => (
            <TouchableOpacity
              key={period.key}
              style={[
                styles.periodCard,
                selectedPeriod === period.key && styles.periodCardActive
              ]}
              onPress={() => setSelectedPeriod(period.key)}
            >
              <LinearGradient
                colors={selectedPeriod === period.key ? period.gradient : ['#f8f9fa', '#e9ecef']}
                style={styles.periodGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <MaterialIcons 
                  name={period.icon} 
                  size={24} 
                  color={selectedPeriod === period.key ? '#fff' : '#666'} 
                />
                <Text style={[
                  styles.periodText,
                  { color: selectedPeriod === period.key ? '#fff' : '#666' }
                ]}>
                  {period.label}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </Animated.View>

      {/* Controles de ranking */}
      <Animated.View style={[styles.controlsContainer, { opacity: fadeAnim }]}>
        <Text style={styles.controlsTitle}>🎯 Configurar Ranking</Text>
        <View style={styles.topButtonsContainer}>
          {topCounts.map(top => (
            <TouchableOpacity
              key={top.value}
              style={[
                styles.topButton,
                topCount === top.value && styles.topButtonActive
              ]}
              onPress={() => setTopCount(top.value)}
            >
              <Text style={[
                styles.topButtonText,
                topCount === top.value && styles.topButtonTextActive
              ]}>
                {top.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </Animated.View>

      {/* Gráficos */}
      <Animated.View style={{ opacity: fadeAnim }}>
        {salesData.length > 0 ? (
          <ChartSection 
            title={`📈 Top ${topCount} Produtos - ${periods.find(p => p.key === selectedPeriod)?.label}`}
            data={salesData.slice(0, topCount)}
            topCount={topCount}
          />
        ) : (
          <View style={styles.noDataContainer}>
            <MaterialIcons name="bar-chart" size={64} color="#ccc" />
            <Text style={styles.noDataText}>Nenhum dado disponível</Text>
            <Text style={styles.noDataSubtext}>Configure o período para ver os gráficos</Text>
          </View>
        )}
      </Animated.View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          📱 Dados atualizados em tempo real • {products.length} produtos no catálogo
        </Text>
      </View>
    </ScrollView>
  );
} 