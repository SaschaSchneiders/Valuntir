import React from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import ProfileCard from '../shared/ProfileCard';
import QuickActionButtons from '../shared/QuickActionButtons';
import ChartCard from '../shared/ChartCard';
import RateScale from '../shared/RateScale';
import RatingBreakdown from '../shared/RatingBreakdown';
import ProjectComments from '../shared/ProjectComments';
import ConnectionMetrics from '../shared/ConnectionMetrics';
import VolumeMetrics from '../shared/VolumeMetrics';
import UpgradeTeaser from '../shared/UpgradeTeaser';

/**
 * LockedProfileScreen - Demo für ein Profil OHNE Business-Abo
 * Zeigt: Erfolgsquote, Bewertungen, Kommentare
 * Versteckt: Kontakt, Beschreibung, Social Media
 */
export default function LockedProfileScreen() {
  const navigation = useNavigation();

  // Hardcoded Mock-Daten für "IT-Consulting Pro" (Locked State)
  const provider = {
    companyName: 'IT-Consulting Pro',
    branch: 'IT-Beratung',
    location: 'München',
    coverImage: null,
    successRate: 91,
    totalRatings: 18,
    communication: 89,
    pricePerformance: 93,
    deliveryQuality: 92,
    reliability: 90,
    // Connection Metrics
    isConnectionMetricsPublic: true,
    connectionsSent: 28,
    connectionsPending: 4,
    connectionsRated: 24,
    totalVolumeRated: 76800,
    // Volume Metrics
    isVolumeMetricsPublic: true,
    averageProjectValue: 3200,
    largestProject: 12000,
    returningCustomers: 9,
    returningCustomersPercent: 38,
    comments: [
      {
        id: 1,
        comment: "Cloud-Migration unserer Infrastruktur. Technisch versiert und strukturiertes Vorgehen.",
        rating: 9.2,
        date: "2024-08-25"
      },
      {
        id: 2,
        comment: "IT-Sicherheitsaudit durchgeführt. Gründliche Analyse mit klaren Handlungsempfehlungen.",
        rating: 9.0,
        date: "2024-07-10"
      },
      {
        id: 3,
        comment: "Software-Entwicklung für CRM-System. Agile Umsetzung und gute Kommunikation.",
        rating: 8.8,
        date: "2024-06-05"
      },
    ],
  };

  // Chart-Daten generieren
  const generateRealisticData = (numPoints, baseValue) => {
    const data = [];
    let currentValue = baseValue;
    
    for (let i = 0; i < numPoints; i++) {
      const change = (Math.random() - 0.5) * 4;
      currentValue = Math.max(75, Math.min(95, currentValue + change));
      data.push(Math.round(currentValue * 10) / 10);
    }
    return data;
  };

  const timeframeData = {
    '14days': {
      data: generateRealisticData(14, provider.successRate),
      labels: Array.from({length: 14}, (_, i) => `T${i+1}`)
    },
    '30days': {
      data: generateRealisticData(30, provider.successRate),
      labels: Array.from({length: 30}, (_, i) => `T${i+1}`)
    },
    '90days': {
      data: generateRealisticData(90, provider.successRate),
      labels: Array.from({length: 90}, (_, i) => i % 7 === 0 ? `W${Math.floor(i/7)+1}` : '')
    },
    '6months': {
      data: generateRealisticData(182, provider.successRate),
      labels: Array.from({length: 182}, (_, i) => i % 30 === 0 ? `M${Math.floor(i/30)+1}` : '')
    },
    'year': {
      data: generateRealisticData(365, provider.successRate),
      labels: Array.from({length: 365}, (_, i) => i % 30 === 0 ? `M${Math.floor(i/30)+1}` : '')
    },
    'max': {
      data: generateRealisticData(730, provider.successRate),
      labels: Array.from({length: 730}, (_, i) => i % 182 === 0 ? `H${Math.floor(i/182)+1}` : '')
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#F8F9FA', '#FFFFFF', '#F8F9FA']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        <SafeAreaView style={styles.safeArea} edges={['top']}>
          {/* Zurück-Button */}
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="chevron-back" size={28} color="#000" />
          </TouchableOpacity>

          <ScrollView 
            style={styles.content} 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 10 }}
          >
            {/* Profile Header */}
            <ProfileCard
              isPublicView={true}
              onToggleChange={() => {}}
              onSettingsPress={() => {}}
              companyName={provider.companyName}
              branch={provider.branch}
              location={provider.location}
              coverImage={provider.coverImage}
              showControls={false}
            />

            {/* Quick Action Buttons - nur Share (kein Website) */}
            <QuickActionButtons
              websiteUrl={null}
              onWebsitePress={() => {}}
              onSharePress={() => console.log('Share Profile')}
            />

            {/* Chart & Statistiken */}
            <ChartCard 
              timeframeData={timeframeData}
              title="Verlauf der Erfolgsquote"
              defaultTimeframe="6months"
            />

            {/* Erfolgsquote Scale */}
            <View style={{ marginBottom: 32 }}>
              <RateScale 
                rate={provider.successRate} 
                size="medium" 
                showLabel={false}
                title="Erfolgsquote"
                totalRatings={provider.totalRatings}
              />
            </View>

            {/* Volume Metrics */}
            <View style={{ marginBottom: 32 }}>
              <VolumeMetrics
                totalVolume={provider.totalVolumeRated}
                totalProjects={provider.connectionsRated}
                averageValue={provider.averageProjectValue}
                largestProject={provider.largestProject}
                returningCustomers={provider.returningCustomers}
                returningCustomersPercent={provider.returningCustomersPercent}
                isPublic={provider.isVolumeMetricsPublic}
                isPublicView={true}
                showPublicToggle={false}
              />
            </View>

            {/* Bewertungsdetails - 4 Kernbereiche */}
            <View style={{ marginBottom: 32 }}>
              <RatingBreakdown
                communication={provider.communication}
                pricePerformance={provider.pricePerformance}
                deliveryQuality={provider.deliveryQuality}
                reliability={provider.reliability}
                totalProjects={provider.totalRatings}
              />
            </View>

            {/* Connection-Erfahrungen */}
            <ProjectComments comments={provider.comments} />

            {/* Claim Profile Teaser - Für den Anbieter selbst */}
            <UpgradeTeaser
              title="Ist das dein Profil?"
              subtitle="Schalte es jetzt frei und erhalte qualifizierte Leads direkt über Valuntir!"
              icon="business"
              gradientColors={['#3B82F6', '#2563EB']}
              onPress={() => navigation.navigate('BusinessPlanPromo', { showBackButton: true })}
            />

            {/* Platz für TabBar */}
            <View style={{ height: 100 }} />
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
  backButton: {
    position: 'absolute',
    top: 70,
    left: 20,
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  content: {
    flex: 1,
  },
});

