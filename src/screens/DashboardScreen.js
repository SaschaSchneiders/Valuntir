import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import RateScale from '../shared/RateScale';
import ChartCard from '../shared/ChartCard';
import RatingBreakdown from '../shared/RatingBreakdown';
import NetworkStrengthMetrics from '../shared/NetworkStrengthMetrics';
import ProfileMetrics from '../shared/ProfileMetrics';
import ConnectionMetrics from '../shared/ConnectionMetrics';
import FirstMoverMetrics from '../shared/FirstMoverMetrics';
import VolumeMetrics from '../shared/VolumeMetrics';
import LiveMetrics from '../shared/LiveMetrics';
import UpgradeTeaser from '../shared/UpgradeTeaser';
import { BlurView } from 'expo-blur';
import DesktopLayout from '../components/DesktopLayout';
import { useResponsive } from '../utils/responsive';
import { usePackage } from '../context/PackageContext';
import ProPlanPromoScreen from './ProPlanPromoScreen';

export default function DashboardScreen({ navigation }) {
  const { isDesktop } = useResponsive();
  const { isBusiness, isPro, isFree } = usePackage();
  const [showLiveMetricsPopup, setShowLiveMetricsPopup] = useState(false);
  const [isConnectionMetricsPublic, setIsConnectionMetricsPublic] = useState(false);
  const [isVolumeMetricsPublic, setIsVolumeMetricsPublic] = useState(false);

  // FREE-Modus: Zeige Pro-Plan Promotion
  if (isFree) {
    const handleUpgrade = () => {
      // TODO: Navigation zu Payment/Upgrade-Flow
      console.log('Upgrade zu Pro initiieren');
      // Temporär: Zeige Alert
      alert('Upgrade-Flow würde hier starten');
    };

    const promoContent = <ProPlanPromoScreen onUpgrade={handleUpgrade} />;

    if (isDesktop) {
      return (
        <DesktopLayout
          navigation={navigation}
          currentRoute="Dashboard"
          title="Dashboard"
          subtitle="Upgrade auf Pro"
        >
          {promoContent}
        </DesktopLayout>
      );
    }

    return promoContent;
  }

  // Mock-Daten für die Demo (nur für Pro/Business)
  const successRate = 87;
  const totalRatings = 20;
  const profileViews = 156;
  const profileViewsChange = '+12% in 30 Tagen'; // Entwicklung der Profilaufrufe
  const profileInteractions = 89; // Klicks auf Kontakt/Links/Social Media
  const interactionsChange = '+8% in 30 Tagen'; // Entwicklung der Interaktionen
  
  // Lead-Tracking (Kontaktanfragen über öffentliches Profil)
  const whatsappLeads = 24;
  const calendarLeads = 12;
  const websiteLeads = 18;
  const phoneLeads = 8;
  const totalLeads = whatsappLeads + calendarLeads + websiteLeads + phoneLeads; // 62
  
  // Connection-Statistiken
  const connectionsSent = 23;
  const connectionsPending = 3;
  const connectionsRated = 20;
  const totalVolumeRated = 87350; // Gesamtvolumen der bewerteten Connections in €
  
  // Volume Metrics
  const averageProjectValue = Math.round(totalVolumeRated / connectionsRated); // Durchschnittlicher Auftragswert
  const largestProject = 15000; // Größte bewertete Connection in €
  const returningCustomers = 8; // Anzahl Stammkunden
  const returningCustomersPercent = Math.round((returningCustomers / connectionsRated) * 100); // Prozent Stammkunden

  // First Mover Statistiken
  const totalFirstMovers = 7; // Anzahl Unternehmen, die als erster bewertet wurden
  const activeFirstMoverSubscriptions = 3; // Davon haben 3 bereits ein Abo abgeschlossen
  const monthlyRevenuePerSub = 4.90; // 10% von 49€ = 4,90€
  const currentMonthlyRevenue = activeFirstMoverSubscriptions * monthlyRevenuePerSub; // 14,70€
  const potentialMonthlyRevenue = totalFirstMovers * monthlyRevenuePerSub; // 34,30€ wenn alle ein Abo hätten

  // Handler für den Public-Toggle der Connection Metrics
  const handleToggleConnectionMetricsPublic = (value) => {
    setIsConnectionMetricsPublic(value);
    // Hier könnte später ein API-Call erfolgen, um die Einstellung zu speichern
    console.log('Connection Metrics öffentlich:', value);
  };

  // Handler für den Public-Toggle der Volume Metrics
  const handleToggleVolumeMetricsPublic = (value) => {
    setIsVolumeMetricsPublic(value);
    // Hier könnte später ein API-Call erfolgen, um die Einstellung zu speichern
    console.log('Volume Metrics öffentlich:', value);
  };
  
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
  
  const content = (
    <View style={styles.container}>
      <StatusBar backgroundColor="#F5F7FA" barStyle="dark-content" />
      <View style={styles.statusBarFill} />
      <LinearGradient
        colors={['#F5F7FA', '#FFFFFF', '#F8F9FB', '#FAFBFC']}
        locations={[0, 0.3, 0.65, 1]}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <SafeAreaView style={styles.safeArea} edges={[]}>
          <View style={styles.screenContainer}>
            {/* Header mit Gradient-Übergang */}
            {!isDesktop && (
              <LinearGradient
                colors={['rgba(245, 247, 250, 1)', 'rgba(245, 247, 250, 0.95)', 'rgba(245, 247, 250, 0.7)', 'rgba(245, 247, 250, 0)']}
                locations={[0, 0.4, 0.7, 1]}
                style={styles.stickyHeader}
              >
                <View style={styles.header}>
                  <View style={styles.headerLeft}>
                  <Text style={styles.headerTitle}>Valuntir</Text>
                  <Text style={styles.headerSubtitle}>Deine Performance im Überblick</Text>
                  </View>
                  {isBusiness && (
                    <TouchableOpacity 
                      style={styles.iconButton}
                      onPress={() => setShowLiveMetricsPopup(true)}
                    >
                      <Ionicons name="pulse" size={24} color="#000" />
                    </TouchableOpacity>
                  )}
                </View>
              </LinearGradient>
            )}

            {/* Scrollable Content */}
            <ScrollView
              style={styles.scrollView}
              contentContainerStyle={styles.content}
              showsVerticalScrollIndicator={false}
            >
              {/* Live Metrics - Nur für ProMode sichtbar */}
              {!isBusiness && <LiveMetrics style={{ marginBottom: 32 }} />}

              {/* Business-Only: Charts, Statistiken, Profilmetrics */}
        {isBusiness && (
          <>
            {/* Chart Card - Wiederverwendbare Komponente */}
            <ChartCard
              timeframeData={timeframeData}
              title={null}
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

            {/* Volume Metrics - Bewertetes Umsatzvolumen */}
            <View style={{ marginBottom: 24 }}>
              <VolumeMetrics
                totalVolume={totalVolumeRated}
                totalProjects={connectionsRated}
                averageValue={averageProjectValue}
                largestProject={largestProject}
                returningCustomers={returningCustomers}
                returningCustomersPercent={returningCustomersPercent}
                isPublic={isVolumeMetricsPublic}
                onTogglePublic={handleToggleVolumeMetricsPublic}
                isPublicView={false}
                showPublicToggle={true}
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

            {/* Netzwerkstärke & Entscheidungskompetenz */}
            <View style={{ marginBottom: 24 }}>
              <NetworkStrengthMetrics
                totalConnections={connectionsRated}
                averageSuccessRate={83}
              />
            </View>

            {/* Profilaufrufe & Interaktionen Card */}
            <View style={{ marginBottom: 24 }}>
              <ProfileMetrics
                profileViews={profileViews}
                profileViewsChange={profileViewsChange}
                profileInteractions={profileInteractions}
                interactionsChange={interactionsChange}
                totalLeads={totalLeads}
                whatsappClicks={whatsappLeads}
                calendarClicks={calendarLeads}
                websiteClicks={websiteLeads}
                phoneClicks={phoneLeads}
              />
            </View>
          </>
        )}

        {/* First Mover Programm */}
        <View style={{ marginBottom: 24 }}>
          <FirstMoverMetrics
            totalFirstMovers={totalFirstMovers}
            activeSubscriptions={activeFirstMoverSubscriptions}
            potentialMonthlyRevenue={potentialMonthlyRevenue}
            currentMonthlyRevenue={currentMonthlyRevenue}
          />
        </View>

        {/* Connection-Status Übersicht */}
        <View style={{ marginBottom: 24 }}>
          <ConnectionMetrics
            sent={connectionsSent}
            pending={connectionsPending}
            rated={connectionsRated}
            totalVolume={totalVolumeRated}
            isPublic={isConnectionMetricsPublic}
            onTogglePublic={handleToggleConnectionMetricsPublic}
            isPublicView={false} // Im Dashboard: Toggle sichtbar und editierbar
            showPublicToggle={isBusiness} // Toggle nur im Business-Mode anzeigen
          />
        </View>

        {/* Business Teaser für Pro User */}
        {!isBusiness && isPro && (
          <UpgradeTeaser
            title="Business Features freischalten"
            subtitle="Zeige deine Erfolgsquote öffentlich und erhalte Leads direkt über dein Profil."
            icon="stats-chart"
            onPress={() => navigation.navigate('MySubscription')}
          />
        )}

        {/* Recent Activity - Business Only */}
        {isBusiness && (
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
        )}
            </ScrollView>
          </View>
        </SafeAreaView>
      </LinearGradient>

      {/* Live Metrics Popup - Nur für BusinessMode */}
      {showLiveMetricsPopup && (
        <Modal
          visible={showLiveMetricsPopup}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setShowLiveMetricsPopup(false)}
        >
          <BlurView intensity={15} tint="dark" style={styles.popupOverlay}>
            <TouchableOpacity 
              style={StyleSheet.absoluteFill}
              activeOpacity={1}
              onPress={() => setShowLiveMetricsPopup(false)}
            />
            <View style={styles.popupContent} onStartShouldSetResponder={() => true}>
              <TouchableOpacity 
                style={styles.popupClose}
                onPress={() => setShowLiveMetricsPopup(false)}
              >
                <Ionicons name="close" size={24} color="#666" />
              </TouchableOpacity>
              <LiveMetrics popup={true} />
            </View>
          </BlurView>
        </Modal>
      )}
    </View>
  );

  // Wrapper mit Desktop Layout
  if (isDesktop) {
    return (
      <DesktopLayout
        navigation={navigation}
        currentRoute="Dashboard"
        title="Dashboard"
        subtitle={isBusiness ? "Deine Erfolgsquoten-Übersicht" : "Deine Connection-Übersicht"}
      >
        {content}
      </DesktopLayout>
    );
  }

  return content;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    overflow: 'visible',
  },
  statusBarFill: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 50,
    backgroundColor: '#F5F7FA',
    zIndex: 1000,
  },
  safeArea: {
    flex: 1,
    overflow: 'visible',
    paddingTop: 50,
  },
  screenContainer: {
    flex: 1,
    overflow: 'visible',
  },
  stickyHeader: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 20,
    zIndex: 100,
  },
  scrollView: {
    flex: 1,
    overflow: 'visible',
  },
  content: {
    padding: 20,
    paddingTop: 0,
    paddingBottom: 100,
    overflow: 'visible',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  headerLeft: {
    flex: 1,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  headerTitle: {
    fontSize: 34,
    fontWeight: '800',
    color: '#000000',
    letterSpacing: -0.5,
    marginBottom: 4,
  },
  headerSubtitle: {
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
  popupOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  popupContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    width: '100%',
    maxWidth: 380,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.3,
    shadowRadius: 30,
    elevation: 20,
  },
  popupClose: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 10,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
