import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import ProductList from '../components/ProductList';

const MOCK_PRODUCTS = [
  { id: 1, name: 'Shampoo', category: 'Cabelos', price: 29.9 },
  { id: 2, name: 'Condicionador', category: 'Cabelos', price: 32.9 },
  { id: 3, name: 'Creme Facial', category: 'Rosto', price: 49.9 },
  { id: 4, name: 'Óleo Corporal', category: 'Corpo', price: 39.9 },
  // ... mais produtos
];

export default function ProductsScreen() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');

  const filteredProducts = MOCK_PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) &&
    (filter ? p.category === filter : true)
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Produtos</Text>
      <TextInput
        style={styles.input}
        placeholder="Buscar produto..."
        value={search}
        onChangeText={setSearch}
      />
      {/* Filtros podem ser implementados com Picker ou botões */}
      <ProductList products={filteredProducts} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 12 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 8, marginBottom: 12 },
}); 