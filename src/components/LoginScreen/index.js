import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AUTH_CREDENTIALS } from '../../data';
import { styles } from './style';

export function LoginScreen({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!username.trim() || !password.trim()) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    setLoading(true);

    // Simulate loading time
    setTimeout(async () => {
      if (username === AUTH_CREDENTIALS.username && password === AUTH_CREDENTIALS.password) {
        try {
          await AsyncStorage.setItem('isLoggedIn', 'true');
          onLogin();
        } catch (error) {
          Alert.alert('Erro', 'Erro ao salvar sessão.');
        }
      } else {
        Alert.alert('Erro', 'Usuário ou senha inválidos.');
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <StatusBar style="light" />
      
      <View style={styles.header}>
        <Image source={require('../../assets/logo.png')} style={styles.logo} />
        <Text style={styles.title}>Neide Cosméticos</Text>
        <Text style={styles.subtitle}>Faça login para acessar</Text>
      </View>

      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <Ionicons name="person-outline" size={20} color="#d81b60" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Usuário"
            placeholderTextColor="#999"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed-outline" size={20} color="#d81b60" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Senha"
            placeholderTextColor="#999"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        <TouchableOpacity 
          style={[styles.button, loading && styles.buttonDisabled]} 
          onPress={handleLogin}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Entrando...' : 'Entrar'}
          </Text>
        </TouchableOpacity>

        <View style={styles.credentialsHint}>
          <Text style={styles.credentialsText}>Credenciais de teste:</Text>
          <Text style={styles.credentialsDetail}>Usuário: neidecosmeticos</Text>
          <Text style={styles.credentialsDetail}>Senha: NeideCosmeticos@25</Text>
        </View>
      </View>
    </ScrollView>
  );
} 