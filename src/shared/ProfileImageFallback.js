import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileImageFallback({ 
  size = 40, 
  iconSize = 22, 
  style,
  variant = 'light', // 'light' (für Cards), 'dark' (legacy), 'profile' (für ProfileScreen)
}) {
  const containerSize = {
    width: size,
    height: size,
    borderRadius: size / 2,
  };

  const isLight = variant === 'light';
  const isDark = variant === 'dark';
  const isProfile = variant === 'profile';

  let containerStyle = {};
  let iconColor = '#000';

  if (isLight) {
    containerStyle = {
      backgroundColor: 'rgba(0, 0, 0, 0.03)',
      borderColor: 'rgba(0, 0, 0, 0.08)',
    };
    iconColor = '#000';
  } else if (isDark) {
    containerStyle = {
      backgroundColor: '#000000',
      borderColor: '#FFFFFF',
    };
    iconColor = '#FFFFFF';
  } else if (isProfile) {
    containerStyle = {
      backgroundColor: '#F5F5F5',
      borderColor: 'rgba(0, 0, 0, 0.1)',
      shadowOpacity: 0.12,
      shadowRadius: 12,
      elevation: 6,
    };
    iconColor = '#000';
  }

  return (
    <View style={[styles.container, containerSize, containerStyle, style]}>
      <Ionicons name="business" size={iconSize} color={iconColor} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
});

