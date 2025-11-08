import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { usePackage } from '../context/PackageContext';

export default function PackageBadge() {
  const { isFree, isPro, isBusiness } = usePackage();

  const getBadgeStyle = () => {
    if (isFree) {
      return {
        backgroundColor: 'rgba(239, 68, 68, 0.15)', // Sehr transparent
        borderColor: 'rgba(239, 68, 68, 0.3)',
        textColor: 'rgba(239, 68, 68, 0.9)', // Kräftiges Rot
      };
    }
    if (isPro) {
      return {
        backgroundColor: 'rgba(59, 130, 246, 0.15)', // Sehr transparent
        borderColor: 'rgba(59, 130, 246, 0.3)',
        textColor: 'rgba(59, 130, 246, 0.9)', // Kräftiges Blau
      };
    }
    if (isBusiness) {
      return {
        backgroundColor: 'rgba(16, 185, 129, 0.15)', // Sehr transparent
        borderColor: 'rgba(16, 185, 129, 0.3)',
        textColor: 'rgba(16, 185, 129, 0.95)', // Kräftiges Grün
      };
    }
    return {
      backgroundColor: 'rgba(102, 102, 102, 0.15)',
      borderColor: 'rgba(102, 102, 102, 0.3)',
      textColor: 'rgba(102, 102, 102, 0.9)',
    };
  };

  const getLabel = () => {
    if (isFree) return 'FREE';
    if (isPro) return 'PRO';
    if (isBusiness) return 'BUSINESS';
    return '';
  };

  const badgeStyle = getBadgeStyle();

  return (
    <View style={[styles.badge, { backgroundColor: badgeStyle.backgroundColor, borderColor: badgeStyle.borderColor }]}>
      <Text style={[styles.badgeText, { color: badgeStyle.textColor }]}>{getLabel()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    top: 60,
    right: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    zIndex: 9999,
    // Glasmorphism - sehr dezent
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    backdropFilter: 'blur(20px)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  badgeText: {
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 0.8,
    textShadowColor: 'rgba(255, 255, 255, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});

