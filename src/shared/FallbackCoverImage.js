import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function FallbackCoverImage() {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#FAFAFA', '#F0F0F0', '#E5E5E5']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        {/* Hauptslogan - zentral und prominent */}
        <View style={styles.sloganContainer}>
          <Text style={styles.slogan}>Sieh schwarz auf weiß{'\n'}wer wirklich liefert</Text>
        </View>
        
        {/* Valuntir Text - klein und subtil unten rechts */}
        <Text style={styles.brandText}>Valuntir</Text>
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
    color: '#000000',
    letterSpacing: 0.2,
    textAlign: 'center',
    lineHeight: 22,
  },
  brandText: {
    position: 'absolute',
    bottom: 14,
    right: 18,
    fontSize: 14,
    fontWeight: '600',
    color: 'rgba(0, 0, 0, 0.4)',
    letterSpacing: 0.5,
  },
});

