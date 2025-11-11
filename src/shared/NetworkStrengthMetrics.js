import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function NetworkStrengthMetrics({
  totalConnections = 108,
  averageSuccessRate = 83,
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Deine Netzwerkstärke</Text>
      <Text style={styles.subtitle}>Die Qualität deiner Partner spiegelt deine Entscheidungskompetenz wider</Text>
      
      {/* Horizontal Split Layout für Pattern Interrupt */}
      <View style={styles.metricsRow}>
        {/* Linke Seite: Connections */}
        <View style={styles.metricHalf}>
          <Text style={styles.bigNumber}>{totalConnections}</Text>
          <Text style={styles.metricLabelSmall}>Unternehmen mit dir verbunden</Text>
        </View>

        {/* Vertikaler Divider */}
        <View style={styles.divider} />

        {/* Rechte Seite: Erfolgsquote */}
        <View style={styles.metricHalf}>
          <Text style={styles.bigNumber}>{averageSuccessRate}%</Text>
          <Text style={styles.metricLabelSmall}>⌀ Erfolgsquote deiner Partner</Text>
        </View>
      </View>

      {/* Quality Indicator */}
      <View style={styles.qualitySection}>
        <LinearGradient
          colors={['rgba(16, 185, 129, 0.1)', 'rgba(16, 185, 129, 0.02)']}
          style={styles.qualityGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
        >
          <View style={styles.qualityContent}>
            <Ionicons name="checkmark-circle" size={20} color="#10B981" />
            <Text style={styles.qualityText}>
              Starke Entscheidungskompetenz. Deine Partner liefern überdurchschnittlich
            </Text>
          </View>
        </LinearGradient>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
    letterSpacing: -0.5,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
    marginBottom: 24,
  },
  metricsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  metricHalf: {
    flex: 1,
    alignItems: 'center',
    gap: 12,
  },
  divider: {
    width: 1,
    height: 60,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    marginHorizontal: 20,
  },
  bigNumber: {
    fontSize: 48,
    fontWeight: '900',
    color: '#000',
    letterSpacing: -2,
    lineHeight: 52,
  },
  metricLabelSmall: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    textAlign: 'center',
    lineHeight: 16,
    paddingHorizontal: 4,
  },
  qualitySection: {
    marginTop: 4,
  },
  qualityGradient: {
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.2)',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  qualityContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  qualityText: {
    flex: 1,
    fontSize: 13,
    fontWeight: '600',
    color: '#10B981',
    lineHeight: 18,
  },
});

