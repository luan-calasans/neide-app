import React, { useEffect, useRef } from 'react';
import { View, Text, Image, Animated, Dimensions } from 'react-native';
import { styles } from './style';

const { width, height } = Dimensions.get('window');

export function SplashScreen({ onComplete }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Sequência de animações
    const startAnimations = () => {
      // 1. Fade in inicial
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }).start();

      // 2. Scale up suave
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }).start();

      // 3. Efeito de pulsação contínua
      const pulseAnimation = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      );

      pulseAnimation.start();

      // 4. Finalizar após 3 segundos
      setTimeout(() => {
        pulseAnimation.stop();
        
        // Fade out final
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }).start(() => {
          onComplete();
        });
      }, 3000);
    };

    startAnimations();
  }, [fadeAnim, scaleAnim, pulseAnim, onComplete]);

  return (
    <View style={styles.container}>
      {/* Background gradiente animado */}
      <Animated.View style={[styles.backgroundGradient, { opacity: fadeAnim }]} />
      
      {/* Logo com efeito de pulsação */}
      <Animated.View 
        style={[
          styles.logoContainer,
          {
            opacity: fadeAnim,
            transform: [
              { scale: Animated.multiply(scaleAnim, pulseAnim) }
            ]
          }
        ]}
      >
        <Image source={require('../../assets/logo.png')} style={styles.logo} />
        
        {/* Círculo decorativo pulsante */}
        <Animated.View 
          style={[
            styles.pulseCircle,
            {
              transform: [{ scale: pulseAnim }]
            }
          ]} 
        />
      </Animated.View>

      {/* Texto da marca */}
      <Animated.View 
        style={[
          styles.textContainer,
          { 
            opacity: fadeAnim,
            transform: [{ translateY: Animated.multiply(scaleAnim, -20) }]
          }
        ]}
      >
        <Text style={styles.brandName}>Neide Cosméticos</Text>
        <Text style={styles.tagline}>Beleza que transforma</Text>
      </Animated.View>

      {/* Indicador de carregamento */}
      <Animated.View 
        style={[
          styles.loadingContainer,
          { opacity: fadeAnim }
        ]}
      >
        <View style={styles.loadingDots}>
          <Animated.View 
            style={[
              styles.dot,
              { transform: [{ scale: pulseAnim }] }
            ]} 
          />
          <Animated.View 
            style={[
              styles.dot,
              { transform: [{ scale: Animated.multiply(pulseAnim, 0.8) }] }
            ]} 
          />
          <Animated.View 
            style={[
              styles.dot,
              { transform: [{ scale: Animated.multiply(pulseAnim, 0.6) }] }
            ]} 
          />
        </View>
        <Text style={styles.loadingText}>Carregando...</Text>
      </Animated.View>
    </View>
  );
} 