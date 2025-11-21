import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function LiveMetrics({ style, compact = false, popup = false }) {
  return (
    <View style={[styles.container, compact && styles.containerCompact, popup && styles.containerPopup, style]}>
      {/* Header */}
      <View style={styles.metricsHeader}>
        <Ionicons name="pulse" size={16} color="#10B981" />
        <Text style={styles.metricsHeaderText}>Live auf der Plattform</Text>
      </View>

      {/* Metrics Grid */}
      <View style={styles.metricsGrid}>
        {/* Metric 1: Verifizierte Bewertungen */}
        <View style={styles.metricItem}>
          <Text style={styles.metricNumber}>12.589</Text>
          <Text style={styles.metricLabel}>Verifizierte Bewertungen</Text>
          <View style={styles.metricGrowth}>
            <Ionicons name="trending-up" size={12} color="#10B981" />
            <Text style={styles.metricGrowthText}>+18% in 30 Tagen</Text>
          </View>
        </View>

        {/* Divider */}
        <View style={styles.metricDivider}>
          <View style={styles.metricDividerLine} />
        </View>

        {/* Metric 2: Bewertetes Volumen */}
        <View style={styles.metricItem}>
          <Text style={styles.metricNumber}>683.479€</Text>
          <Text style={styles.metricLabel}>Bewertetes Volumen</Text>
          <View style={styles.metricGrowth}>
            <Ionicons name="trending-up" size={12} color="#10B981" />
            <Text style={styles.metricGrowthText}>+24% in 30 Tagen</Text>
          </View>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.metricsFooter}>
        <View style={styles.footerItem}>
          <Ionicons name="checkmark-circle" size={14} color="#3B82F6" />
          <Text style={styles.footerText}>500+ öffentliche Erfolgsraten</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 40,
    paddingVertical: 12,
  },
  containerCompact: {
    paddingVertical: 0,
    marginBottom: 36,
  },
  containerPopup: {
    marginBottom: 0,
    paddingVertical: 0,
  },
  metricsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 32,
  },
  metricsHeaderText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#10B981',
  },
  metricsGrid: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  metricItem: {
    flex: 1,
    alignItems: 'center',
  },
  metricDivider: {
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  metricDividerLine: {
    width: 1,
    height: 60,
    backgroundColor: '#E5E5E5',
  },
  metricNumber: {
    fontSize: 24,
    fontWeight: '900',
    color: '#000000',
    marginBottom: 4,
    letterSpacing: -0.5,
  },
  metricLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#666666',
    textAlign: 'center',
    marginBottom: 8,
    lineHeight: 18,
  },
  metricGrowth: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  metricGrowthText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#10B981',
  },
  metricsFooter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  footerText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666666',
  },
});

