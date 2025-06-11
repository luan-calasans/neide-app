import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Alert, Linking } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './style';

export function ProfileScreen({ onLogout }) {
  const handleLogout = async () => {
    Alert.alert(
      'Sair do App',
      'Tem certeza que deseja sair?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Sair',
          style: 'destructive',
          onPress: async () => {
            try {
              await AsyncStorage.removeItem('isLoggedIn');
              onLogout?.();
            } catch (error) {
              console.error('Error during logout:', error);
            }
          },
        },
      ]
    );
  };

  const openWhatsApp = () => {
    const url = `https://wa.me/5513991568631`;
    Linking.openURL(url).catch(() => {
      Alert.alert('Erro', 'Não foi possível abrir o WhatsApp');
    });
  };

  const openInstagram = () => {
    const url = 'https://instagram.com/neidecosmeticossantos';
    Linking.openURL(url).catch(() => {
      Linking.openURL('https://instagram.com/neidecosmeticossantos');
    });
  };

  const openWebsite = () => {
    Linking.openURL('https://neidecosmeticos.com.br');
  };

  const callPhone = () => {
    Linking.openURL('tel:+5513991568631');
  };

  const openMaps = () => {
    const address = 'Rua Carvalho de Mendonça 284, Santos, SP';
    const encodedAddress = encodeURIComponent(address);
    const url = `https://maps.google.com/?q=${encodedAddress}`;
    Linking.openURL(url);
  };

  return (
    <ScrollView style={styles.screen} showsVerticalScrollIndicator={false}>
      <View style={styles.headerContainer}>
        <Image source={require('../../assets/logo.png')} style={styles.logoProfile} />
        <Text style={styles.headerTitle}>Neide Cosméticos</Text>
        <Text style={styles.headerSubtitle}>Beleza & Cuidados</Text>
      </View>

      {/* Seção Nossa Loja */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Nossa Loja</Text>
        
        {/* Contato */}
        <TouchableOpacity style={styles.contactCard} onPress={callPhone}>
          <MaterialIcons name="phone" size={24} color="#d81b60" />
          <View style={styles.contactInfo}>
            <Text style={styles.contactLabel}>Telefone</Text>
            <Text style={styles.contactValue}>(13) 99156-8631</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#999" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.contactCard} onPress={openWhatsApp}>
          <Ionicons name="logo-whatsapp" size={24} color="#25D366" />
          <View style={styles.contactInfo}>
            <Text style={styles.contactLabel}>WhatsApp</Text>
            <Text style={styles.contactValue}>(13) 99156-8631</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#999" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.contactCard} onPress={openInstagram}>
          <Ionicons name="logo-instagram" size={24} color="#E4405F" />
          <View style={styles.contactInfo}>
            <Text style={styles.contactLabel}>Instagram</Text>
            <Text style={styles.contactValue}>@neidecosmeticossantos</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#999" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.contactCard} onPress={openWebsite}>
          <MaterialIcons name="language" size={24} color="#d81b60" />
          <View style={styles.contactInfo}>
            <Text style={styles.contactLabel}>Website</Text>
            <Text style={styles.contactValue}>neidecosmeticos.com.br</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#999" />
        </TouchableOpacity>

        {/* Endereço */}
        <TouchableOpacity style={styles.addressCard} onPress={openMaps}>
          <MaterialIcons name="location-on" size={24} color="#d81b60" />
          <View style={styles.addressInfo}>
            <Text style={styles.addressLabel}>Nosso Endereço</Text>
            <Text style={styles.addressValue}>Rua Carvalho de Mendonça 284</Text>
            <Text style={styles.addressValue}>Santos - SP</Text>
            <Text style={styles.addressNote}>Retirada disponível</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#999" />
        </TouchableOpacity>
      </View>

      {/* Configurações */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Configurações</Text>
        
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <MaterialIcons name="logout" size={24} color="#d32f2f" />
          <Text style={styles.logoutText}>Sair do App</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Desenvolvido com Luan, Igor e Valeria ❤️</Text>
      </View>
    </ScrollView>
  );
} 