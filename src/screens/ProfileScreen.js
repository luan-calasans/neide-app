import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>🌸</Text>
      <Text style={styles.title}>Perfil</Text>
      <Text style={styles.info}>Usuário: Neide</Text>
      <Text style={styles.info}>Configurações em breve...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' },
  logo: { fontSize: 80, marginBottom: 24 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 12 },
  info: { fontSize: 16, color: '#888' },
}); 