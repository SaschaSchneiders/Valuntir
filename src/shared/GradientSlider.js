import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Slider from '@react-native-community/slider';

/**
 * GradientSlider - Custom Slider mit Gradient Track
 * 
 * @param {number} value - Aktueller Wert
 * @param {function} onValueChange - Callback wenn der Wert geändert wird
 * @param {number} minimumValue - Minimaler Wert (default: 1)
 * @param {number} maximumValue - Maximaler Wert (default: 10)
 * @param {string} colorScheme - Farbschema: 'green' oder 'black' (default: 'green')
 * @param {Animated.Value} bounceAnim - Optional: Animated Value für Bounce-Effekt
 */
export default function GradientSlider({ 
  value, 
  onValueChange, 
  minimumValue = 1, 
  maximumValue = 10, 
  colorScheme = 'green',
  bounceAnim 
}) {
  const percentage = ((value - minimumValue) / (maximumValue - minimumValue)) * 100;
  
  // Farbschemas definieren
  const colorSchemes = {
    green: {
      gradient: ['#10B981', '#059669'],
      startColor: { r: 16, g: 185, b: 129 },
      endColor: { r: 5, g: 150, b: 105 },
    },
    black: {
      gradient: ['#4B5563', '#1F2937'],
      startColor: { r: 75, g: 85, b: 99 },
      endColor: { r: 31, g: 41, b: 55 },
    },
  };
  
  const currentScheme = colorSchemes[colorScheme] || colorSchemes.green;
  
  // Berechne Thumb-Farbe basierend auf Position im Gradient
  const getThumbColor = (percentage) => {
    const { startColor, endColor } = currentScheme;
    
    const ratio = percentage / 100;
    const r = Math.round(startColor.r + (endColor.r - startColor.r) * ratio);
    const g = Math.round(startColor.g + (endColor.g - startColor.g) * ratio);
    const b = Math.round(startColor.b + (endColor.b - startColor.b) * ratio);
    
    return `rgb(${r}, ${g}, ${b})`;
  };
  
  const thumbColor = getThumbColor(percentage);

  return (
    <View style={styles.container}>
      {/* Gradient Track im Hintergrund */}
      <View style={styles.trackContainer}>
        <View style={styles.trackBackground}>
          <LinearGradient
            colors={currentScheme.gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[styles.trackFill, { width: `${percentage}%` }]}
          />
        </View>
      </View>
      
      {/* Bounce-Animation nur für den Thumb */}
      <View style={styles.sliderWrapper}>
        <Animated.View 
          style={[
            styles.animatedThumb,
            { transform: [{ translateX: bounceAnim || 0 }] }
          ]}
          pointerEvents="none"
        >
          <View 
            style={[
              styles.customThumb,
              { 
                backgroundColor: thumbColor,
                left: `${percentage}%`,
                marginLeft: -12,
              }
            ]} 
          />
        </Animated.View>
        
        {/* Nativer Slider darüber (unsichtbarer Thumb) */}
        <Slider
          style={styles.sliderOverlay}
          minimumValue={minimumValue}
          maximumValue={maximumValue}
          step={1}
          value={value}
          onValueChange={onValueChange}
          minimumTrackTintColor="transparent"
          maximumTrackTintColor="transparent"
          thumbTintColor="transparent"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 40,
    position: 'relative',
    justifyContent: 'center',
  },
  trackContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 8,
    justifyContent: 'center',
    pointerEvents: 'none',
  },
  trackBackground: {
    height: 8,
    backgroundColor: '#F0F0F0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  trackFill: {
    height: '100%',
    borderRadius: 4,
  },
  sliderWrapper: {
    width: '100%',
    height: 40,
    position: 'relative',
  },
  animatedThumb: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  },
  customThumb: {
    position: 'absolute',
    width: 24,
    height: 24,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  sliderOverlay: {
    width: '100%',
    height: 40,
  },
});

