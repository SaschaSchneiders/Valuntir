import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import RateScale from '../shared/RateScale';
import ChartCard from '../shared/ChartCard';
import RatingBreakdown from '../shared/RatingBreakdown';
import ProfileMetrics from '../shared/ProfileMetrics';

export default function DashboardScreen() {
  // Mock-Daten für die Demo
  const successRate = 87;
  const totalRatings = 20;
  const profileViews = 156;
  const profileViewsChange = '+12% in 30 Tagen'; // Entwicklung der Profilaufrufe
  const profileInteractions = 89; // Klicks auf Kontakt/Links/Social Media
  const interactionsChange = '+8% in 30 Tagen'; // Entwicklung der Interaktionen
  
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
  
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#F5F7FA', '#FFFFFF', '#F8F9FB', '#FAFBFC']}
        locations={[0, 0.3, 0.65, 1]}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <SafeAreaView style={styles.safeArea} edges={['top']}>
          <ScrollView contentContainerStyle={styles.content}>
              <View style={styles.header}>
                <Text style={styles.title}>Valuntir</Text>
                <Text style={styles.subtitle}>Top Tier Value</Text>
              </View>

        {/* Chart Card - Wiederverwendbare Komponente */}
        <ChartCard
          timeframeData={timeframeData}
          title="Verlauf & Statistiken"
          defaultTimeframe="6months"
        />

        {/* RateScale - AUSSERHALB der Card */}
        <View style={styles.rateScaleSection}>
          <RateScale 
            rate={successRate} 
            size="medium" 
            showLabel={false}
            title="Erfolgsquote"
            totalRatings={totalRatings}
          />
        </View>

        {/* Bewertungsdetails - 4 Kernbereiche */}
        <View style={{ marginBottom: 24 }}>
          <RatingBreakdown
            communication={87}
            pricePerformance={92}
            deliveryQuality={89}
            reliability={94}
            totalProjects={totalRatings}
          />
        </View>

        {/* Profilaufrufe & Interaktionen Card */}
        <View style={{ marginBottom: 24 }}>
          <ProfileMetrics
            profileViews={profileViews}
            profileViewsChange={profileViewsChange}
            profileInteractions={profileInteractions}
            interactionsChange={interactionsChange}
          />
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
    marginBottom: 24,
    paddingTop: 8,
  },
  title: {
    fontSize: 34,
    fontWeight: '800',
    color: '#000000',
    letterSpacing: -0.5,
    marginBottom: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.06)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    fontWeight: '500',
  },
  rateScaleSection: {
    marginBottom: 24,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  activityCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 24,
    padding: 24,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.06)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 5,
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
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
