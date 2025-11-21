import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ProfileImageFallback from './ProfileImageFallback';

export default function ProviderCard({ provider, onPress }) {
  const getSuccessRateColor = (rate) => {
    if (!rate || rate === 0) return '#9CA3AF'; // 0%: Grau
    
    // Subtiler Grün-Gradient durchgehend (kaum wahrnehmbar, nicht wertend)
    if (rate >= 90) return '#10B981'; // 90-100%: Primärgrün
    if (rate >= 80) return '#14B885'; // 80-89%: Minimal dunkler
    if (rate >= 70) return '#18B789'; // 70-79%: Etwas dunkler
    if (rate >= 60) return '#1FB68D'; // 60-69%: 
    if (rate >= 50) return '#26B591'; // 50-59%: 
    if (rate >= 40) return '#2DB495'; // 40-49%: 
    if (rate >= 30) return '#34B399'; // 30-39%: 
    if (rate >= 20) return '#3BB29D'; // 20-29%: 
    if (rate >= 10) return '#42B1A1'; // 10-19%: 
    return '#49B0A5'; // 1-9%: Immer noch grün
  };

  return (
    <TouchableOpacity 
      style={styles.card} 
      onPress={onPress}
      activeOpacity={0.8}
    >
      {/* Header mit Icon, Name und Chevron */}
      <View style={styles.cardHeader}>
        <ProfileImageFallback size={40} iconSize={22} style={styles.iconContainer} />

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
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    marginRight: 12,
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

