import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function FallbackCoverImage() {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#F5F5F5', '#E8E8E8', '#DBDBDB']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradient}
      >
        {/* Content - rechts positioniert */}
        <View style={styles.content}>
          <Text style={styles.brandmark}>VALUNTIR</Text>
          <Text style={styles.tagline}>Die Erfolgsquoten-Plattform</Text>
          
          {/* Trust Badge - Glassmorphism */}
          <View style={styles.trustBadge}>
            <Text style={styles.trustText}>VERGLEICHE 500+ ERFOLGSQUOTEN</Text>
          </View>
        </View>
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
    justifyContent: 'center',
    paddingRight: 24,
  },
  content: {
    alignItems: 'flex-end',
  },
  brandmark: {
    fontSize: 36,
    fontWeight: '900',
    color: '#000000',
    marginBottom: 8,
  },
  tagline: {
    fontSize: 13,
    fontWeight: '500',
    color: '#666666',
    letterSpacing: 0.3,
    textAlign: 'right',
    marginBottom: 14,
  },
  trustBadge: {
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.08)',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  trustText: {
    fontSize: 9,
    fontWeight: '600',
    color: '#666666',
    letterSpacing: 0.5,
  },
});

