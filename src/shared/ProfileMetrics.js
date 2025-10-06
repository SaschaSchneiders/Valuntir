import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ProfileMetrics({
  profileViews = 0,
  profileViewsChange = '+0%',
  profileInteractions = 0,
  interactionsChange = '+0%',
}) {
  return (
    <View style={styles.container}>
      <View style={styles.metricsRow}>
        {/* Profilaufrufe */}
        <View style={styles.metricColumn}>
          <View style={styles.metricHeader}>
            <Text style={styles.metricTitle}>Profilaufrufe</Text>
            <View style={styles.metricChange}>
              <Text style={styles.metricChangeText}>{profileViewsChange}</Text>
            </View>
          </View>
          <Text style={styles.metricNumber}>{profileViews}</Text>
          <Text style={styles.metricSubtitle}>Gesamt</Text>
        </View>

        {/* Divider */}
        <View style={styles.metricDivider} />

        {/* Interaktionen */}
        <View style={styles.metricColumn}>
          <View style={styles.metricHeader}>
            <Text style={styles.metricTitle}>Interaktionen</Text>
            <View style={styles.metricChange}>
              <Text style={styles.metricChangeText}>{interactionsChange}</Text>
            </View>
          </View>
          <Text style={styles.metricNumber}>{profileInteractions}</Text>
          <Text style={styles.metricSubtitle}>Gesamt</Text>
        </View>
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
  metricsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metricColumn: {
    flex: 1,
  },
  metricDivider: {
    width: 1,
    height: 80,
    backgroundColor: '#E5E5E5',
    marginHorizontal: 20,
  },
  metricHeader: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginBottom: 12,
    gap: 8,
  },
  metricTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#666666',
    letterSpacing: -0.2,
  },
  metricChange: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  metricChangeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#000000',
  },
  metricNumber: {
    fontSize: 38,
    fontWeight: '900',
    color: '#000000',
    marginBottom: 4,
    letterSpacing: -1,
  },
  metricSubtitle: {
    fontSize: 13,
    color: '#999999',
    fontWeight: '500',
  },
});

