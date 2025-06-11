import React from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';
import { BarChart, PieChart } from 'react-native-chart-kit';
import { styles } from './style';

const screenWidth = Dimensions.get('window').width;

const chartConfig = {
  backgroundColor: '#ffe4ec',
  backgroundGradientFrom: '#ffe4ec',
  backgroundGradientTo: '#fff',
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(216, 27, 96, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: '6',
    strokeWidth: '2',
    stroke: '#d81b60',
  },
  propsForBackgroundLines: {
    stroke: '#e0e0e0',
  },
  propsForLabels: {
    fontFamily: 'Montserrat_400Regular',
    fontSize: 12,
  },
};

export function ChartSection({ title, data, topCount }) {
  const limitedData = data.slice(0, topCount);
  
  // Função para truncar labels muito longos
  const truncateLabel = (label, maxLength = 8) => {
    return label.length > maxLength ? label.substring(0, maxLength) + '...' : label;
  };
  
  const chartData = {
    labels: limitedData.map(item => truncateLabel(item.shortName, topCount > 5 ? 6 : 8)),
    datasets: [{
      data: limitedData.map(item => item.sold),
    }],
  };

  const pieData = limitedData.map((item, index) => ({
    name: truncateLabel(item.shortName, 10),
    population: item.sold,
    color: `hsl(${340 + index * 25}, 70%, ${65 - index * 3}%)`,
    legendFontColor: '#333',
    legendFontSize: 11,
  }));

  return (
    <View style={styles.section}>
      <Text style={styles.title}>{title}</Text>
      
      {/* Gráfico de Barras */}
      <View style={styles.chartContainer}>
        <Text style={styles.chartLabel}>Vendas por Produto</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <BarChart
            data={chartData}
            width={Math.max(screenWidth - 40, limitedData.length * 60)}
            height={220}
            yAxisLabel=""
            yAxisSuffix=""
            chartConfig={{
              ...chartConfig,
              propsForLabels: {
                fontFamily: 'Montserrat_400Regular',
                fontSize: topCount > 5 ? 10 : 12,
              },
            }}
            verticalLabelRotation={topCount > 5 ? 45 : 30}
            style={styles.chart}
            fromZero={true}
          />
        </ScrollView>
      </View>

      {/* Gráfico de Pizza */}
      <View style={styles.chartContainer}>
        <Text style={styles.chartLabel}>Distribuição de Vendas</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <PieChart
            data={pieData.map(item => ({
              ...item,
              legendFontColor: '#333',
              legendFontSize: 11,
            }))}
            width={Math.max(screenWidth - 40, 350)}
            height={200}
            chartConfig={{
              ...chartConfig,
              color: (opacity = 1) => `rgba(216, 27, 96, ${opacity})`,
              propsForLabels: {
                fontFamily: 'Montserrat_400Regular',
                fontSize: 11,
              },
            }}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
            center={[10, 0]}
            style={styles.chart}
            hasLegend={true}
          />
        </ScrollView>
      </View>

      {/* Lista dos Top Produtos Melhorada */}
      <View style={styles.topList}>
        <Text style={styles.topListTitle}>Ranking Detalhado</Text>
        {limitedData.map((item, index) => (
          <View key={item.id} style={styles.topItem}>
            <View style={[
              styles.rankBadge,
              index === 0 && styles.goldBadge,
              index === 1 && styles.silverBadge,
              index === 2 && styles.bronzeBadge,
            ]}>
              <Text style={styles.rankText}>{index + 1}</Text>
            </View>
            <View style={styles.topItemContent}>
              <Text style={styles.topItemName} numberOfLines={2}>
                {item.name}
              </Text>
              <Text style={styles.topItemCategory}>
                {item.shortName}
              </Text>
            </View>
            <View style={styles.topItemSalesContainer}>
              <Text style={styles.topItemSales}>{item.sold}</Text>
              <Text style={styles.topItemSalesLabel}>vendas</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
} 