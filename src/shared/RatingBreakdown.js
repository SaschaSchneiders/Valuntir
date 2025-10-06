import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function RatingBreakdown({
  communication = 87,
  pricePerformance = 92,
  deliveryQuality = 89,
  reliability = 94,
  totalProjects = 124,
}) {
  const categories = [
    {
      icon: 'chatbubble-ellipses-outline',
      label: 'Kommunikation',
      value: communication,
    },
    {
      icon: 'cash-outline',
      label: 'Preis-Leistung',
      value: pricePerformance,
    },
    {
      icon: 'construct-outline',
      label: 'Lieferqualität / Umsetzung',
      value: deliveryQuality,
    },
    {
      icon: 'calendar-outline',
      label: 'Verlässlichkeit',
      value: reliability,
    },
  ];

  const getBarColor = (value) => {
    if (value >= 90) return ['#10B981', '#059669']; // Grün
    if (value >= 75) return ['#F59E0B', '#D97706']; // Gelb/Orange
    return ['#EF4444', '#DC2626']; // Rot
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Bewertungsdetails <Text style={styles.subtitle}>(aus {totalProjects} Projekten)</Text>
      </Text>
      
      {categories.map((category, index) => (
        <View key={index} style={styles.categoryRow}>
          {/* Icon & Label */}
          <View style={styles.categoryHeader}>
            <View style={styles.iconContainer}>
              <Ionicons name={category.icon} size={20} color="#000" />
            </View>
            <Text style={styles.categoryLabel}>{category.label}</Text>
          </View>

          {/* Bar & Value */}
          <View style={styles.barRow}>
            <View style={styles.barBackground}>
              <LinearGradient
                colors={getBarColor(category.value)}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[styles.barFill, { width: `${category.value}%` }]}
              />
            </View>
            <Text style={styles.valueText}>{category.value}%</Text>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
    marginBottom: 20,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '400',
    color: '#999',
  },
  categoryRow: {
    marginBottom: 20,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  categoryLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },
  barRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  barBackground: {
    flex: 1,
    height: 8,
    backgroundColor: '#F0F0F0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 4,
  },
  valueText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#000',
    width: 42,
    textAlign: 'right',
  },
});

