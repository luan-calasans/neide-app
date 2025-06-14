import React, { useState, useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, ActivityIndicator, RefreshControl, Animated, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useProducts } from '../../hooks/useProducts';
import { ChartSection } from '../ChartSection';
import { styles } from './style';
import { fetchSalesReport, fetchTopSellingProducts, fetchTotalSales, fetchOrders, fetchStock } from '../../services/api';
import { Buffer } from 'buffer';

const { width } = Dimensions.get('window');

export function DashboardScreen() {
  const [selectedPeriod, setSelectedPeriod] = useState('mes');
  const [topCount, setTopCount] = useState(5);
  const [performance, setPerformance] = useState({ totalSales: 0, totalOrders: 0, averageSales: 0 });
  const [topProducts, setTopProducts] = useState([]);
  const [stock, setStock] = useState([]);
  const [realLoading, setRealLoading] = useState(true);
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

  // Buscar dados reais da API WooCommerce
  React.useEffect(() => {
    const fetchData = async () => {
      setRealLoading(true);
      try {
        // Calcular datas conforme seleção
        const now = new Date();
        let firstDay, lastDay;
        lastDay = now;
        if (selectedPeriod === 'ano') {
          firstDay = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
        } else if (selectedPeriod === 'semestre') {
          firstDay = new Date(now.getFullYear(), now.getMonth() - 6, now.getDate());
        } else {
          firstDay = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
        }
        function formatDateISO(date, endOfDay = false) {
          const pad = n => n.toString().padStart(2, '0');
          return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${endOfDay ? '23:59:59' : '00:00:00'}`;
        }
        const after = formatDateISO(firstDay);
        const before = formatDateISO(lastDay, true);
        // Buscar dados reais
        const perf = await fetchTotalSales(after, before);
        const orders = await fetchOrders(after, before, 1000);
        const stk = await fetchStock(after, before, 1000);
        const top = await fetchTopSellingProducts(after, before, 1000);
        setPerformance({
          totalSales: perf?.totalSales || 0,
          totalOrders: Array.isArray(orders) ? orders.length : 0,
          averageSales: Array.isArray(orders) && orders.length > 0 ? (orders.reduce((acc, o) => acc + (o.total_sales || 0), 0) / orders.length) : 0,
          ordersCount: perf?.ordersCount || 0,
          itemsSold: perf?.itemsSold || 0
        });
        setTopProducts(top);
        setStock(stk);
      } catch (err) {
        setPerformance({ totalSales: 0, totalOrders: 0, averageSales: 0 });
        setTopProducts([]);
        setStock([]);
      } finally {
        setRealLoading(false);
      }
    };
    fetchData();
  }, [selectedPeriod, topCount]);

  // Obter dados de vendas baseados no período selecionado  
  const salesData = getSalesData(selectedPeriod);

  // Estatísticas gerais
  const totalProducts = 547;
  const totalSales = performance.totalSales;
  const totalOrders = performance.totalOrders;
  const averageSales = performance.averageSales;
  const ordersCount = performance.ordersCount || 0;
  const itemsSold = performance.itemsSold || 0;
  const outOfStock = stock.filter(p => p.stock_quantity === 0).length;
  const lowStock = stock.filter(p => p.stock_quantity > 0 && p.stock_quantity <= 5).length;
  const inStock = ordersCount;

  // Produto mais vendido
  const topProduct = topProducts.length > 0 ? topProducts[0] : null;

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
    },
    {
      title: `Vendas ${periods.find(p => p.key === selectedPeriod)?.label}`,
      value: totalSales,
      icon: 'trending-up',
      gradient: ['#f093fb', '#f5576c'],
    },
    {
      title: 'Produtos vendidos',
      value: itemsSold,
      icon: 'analytics',
      gradient: ['#4facfe', '#00f2fe'],
    },
    {
      title: 'Pedidos',
      value: inStock,
      icon: 'check-circle',
      gradient: ['#43e97b', '#38f9d7'],
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
  if (loading || realLoading) return renderLoadingState();

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
    </ScrollView>
  );
} 