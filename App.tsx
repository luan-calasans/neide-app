import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import { View, ActivityIndicator } from 'react-native';
import * as Font from 'expo-font';

import { 
  ErrorBoundary, 
  SplashScreen, 
  LoginScreen, 
  ProductsScreen, 
  DashboardScreen, 
  ProfileScreen 
} from './src/components';

const Tab = createBottomTabNavigator();

type AppState = 'loading' | 'splash' | 'login' | 'main';

export default function App() {
  const [appState, setAppState] = useState<AppState>('loading');
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    loadFonts();
  }, []);

  const loadFonts = async () => {
    try {
      console.log('Carregando fontes Montserrat locais...');
      
      // Carregar todas as variações da fonte Montserrat local
      await Font.loadAsync({
        'Montserrat_100Thin': require('./assets/fonts/Montserrat-Thin.ttf'),
        'Montserrat_200ExtraLight': require('./assets/fonts/Montserrat-ExtraLight.ttf'),
        'Montserrat_300Light': require('./assets/fonts/Montserrat-Light.ttf'),
        'Montserrat_400Regular': require('./assets/fonts/Montserrat-Regular.ttf'),
        'Montserrat_500Medium': require('./assets/fonts/Montserrat-Medium.ttf'),
        'Montserrat_600SemiBold': require('./assets/fonts/Montserrat-SemiBold.ttf'),
        'Montserrat_700Bold': require('./assets/fonts/Montserrat-Bold.ttf'),
        'Montserrat_800ExtraBold': require('./assets/fonts/Montserrat-ExtraBold.ttf'),
        'Montserrat_900Black': require('./assets/fonts/Montserrat-Black.ttf'),
        
        // Versões itálicas (opcionais, caso queira usar)
        'Montserrat_400Regular_Italic': require('./assets/fonts/Montserrat-Italic.ttf'),
        'Montserrat_500Medium_Italic': require('./assets/fonts/Montserrat-MediumItalic.ttf'),
        'Montserrat_600SemiBold_Italic': require('./assets/fonts/Montserrat-SemiBoldItalic.ttf'),
        'Montserrat_700Bold_Italic': require('./assets/fonts/Montserrat-BoldItalic.ttf'),
      });
      
      console.log('✅ Fontes Montserrat carregadas com sucesso!');
      setFontsLoaded(true);
      
      // Verificar se há login salvo
      const savedLogin = await AsyncStorage.getItem('isLoggedIn');
      if (savedLogin === 'true') {
        setAppState('main');
      } else {
        setAppState('splash');
      }
    } catch (error) {
      console.error('❌ Erro ao carregar fontes:', error);
      // Mesmo com erro de fonte, continuar para splash
      setFontsLoaded(true);
      setAppState('splash');
    }
  };

  const handleSplashComplete = () => {
    setAppState('login');
  };

  const handleLogin = async () => {
    await AsyncStorage.setItem('isLoggedIn', 'true');
    setAppState('main');
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('isLoggedIn');
    setAppState('login');
  };

  if (appState === 'loading' || !fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#d81b60' }}>
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );
  }

  if (appState === 'splash') {
    return (
      <SplashScreen onComplete={() => setAppState('login')} />
    );
  }

  if (appState === 'login') {
    return (
      <LoginScreen onLogin={handleLogin} />
    );
  }

  return (
    <ErrorBoundary>
      <StatusBar style="auto" />
      
      {appState === 'main' && (
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName: keyof typeof Ionicons.glyphMap;

                if (route.name === 'Produtos') {
                  iconName = focused ? 'storefront' : 'storefront-outline';
                } else if (route.name === 'Dashboard') {
                  iconName = focused ? 'analytics' : 'analytics-outline';
                } else if (route.name === 'Perfil') {
                  iconName = focused ? 'person' : 'person-outline';
                } else {
                  iconName = 'help-outline';
                }

                return <Ionicons name={iconName} size={size} color={color} />;
              },
              tabBarActiveTintColor: '#d81b60',
              tabBarInactiveTintColor: '#666',
              tabBarStyle: {
                backgroundColor: '#fff',
                borderTopColor: '#e0e0e0',
                borderTopWidth: 1,
                elevation: 12,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: -3 },
                shadowOpacity: 0.15,
                shadowRadius: 8,
                paddingBottom: 8,
                paddingTop: 8,
                height: 65,
              },
              tabBarLabelStyle: {
                fontFamily: 'Montserrat_600SemiBold',
                fontSize: 12,
                marginTop: 4,
              },
              headerShown: false,
            })}
          >
            <Tab.Screen 
              name="Produtos" 
              component={ProductsScreen}
              options={{
                tabBarLabel: 'Produtos'
              }}
            />
            <Tab.Screen 
              name="Dashboard" 
              component={DashboardScreen}
              options={{
                tabBarLabel: 'Dashboard'
              }}
            />
            <Tab.Screen 
              name="Perfil"
              options={{
                tabBarLabel: 'Perfil'
              }}
            >
              {() => <ProfileScreen onLogout={handleLogout} />}
            </Tab.Screen>
          </Tab.Navigator>
        </NavigationContainer>
      )}
    </ErrorBoundary>
  );
} 