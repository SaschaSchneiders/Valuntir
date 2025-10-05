import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PrimaryButton from './PrimaryButton';

export default function ProviderCard({ provider, onPress }) {
  const getSuccessRateColor = (rate) => {
    if (rate >= 90) return '#22C55E';
    if (rate >= 80) return '#F59E0B';
    if (rate >= 70) return '#EF4444';
    return '#999999';
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.header}>
        <View style={styles.icon}>
          <Ionicons name="briefcase" size={24} color="#000" />
        </View>
        <View style={styles.info}>
          <Text style={styles.name}>{provider.name}</Text>
          <Text style={styles.username}>{provider.username}</Text>
        </View>
      </View>

      <View style={styles.details}>
        <View style={styles.meta}>
          <View style={styles.metaItem}>
            <Ionicons name="location-outline" size={14} color="#666" />
            <Text style={styles.metaText}>{provider.location}</Text>
          </View>
          <View style={styles.metaItem}>
            <Ionicons name="pricetag-outline" size={14} color="#666" />
            <Text style={styles.metaText}>{provider.category}</Text>
          </View>
        </View>
      </View>

      <View style={styles.stats}>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Bewertungen</Text>
          <Text style={styles.statValue}>{provider.reviewCount}</Text>
        </View>
        
        <View style={styles.statDivider} />
        
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Erfolgsquote</Text>
          {provider.hasActivePlan ? (
            <Text 
              style={[
                styles.statValue, 
                { color: getSuccessRateColor(provider.successRate) }
              ]}
            >
              {provider.successRate}%
            </Text>
          ) : (
            <View style={styles.lockedBadge}>
              <Ionicons name="lock-closed" size={12} color="#999" />
              <Text style={styles.lockedText}>Nicht aktiviert</Text>
            </View>
          )}
        </View>
      </View>

      {provider.hasActivePlan && (
        <PrimaryButton onPress={onPress}>
          Profil ansehen
        </PrimaryButton>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.06)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  icon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 17,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 4,
  },
  username: {
    fontSize: 14,
    color: '#666666',
    fontWeight: '500',
  },
  details: {
    marginBottom: 16,
  },
  meta: {
    flexDirection: 'row',
    gap: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaText: {
    fontSize: 13,
    color: '#666666',
    fontWeight: '500',
  },
  stats: {
    flexDirection: 'row',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    marginBottom: 16,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    backgroundColor: '#F0F0F0',
    marginHorizontal: 12,
  },
  statLabel: {
    fontSize: 12,
    color: '#999999',
    fontWeight: '500',
    marginBottom: 6,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '800',
    color: '#000000',
    letterSpacing: -0.5,
  },
  lockedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  lockedText: {
    fontSize: 10,
    color: '#999999',
    fontWeight: '600',
  },
});

