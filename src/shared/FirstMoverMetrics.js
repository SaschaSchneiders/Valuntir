import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export default function FirstMoverMetrics({
  totalFirstMovers = 0,
  activeSubscriptions = 0,
  potentialMonthlyRevenue = 0,
  currentMonthlyRevenue = 0,
}) {
  // Formatiere Betrag mit Tausender-Trennzeichen
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const conversionRate = totalFirstMovers > 0 
    ? Math.round((activeSubscriptions / totalFirstMovers) * 100) 
    : 0;

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#1A1A1A', '#2D2D2D', '#1A1A1A']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        {/* Header mit Icon */}
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <Ionicons name="rocket" size={24} color="#FFD700" />
          </View>
          <View style={styles.headerText}>
            <Text style={styles.title}>First Mover Programm</Text>
            <Text style={styles.subtitle}>Deine Belohnungen für frühe Bewertungen</Text>
          </View>
        </View>

        {/* Haupt-Metriken */}
        <View style={styles.metricsContainer}>
          {/* First Mover Count */}
          <View style={styles.metricBox}>
            <View style={styles.metricHeader}>
              <Ionicons name="trophy-outline" size={18} color="#FFD700" />
              <Text style={styles.metricLabel}>Entdeckt</Text>
            </View>
            <Text style={styles.metricNumber}>{totalFirstMovers}</Text>
            <Text style={styles.metricDescription}>Unternehmen</Text>
          </View>

          {/* Conversion Badge */}
          <View style={styles.conversionBadge}>
            <Ionicons name="arrow-forward" size={16} color="#888" />
            <Text style={styles.conversionText}>{conversionRate}%</Text>
          </View>

          {/* Active Subscriptions */}
          <View style={styles.metricBox}>
            <View style={styles.metricHeader}>
              <Ionicons name="checkmark-circle-outline" size={18} color="#4CAF50" />
              <Text style={styles.metricLabel}>Aktiv</Text>
            </View>
            <Text style={styles.metricNumber}>{activeSubscriptions}</Text>
            <Text style={styles.metricDescription}>mit Abo</Text>
          </View>
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Revenue Section */}
        <View style={styles.revenueSection}>
          {/* Current Revenue - Prominent */}
          <View style={styles.currentRevenueBox}>
            <View style={styles.revenueHeader}>
              <Ionicons name="cash" size={20} color="#4CAF50" />
              <Text style={styles.revenueLabel}>Monatlich verdient</Text>
            </View>
            <Text style={styles.currentRevenueAmount}>
              {formatCurrency(currentMonthlyRevenue)}
            </Text>
          </View>

          {/* Potential Revenue - Motivational */}
          <View style={styles.potentialRevenueBox}>
            <View style={styles.potentialHeader}>
              <Ionicons name="trending-up" size={18} color="#FFD700" />
              <Text style={styles.potentialLabel}>Potenzial</Text>
            </View>
            <Text style={styles.potentialAmount}>
              {formatCurrency(potentialMonthlyRevenue)}
            </Text>
            <Text style={styles.potentialDescription}>bei 100% Conversion</Text>
          </View>
        </View>

        {/* Motivational Footer */}
        {totalFirstMovers > 0 && conversionRate < 100 && (
          <View style={styles.motivationBox}>
            <Ionicons name="information-circle" size={16} color="#FFD700" />
            <Text style={styles.motivationText}>
              Bewerte mehr Anbieter als Erster und erhöhe dein passives Einkommen! 
              10% von jedem Abo-Abschluss gehört dir.
            </Text>
          </View>
        )}

        {totalFirstMovers === 0 && (
          <View style={styles.motivationBox}>
            <Ionicons name="star" size={16} color="#FFD700" />
            <Text style={styles.motivationText}>
              Sei der Erste, der einen Anbieter bewertet, und verdiene 10% seines Abo-Preises – dauerhaft!
            </Text>
          </View>
        )}
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.2)',
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 8,
  },
  gradient: {
    padding: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 215, 0, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  headerText: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 2,
    letterSpacing: -0.3,
  },
  subtitle: {
    fontSize: 13,
    fontWeight: '500',
    color: '#AAAAAA',
  },
  metricsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  metricBox: {
    flex: 1,
    alignItems: 'center',
  },
  metricHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 6,
  },
  metricLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#AAAAAA',
  },
  metricNumber: {
    fontSize: 36,
    fontWeight: '900',
    color: '#FFFFFF',
    marginBottom: 2,
    letterSpacing: -1,
  },
  metricDescription: {
    fontSize: 12,
    color: '#888888',
    fontWeight: '500',
  },
  conversionBadge: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
    gap: 4,
  },
  conversionText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#888888',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginVertical: 20,
  },
  revenueSection: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  currentRevenueBox: {
    flex: 1,
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(76, 175, 80, 0.3)',
  },
  revenueHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 6,
  },
  revenueLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4CAF50',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  currentRevenueAmount: {
    fontSize: 28,
    fontWeight: '900',
    color: '#4CAF50',
    letterSpacing: -0.5,
  },
  potentialRevenueBox: {
    flex: 1,
    backgroundColor: 'rgba(255, 215, 0, 0.08)',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.2)',
  },
  potentialHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 6,
  },
  potentialLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFD700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  potentialAmount: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFD700',
    marginBottom: 2,
    letterSpacing: -0.5,
  },
  potentialDescription: {
    fontSize: 11,
    color: '#888888',
    fontWeight: '500',
  },
  motivationBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: 'rgba(255, 215, 0, 0.08)',
    borderRadius: 12,
    padding: 12,
    gap: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.2)',
  },
  motivationText: {
    flex: 1,
    fontSize: 12,
    lineHeight: 18,
    color: '#CCCCCC',
    fontWeight: '500',
  },
});

