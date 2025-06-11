import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import MonthlyTopProducts from '../components/MonthlyTopProducts';
import SemiannualTopProducts from '../components/SemiannualTopProducts';
import AnnualTopProducts from '../components/AnnualTopProducts';

const MOCK_MONTH = [
  { id: 1, name: 'Shampoo', sold: 120 },
  { id: 2, name: 'Condicionador', sold: 110 },
];
const MOCK_SEMESTER = [
  { id: 3, name: 'Creme Facial', sold: 300 },
  { id: 4, name: 'Óleo Corporal', sold: 250 },
];
const MOCK_YEAR = [
  { id: 1, name: 'Shampoo', sold: 600 },
  { id: 3, name: 'Creme Facial', sold: 550 },
];

export default function DashboardScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Dashboard de Vendas</Text>
      <MonthlyTopProducts products={MOCK_MONTH} />
      <SemiannualTopProducts products={MOCK_SEMESTER} />
      <AnnualTopProducts products={MOCK_YEAR} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 12 },
}); 