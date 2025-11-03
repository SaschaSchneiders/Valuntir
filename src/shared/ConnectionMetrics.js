import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ConnectionMetrics({
  sent = 0,
  pending = 0,
  rated = 0,
  totalVolume = 0,
}) {
  // Formatiere Betrag mit Tausender-Trennzeichen
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };
  return (
    <View style={styles.container}>
      {/* Überschrift */}
      <View style={styles.header}>
        <Text style={styles.title}>Connection-Status</Text>
        <Text style={styles.subtitle}>Übersicht deiner Geschäftsbeziehungen</Text>
      </View>

      <View style={styles.metricsRow}>
        {/* Versendet */}
        <View style={styles.metricColumn}>
          <Text style={styles.metricNumber}>{sent}</Text>
          <Text style={styles.metricLabel}>Versendet</Text>
        </View>

        {/* Divider */}
        <View style={styles.metricDivider} />

        {/* Ausstehend */}
        <View style={styles.metricColumn}>
          <Text style={styles.metricNumber}>{pending}</Text>
          <Text style={styles.metricLabel}>Ausstehend</Text>
        </View>

        {/* Divider */}
        <View style={styles.metricDivider} />

        {/* Bewertet */}
        <View style={styles.metricColumn}>
          <Text style={styles.metricNumber}>{rated}</Text>
          <Text style={styles.metricLabel}>Bewertet</Text>
        </View>
      </View>

      {/* Horizontaler Divider */}
      <View style={styles.horizontalDivider} />

      {/* Gesamtvolumen */}
      <View style={styles.volumeSection}>
        <Text style={styles.volumeLabel}>Gesamtvolumen bewertet</Text>
        <Text style={styles.volumeAmount}>{formatCurrency(totalVolume)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.06)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.08,
    shadowRadius: 32,
    elevation: 12,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 4,
    letterSpacing: -0.3,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666666',
  },
  metricsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  metricColumn: {
    flex: 1,
    alignItems: 'center',
  },
  metricDivider: {
    width: 1,
    height: 60,
    backgroundColor: '#E5E5E5',
    marginHorizontal: 16,
  },
  metricNumber: {
    fontSize: 42,
    fontWeight: '900',
    color: '#000000',
    marginBottom: 8,
    letterSpacing: -1.5,
  },
  metricLabel: {
    fontSize: 14,
    color: '#666666',
    fontWeight: '600',
  },
  horizontalDivider: {
    height: 1,
    backgroundColor: '#E5E5E5',
    marginVertical: 20,
  },
  volumeSection: {
    alignItems: 'center',
  },
  volumeLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666666',
    marginBottom: 8,
  },
  volumeAmount: {
    fontSize: 28,
    fontWeight: '800',
    color: '#000000',
    letterSpacing: -0.5,
  },
});

