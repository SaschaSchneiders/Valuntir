import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ProviderCard({ provider, onPress }) {
  const getSuccessRateColor = (rate) => {
    if (!rate) return '#999999';
    if (rate >= 90) return '#10B981';
    if (rate >= 80) return '#F59E0B';
    return '#EF4444';
  };

  return (
    <TouchableOpacity 
      style={styles.card} 
      onPress={onPress}
      activeOpacity={0.8}
    >
      {/* Header mit Icon, Name und Chevron */}
      <View style={styles.cardHeader}>
        <View style={styles.iconContainer}>
          <Ionicons 
            name="business" 
            size={22} 
            color="#FFFFFF"
          />
        </View>

        <View style={styles.info}>
          <Text style={styles.name} numberOfLines={1}>{provider.name}</Text>
          <View style={styles.meta}>
            <View style={styles.metaItem}>
              <Ionicons name="location-outline" size={12} color="#999" />
              <Text style={styles.metaText}>{provider.location}</Text>
            </View>
            <Text style={styles.metaDivider}>•</Text>
            <View style={styles.metaItem}>
              <Ionicons name="pricetag-outline" size={12} color="#999" />
              <Text style={styles.metaText}>{provider.category}</Text>
            </View>
          </View>
        </View>

        {provider.hasActivePlan && (
          <Ionicons name="chevron-forward" size={20} color="#CCCCCC" />
        )}
      </View>

      {/* Stats Section - Zentriert */}
      <View style={styles.statsSection}>
        <View style={styles.stat}>
          <Text style={styles.statLabel}>Bewertungen</Text>
          <Text style={styles.statNumber}>{provider.reviewCount}</Text>
        </View>
        
        <View style={styles.statDivider} />
        
        <View style={styles.stat}>
          <Text style={styles.statLabel}>Erfolgsquote</Text>
          {provider.hasActivePlan ? (
            <Text 
              style={[
                styles.successRate,
                { 
                  color: getSuccessRateColor(provider.successRate),
                  textShadowColor: 'rgba(0, 0, 0, 0.08)',
                }
              ]}
            >
              {provider.successRate}%
            </Text>
          ) : (
            <View style={styles.lockedContainer}>
              <Ionicons name="lock-closed" size={11} color="#999" />
              <Text style={styles.lockedText}>Nicht aktiviert</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.08)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 8,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 6,
    letterSpacing: -0.3,
    textShadowColor: 'rgba(0, 0, 0, 0.03)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaDivider: {
    fontSize: 12,
    color: '#CCCCCC',
    marginHorizontal: 4,
  },
  metaText: {
    fontSize: 12,
    color: '#666666',
    fontWeight: '500',
  },
  statsSection: {
    flexDirection: 'row',
    paddingTop: 12,
    paddingBottom: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.06)',
    backgroundColor: 'rgba(248, 249, 250, 0.5)',
    marginHorizontal: -24,
    marginBottom: -24,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  stat: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 4,
  },
  statDivider: {
    width: 1,
    height: 45,
    backgroundColor: 'rgba(0, 0, 0, 0.08)',
    alignSelf: 'center',
  },
  statLabel: {
    fontSize: 10,
    color: '#999999',
    fontWeight: '600',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '900',
    color: '#000000',
    letterSpacing: -1,
  },
  successRate: {
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: -1.5,
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  lockedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(245, 245, 245, 0.9)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.06)',
  },
  lockedText: {
    fontSize: 11,
    color: '#999999',
    fontWeight: '700',
    letterSpacing: -0.2,
  },
});

