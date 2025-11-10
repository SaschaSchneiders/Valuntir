import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export default function TransFAB({ 
  onPress, 
  scrollY, 
  bottom = 120,
  text = "Auf Valuntir Pro upgraden",
  icon = "sparkles"
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const screenWidth = Dimensions.get('window').width;

  // Animierte Werte - smooth mit clamp
  const buttonBorderRadius = 32; // Immer komplett rund (wie ProfileFAB)

  // Wenn kein scrollY übergeben wird, statische Werte verwenden
  const buttonLeft = scrollY !== undefined ? scrollY.interpolate({
    inputRange: [0, 1200, 1400],
    outputRange: [screenWidth - 84, screenWidth - 84, 20], // Rund rechts → breit links
    extrapolate: 'clamp',
  }) : screenWidth - 84;

  const buttonRight = scrollY !== undefined ? scrollY.interpolate({
    inputRange: [0, 1200, 1400],
    outputRange: [20, 20, 20], // Immer 20
    extrapolate: 'clamp',
  }) : 20;

  const iconOpacity = scrollY !== undefined ? scrollY.interpolate({
    inputRange: [0, 1200, 1300],
    outputRange: [1, 1, 0],
    extrapolate: 'clamp',
  }) : 1;

  const textOpacity = scrollY !== undefined ? scrollY.interpolate({
    inputRange: [1200, 1300, 1400],
    outputRange: [0, 0.5, 1],
    extrapolate: 'clamp',
  }) : 0;

  return (
    <Animated.View
      style={[
        styles.fabContainer,
        {
          left: buttonLeft,
          right: buttonRight,
          borderRadius: buttonBorderRadius,
          bottom,
        },
      ]}
    >
      <LinearGradient
        colors={['#3B82F6', '#2563EB', '#1D4ED8']} // Premium Blau-Gradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.fabGradient}
      >
        <TouchableOpacity 
          style={styles.fab}
          onPress={onPress}
          activeOpacity={0.9}
        >
          {/* Icon (sichtbar wenn rund) */}
          <Animated.View style={{ opacity: iconOpacity }}>
            <Ionicons name={icon} size={28} color="#FFFFFF" />
          </Animated.View>
          
          {/* Text (sichtbar wenn breit) */}
          <Animated.View 
            style={[
              styles.fabTextContainer,
              { 
                opacity: textOpacity,
                position: isExpanded ? 'relative' : 'absolute',
              }
            ]}
          >
            <Ionicons name={icon} size={20} color="#FFFFFF" style={{ marginRight: 8 }} />
            <Text style={styles.fabText}>{text}</Text>
          </Animated.View>
        </TouchableOpacity>
      </LinearGradient>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  fabContainer: {
    position: 'absolute',
    height: 64,
    // Premium Shadow mit Glow-Effekt
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 999,
    zIndex: 999,
    borderRadius: 32, // Für Shadow/Elevation
  },
  fabGradient: {
    flex: 1,
    borderRadius: 32, // Komplett rund wie ProfileFAB (64px Höhe)
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    overflow: 'hidden',
  },
  fab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  fabTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  fabText: {
    fontSize: 17,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -0.3,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});


