import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';

/**
 * VolumeMetrics - Zeigt Umsatz-Metriken eines Anbieters (im ConnectionMetrics Stil)
 * 
 * @param {number} totalVolume - Gesamtvolumen in Euro
 * @param {number} totalProjects - Anzahl bewerteter Connections
 * @param {number} averageValue - Durchschnittlicher Auftragswert in Euro
 * @param {number} largestProject - Größte Connection in Euro
 * @param {number} returningCustomers - Anzahl Stammkunden
 * @param {number} returningCustomersPercent - Prozentsatz Stammkunden
 * @param {boolean} isPublic - Ob die Metriken öffentlich sichtbar sind
 * @param {function} onTogglePublic - Callback beim Toggle der Sichtbarkeit
 * @param {boolean} isPublicView - Ob dies die öffentliche Ansicht ist (ohne Toggle)
 * @param {boolean} showPublicToggle - Ob der Toggle angezeigt werden soll (nur Business)
 */
export default function VolumeMetrics({
  totalVolume = 0,
  totalProjects = 0,
  averageValue = 0,
  largestProject = 0,
  returningCustomers = 0,
  returningCustomersPercent = 0,
  isPublic = false,
  onTogglePublic,
  isPublicView = false,
  showPublicToggle = true,
}) {
  const [isPublicLocal, setIsPublicLocal] = useState(isPublic);

  // Formatiere Zahlen mit Tausender-Trennzeichen
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const handleToggle = (value) => {
    setIsPublicLocal(value);
    if (onTogglePublic) {
      onTogglePublic(value);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header mit Toggle */}
      <View style={styles.headerContainer}>
        <View style={styles.headerText}>
          <Text style={styles.title}>
            {isPublicView ? 'Bewertetes Volumen' : 'Dein bewertetes Volumen'}
          </Text>
          <Text style={styles.subtitle}>aus {totalProjects} Connections</Text>
        </View>
        {!isPublicView && showPublicToggle && (
          <View style={styles.toggleContainer}>
            <Text style={styles.toggleLabel}>Öffentlich</Text>
            <Switch
              value={isPublicLocal}
              onValueChange={handleToggle}
              trackColor={{ false: '#E5E5E5', true: '#000000' }}
              thumbColor={isPublicLocal ? '#FFFFFF' : '#FFFFFF'}
              ios_backgroundColor="#E5E5E5"
            />
          </View>
        )}
      </View>

      {/* HAUPTANGABE: Gesamtvolumen - RIESIG */}
      <View style={styles.mainVolumeSection}>
        <Text style={styles.mainVolumeAmount}>{formatCurrency(totalVolume)}</Text>
        <Text style={styles.mainVolumeLabel}>Gesamtvolumen</Text>
      </View>

      {/* Sekundäre Metriken in 2 Spalten */}
      <View style={styles.secondaryMetricsRow}>
        {/* Durchschnitt */}
        <View style={styles.secondaryMetric}>
          <Text style={styles.secondaryMetricNumber}>{formatCurrency(averageValue)}</Text>
          <Text style={styles.secondaryMetricLabel}>Ø Auftragswert</Text>
        </View>

        {/* Divider */}
        <View style={styles.secondaryDivider} />

        {/* Größte Connection */}
        <View style={styles.secondaryMetric}>
          <Text style={styles.secondaryMetricNumber}>{formatCurrency(largestProject)}</Text>
          <Text style={styles.secondaryMetricLabel}>Größte Connection</Text>
        </View>
      </View>

      {/* Horizontaler Divider */}
      <View style={styles.horizontalDivider} />

      {/* Stammkunden - Prominent */}
      <View style={styles.returningCustomersSection}>
        <Text style={styles.returningCustomersLabel}>Stammkunden</Text>
        <Text style={styles.returningCustomersAmount}>
          {returningCustomers} ({returningCustomersPercent}%)
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.06)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.08,
    shadowRadius: 32,
    elevation: 12,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  headerText: {
    flex: 1,
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
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  toggleLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#666666',
  },
  // HAUPTANGABE - Kompakter
  mainVolumeSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  mainVolumeAmount: {
    fontSize: 42,
    fontWeight: '900',
    color: '#000000',
    marginBottom: 6,
    letterSpacing: -2,
  },
  mainVolumeLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#666666',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  // Sekundäre Metriken - 2 Spalten
  secondaryMetricsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  secondaryMetric: {
    flex: 1,
    alignItems: 'center',
  },
  secondaryDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#E5E5E5',
    marginHorizontal: 16,
  },
  secondaryMetricNumber: {
    fontSize: 22,
    fontWeight: '800',
    color: '#000000',
    marginBottom: 4,
    letterSpacing: -0.5,
  },
  secondaryMetricLabel: {
    fontSize: 12,
    color: '#666666',
    fontWeight: '600',
  },
  horizontalDivider: {
    height: 1,
    backgroundColor: '#E5E5E5',
    marginBottom: 16,
  },
  // Stammkunden - Kompakter
  returningCustomersSection: {
    alignItems: 'center',
  },
  returningCustomersLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#666666',
    marginBottom: 6,
  },
  returningCustomersAmount: {
    fontSize: 24,
    fontWeight: '800',
    color: '#000000',
    letterSpacing: -0.5,
  },
});

