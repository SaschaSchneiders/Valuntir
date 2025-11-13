import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';

export default function ToggleSettingsFAB({ 
  isPublicView, 
  onToggle,
  bottom = 110 
}) {
  return (
    <View style={[styles.fabContainer, { bottom }]}>
      <BlurView intensity={60} tint="dark" style={styles.fabBlur}>
        <LinearGradient
          colors={['rgba(30, 30, 30, 0.4)', 'rgba(10, 10, 10, 0.5)', 'rgba(30, 30, 30, 0.4)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.gradientOverlay}
        >
          <TouchableOpacity 
            style={styles.toggleSection}
            onPress={onToggle}
            activeOpacity={0.7}
          >
            <View style={styles.iconCircle}>
              <Ionicons 
                name={isPublicView ? 'globe-outline' : 'briefcase-outline'} 
                size={16} 
                color="#FFFFFF" 
              />
            </View>
            <Text style={styles.toggleText}>
              {isPublicView ? 'Öffentlich' : 'Anbieter'}
            </Text>
          </TouchableOpacity>
        </LinearGradient>
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  fabContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 1000,
    elevation: 20,
  },
  fabBlur: {
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.3,
    shadowRadius: 24,
    elevation: 16,
  },
  gradientOverlay: {
    borderRadius: 24,
  },
  toggleSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingLeft: 8,
    paddingRight: 12,
    gap: 7,
  },
  iconCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  toggleText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    letterSpacing: -0.3,
  },
});
