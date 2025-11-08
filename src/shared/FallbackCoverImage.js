import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function FallbackCoverImage() {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#dbeafe', '#bfdbfe', '#93c5fd']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        {/* Hauptslogan - zentral und prominent */}
        <View style={styles.sloganContainer}>
          <Text style={styles.slogan}>Echte Erfolgsquoten für{'\n'}fundierte Entscheidungen</Text>
        </View>
        
        {/* Logo - klein und subtil unten rechts */}
        <Image 
          source={require('../../assets/VALUNTIR.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  gradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 28,
    position: 'relative',
  },
  sloganContainer: {
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  slogan: {
    fontSize: 16,
    fontWeight: '700',
    color: 'rgba(0, 0, 0, 0.85)',
    letterSpacing: 0.2,
    textAlign: 'center',
    lineHeight: 22,
  },
  logo: {
    position: 'absolute',
    bottom: 12,
    right: 16,
    width: 90,
    height: 20,
    opacity: 1,
  },
});

