import React from 'react';
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

/**
 * PrimaryButton - Wiederverwendbarer Button mit Gradient
 * 
 * @param {string} title - Button-Text
 * @param {function} onPress - Callback wenn Button gedrückt wird
 * @param {string} icon - Optional: Ionicons Name für Icon
 * @param {string} variant - 'primary' (dunkel mit Gradient), 'secondary' (hell), 'outline' (transparent mit Border)
 * @param {string} size - 'default' (standard 14px padding), 'compact' (kleiner 10px padding, für ConnectionCard)
 * @param {boolean} disabled - Button deaktiviert
 * @param {object} style - Zusätzliche Container-Styles
 * @param {number} flex - Flex-Wert für Button (z.B. für Row-Layout)
 */
export default function PrimaryButton({ 
  title, 
  onPress, 
  icon, 
  iconPosition = 'right', // 'left' oder 'right'
  variant = 'primary',
  size = 'default', // 'default' oder 'compact'
  disabled = false,
  style,
  flex
}) {
  
  const getColors = () => {
    if (disabled) {
      return {
        gradient: ['#CCCCCC', '#CCCCCC'],
        text: '#FFFFFF',
        icon: '#FFFFFF',
        borderColor: 'transparent',
      };
    }
    
    switch (variant) {
      case 'primary':
        return {
          gradient: ['#3A3A3A', '#0F0F0F', '#3A3A3A'],
          text: '#FFFFFF',
          icon: '#FFFFFF',
          borderColor: 'rgba(255, 255, 255, 0.1)',
        };
      case 'secondary':
        return {
          gradient: ['#F5F5F5', '#F5F5F5'],
          text: '#000000',
          icon: '#000000',
          borderColor: '#E0E0E0',
        };
      case 'outline':
        return {
          gradient: ['transparent', 'transparent'],
          text: '#000000',
          icon: '#666666',
          borderColor: '#E0E0E0',
        };
      default:
        return {
          gradient: ['#3A3A3A', '#0F0F0F', '#3A3A3A'],
          text: '#FFFFFF',
          icon: '#FFFFFF',
          borderColor: 'rgba(255, 255, 255, 0.1)',
        };
    }
  };
  
  const colors = getColors();
  
  const buttonStyles = size === 'compact' 
    ? styles.buttonCompact 
    : styles.button;
  
  return (
    <View style={[
      styles.container,
      flex && { flex },
      style
    ]}>
      <LinearGradient
        colors={colors.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0.8 }}
        style={[
          styles.gradient,
          { borderColor: colors.borderColor }
        ]}
      >
        <TouchableOpacity 
          style={buttonStyles} 
          onPress={onPress}
          disabled={disabled}
          activeOpacity={0.85}
        >
          {icon && iconPosition === 'left' && (
            <Ionicons name={icon} size={20} color={colors.icon} />
          )}
          <Text style={[styles.buttonText, { color: colors.text }]}>
            {title}
          </Text>
          {icon && iconPosition === 'right' && (
            <Ionicons name={icon} size={20} color={colors.icon} />
          )}
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
  },
  gradient: {
    borderRadius: 32,
    borderWidth: 1,
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  buttonCompact: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '700',
  },
});


