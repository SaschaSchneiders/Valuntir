import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import RateScale from '../shared/RateScale';
import ChartCard from '../shared/ChartCard';

export default function DashboardScreen() {
  // Mock-Daten für die Demo
  const successRate = 87;
  const connectionsSent = 23;
  const pendingConnections = 3;
  const totalRatings = 20;
  const profileViews = 156;
  const profileViewsChange = '+12%'; // Entwicklung der Profilaufrufe
  
  // Abo-Informationen
  const currentPlan = 'Professional';
  const totalConnections = 50;
  const usedConnections = 23;
  const remainingConnections = totalConnections - usedConnections;
  
  // Hilfsfunktion zum Generieren realistischer Daten mit erkennbarem Verlauf
  const generateRealisticData = (count, startValue, endValue, volatility = 1.5) => {
    const data = [startValue];
    let currentValue = startValue;
    const targetChange = (endValue - startValue) / count;
    
    for (let i = 1; i < count; i++) {
      // Trend zum Zielwert + moderate Schwankung für erkennbaren Verlauf
      const trendChange = targetChange + (Math.random() - 0.5) * volatility;
      currentValue = Math.max(75, Math.min(92, currentValue + trendChange));
      data.push(Math.round(currentValue * 10) / 10);
    }
    return data;
  };

  // Zeitraum-Daten - ECHTE Intervalle mit realistischem Verlauf!
  const timeframeData = {
    '14days': {
      labels: Array.from({length: 14}, (_, i) => `${i+1}.`),
      data: generateRealisticData(14, 85, 87, 1.2)
    },
    '30days': {
      labels: Array.from({length: 30}, (_, i) => `${i+1}.`),
      data: generateRealisticData(30, 84, 87, 1.5)
    },
    '90days': {
      labels: Array.from({length: 90}, (_, i) => `${i+1}.`),
      data: generateRealisticData(90, 82, 87, 1.8)
    },
    '6months': {
      labels: Array.from({length: 182}, (_, i) => {
        const monthNames = ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun'];
        const monthIndex = Math.floor(i / 30);
        const dayInMonth = (i % 30) + 1;
        return `${dayInMonth}. ${monthNames[Math.min(monthIndex, 5)]}`;
      }),
      data: generateRealisticData(182, 80, 87, 2.0)
    },
    'year': {
      labels: Array.from({length: 365}, (_, i) => {
        const monthNames = ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'];
        const monthIndex = Math.floor(i / 30);
        const dayInMonth = (i % 30) + 1;
        return `${dayInMonth}. ${monthNames[Math.min(monthIndex, 11)]}`;
      }),
      data: generateRealisticData(365, 78, 87, 2.2)
    },
    'max': {
      labels: Array.from({length: 1825}, (_, i) => { // 5 Jahre = ~1825 Tage
        const year = 2020 + Math.floor(i / 365);
        const dayOfYear = i % 365;
        const monthIndex = Math.floor(dayOfYear / 30);
        const monthNames = ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'];
        return `${monthNames[Math.min(monthIndex, 11)]} ${year}`;
      }),
      data: generateRealisticData(1825, 75, 87, 2.5)
    }
  };
  
  // Bewertungslevel aus dem Doc
  const ratingLevels = {
    sehrZufrieden: 15,
    zufrieden: 3,
    neutral: 1,
    unzufrieden: 1
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#F8F9FA', '#FFFFFF', '#F8F9FA']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <SafeAreaView style={styles.safeArea}>
          <ScrollView contentContainerStyle={styles.content}>
              <View style={styles.header}>
                <Text style={styles.title}>Valuntir Dashboard</Text>
                <Text style={styles.subtitle}>Top Tier Value</Text>
              </View>

        {/* Chart Card - Wiederverwendbare Komponente */}
        <ChartCard
          timeframeData={timeframeData}
          stats={[
            { value: connectionsSent, label: 'Versendet' },
            { value: pendingConnections, label: 'Ausstehend' },
            { value: totalRatings, label: 'Bewertet' },
          ]}
          title="Verlauf & Statistiken"
          defaultTimeframe="6months"
        />

        {/* RateScale - AUSSERHALB der Card */}
        <View style={styles.rateScaleSection}>
          <View style={styles.rateScaleTitleContainer}>
            <Text style={styles.rateScaleTitle}>Erfolgsquote </Text>
            <Text style={styles.rateScaleSubtitle}>(aus {totalRatings} Projekten)</Text>
          </View>
          <RateScale rate={successRate} size="medium" showLabel={false} />
        </View>

        {/* Bewertungslevel Card */}
        <View style={styles.ratingsCard}>
          <Text style={styles.cardTitle}>Bewertungsverteilung</Text>
          
          <View style={styles.ratingItem}>
            <View style={styles.ratingIcon}>
              <Ionicons name="checkmark-circle" size={22} color="#000000" />
            </View>
            <Text style={styles.ratingLabel}>Sehr zufrieden</Text>
            <Text style={styles.ratingCount}>{ratingLevels.sehrZufrieden}</Text>
          </View>

          <View style={styles.ratingItem}>
            <View style={styles.ratingIcon}>
              <Ionicons name="happy" size={22} color="#000000" />
            </View>
            <Text style={styles.ratingLabel}>Zufrieden</Text>
            <Text style={styles.ratingCount}>{ratingLevels.zufrieden}</Text>
          </View>

          <View style={styles.ratingItem}>
            <View style={styles.ratingIcon}>
              <Ionicons name="remove-circle" size={22} color="#000000" />
            </View>
            <Text style={styles.ratingLabel}>Neutral</Text>
            <Text style={styles.ratingCount}>{ratingLevels.neutral}</Text>
          </View>

          <View style={styles.ratingItem}>
            <View style={styles.ratingIcon}>
              <Ionicons name="close-circle" size={22} color="#000000" />
            </View>
            <Text style={styles.ratingLabel}>Unzufrieden</Text>
            <Text style={styles.ratingCount}>{ratingLevels.unzufrieden}</Text>
          </View>
        </View>

        {/* Profilaufrufe Card */}
        <View style={styles.profileViewsCard}>
          <View style={styles.profileViewsHeader}>
            <Text style={styles.profileViewsTitle}>Profilaufrufe</Text>
            <View style={styles.profileViewsChange}>
              <Text style={styles.profileViewsChangeText}>{profileViewsChange}</Text>
            </View>
          </View>
          <Text style={styles.profileViewsNumber}>{profileViews}</Text>
          <Text style={styles.profileViewsSubtitle}>Gesamtaufrufe</Text>
        </View>

        {/* Abo-Informationen Card - Vollständige Version */}
        <View style={styles.subscriptionCard}>
          <View style={styles.subscriptionHeader}>
            <Text style={styles.subscriptionTitle}>Aktuelles Abo</Text>
            <TouchableOpacity style={styles.upgradeButton}>
              <Text style={styles.upgradeButtonText}>Upgrade</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.subscriptionPlan}>
            <Text style={styles.planName}>{currentPlan}</Text>
            <Text style={styles.planDetails}>{totalConnections} Connections/Monat</Text>
          </View>

          <View style={styles.connectionUsage}>
            <View style={styles.usageBar}>
              <View style={[styles.usageFill, { width: `${(usedConnections / totalConnections) * 100}%` }]} />
            </View>
            <View style={styles.usageStats}>
              <Text style={styles.usageText}>
                {usedConnections} von {totalConnections} verwendet
              </Text>
              <Text style={styles.remainingText}>
                {remainingConnections} verbleibend
              </Text>
            </View>
          </View>
        </View>


        {/* Recent Activity */}
        <View style={styles.activityCard}>
          <Text style={styles.cardTitle}>Letzte Aktivität</Text>
          
          <View style={styles.activityItem}>
            <View style={styles.activityIcon}>
              <Ionicons name="star" size={22} color="#000000" />
            </View>
            <View style={styles.activityContent}>
              <Text style={styles.activityTitle}>Neue Bewertung erhalten</Text>
              <Text style={styles.activitySubtitle}>Vor 2 Stunden</Text>
            </View>
          </View>

          <View style={styles.activityItem}>
            <View style={styles.activityIcon}>
              <Ionicons name="mail" size={22} color="#000000" />
            </View>
            <View style={styles.activityContent}>
              <Text style={styles.activityTitle}>Connection gesendet</Text>
              <Text style={styles.activitySubtitle}>Gestern</Text>
            </View>
          </View>
        </View>
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 100,
  },
  header: {
    marginBottom: 32,
    paddingTop: 8,
  },
  title: {
    fontSize: 34,
    fontWeight: '800',
    color: '#000000',
    letterSpacing: -0.5,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    fontWeight: '500',
  },
  rateScaleSection: {
    marginBottom: 32,
  },
  rateScaleTitleContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 4,
  },
  rateScaleTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000000',
    letterSpacing: -0.3,
  },
  rateScaleSubtitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#999999',
    letterSpacing: -0.2,
  },
  ratingsCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 24,
    padding: 24,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.06)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.08,
    shadowRadius: 32,
    elevation: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  ratingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  ratingIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  ratingLabel: {
    flex: 1,
    fontSize: 15,
    color: '#333333',
    fontWeight: '500',
  },
  ratingCount: {
    fontSize: 17,
    fontWeight: '700',
    color: '#000000',
  },
  profileViewsCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 24,
    padding: 24,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.06)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.08,
    shadowRadius: 32,
    elevation: 12,
  },
  profileViewsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  profileViewsTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000000',
    letterSpacing: -0.3,
  },
  profileViewsChange: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  profileViewsChangeText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#000000',
  },
  profileViewsNumber: {
    fontSize: 48,
    fontWeight: '900',
    color: '#000000',
    marginBottom: 4,
    letterSpacing: -1,
  },
  profileViewsSubtitle: {
    fontSize: 14,
    color: '#666666',
    fontWeight: '500',
  },
  activityCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 24,
    padding: 24,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.06)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.08,
    shadowRadius: 32,
    elevation: 12,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  activityIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 4,
  },
  activitySubtitle: {
    fontSize: 13,
    color: '#999999',
    fontWeight: '500',
  },
  subscriptionCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 24,
    padding: 24,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.06)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.08,
    shadowRadius: 32,
    elevation: 12,
  },
  subscriptionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  subscriptionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000000',
    letterSpacing: -0.3,
  },
  upgradeButton: {
    backgroundColor: '#000000',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  upgradeButtonText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '700',
  },
  subscriptionPlan: {
    marginBottom: 20,
  },
  planName: {
    fontSize: 24,
    fontWeight: '800',
    color: '#000000',
    marginBottom: 6,
    letterSpacing: -0.5,
  },
  planDetails: {
    fontSize: 15,
    color: '#666666',
    fontWeight: '500',
  },
  connectionUsage: {
    marginTop: 8,
  },
  usageBar: {
    height: 10,
    backgroundColor: '#F0F0F0',
    borderRadius: 6,
    marginBottom: 12,
    overflow: 'hidden',
  },
  usageFill: {
    height: '100%',
    backgroundColor: '#000000',
    borderRadius: 6,
  },
  usageStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  usageText: {
    fontSize: 15,
    color: '#333333',
    fontWeight: '600',
  },
  remainingText: {
    fontSize: 15,
    color: '#666666',
    fontWeight: '500',
  },
});
