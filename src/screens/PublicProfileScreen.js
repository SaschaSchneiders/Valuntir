import React from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import ProfileCard from '../shared/ProfileCard';
import ProfileDescription from '../shared/ProfileDescription';
import QuickActionButtons from '../shared/QuickActionButtons';
import ChartCard from '../shared/ChartCard';
import RateScale from '../shared/RateScale';
import RatingBreakdown from '../shared/RatingBreakdown';
import ProjectComments from '../shared/ProjectComments';
import ContactSection from '../shared/ContactSection';
import ProfileFAB from '../shared/ProfileFAB';

export default function PublicProfileScreen({ route }) {
  const navigation = useNavigation();
  const { providerId } = route.params || {};

  // Mock-Daten basierend auf providerId
  const getProviderData = (id) => {
    const providers = {
      'steuerberater_schmidt': {
        companyName: 'Steuerberater Schmidt',
        branch: 'Steuerberatung',
        coverImage: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=200&fit=crop',
        description: 'Spezialisiert auf Unternehmenssteuerrecht und Vermögensplanung. Wir beraten mittelständische Unternehmen und Privatpersonen in allen steuerlichen Angelegenheiten mit Fokus auf nachhaltige Optimierung.',
        websiteUrl: 'https://steuerberater-schmidt.de',
        calendarUrl: 'https://calendly.com/steuerberater-schmidt',
        successRate: 93,
        totalRatings: 24,
        communication: 92,
        pricePerformance: 95,
        deliveryQuality: 91,
        reliability: 94,
        email: 'kontakt@steuerberater-schmidt.de',
        phone: '+49 40 98765432',
        whatsapp: '+49 40 98765432',
        linkedin: 'https://linkedin.com/company/steuerberater-schmidt',
        instagram: null,
        favoriteContact: 'email',
        comments: [
          {
            id: 1,
            comment: "Jahresabschluss für GmbH erstellt. Sehr strukturiert und alle Fristen eingehalten.",
            rating: 9.5,
            date: "2024-09-20"
          },
          {
            id: 2,
            comment: "Steueroptimierung bei Immobilienverkauf. Exzellente Beratung mit mehreren Optionen.",
            rating: 9.8,
            date: "2024-08-15"
          },
          {
            id: 3,
            comment: "Betriebsprüfung begleitet. Professionelle Vorbereitung, keine Nachforderungen.",
            rating: 9.2,
            date: "2024-07-03"
          },
        ],
      },
      'marketing_xyz': {
        companyName: 'Marketing Agentur XYZ',
        branch: 'Marketing',
        coverImage: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=200&fit=crop',
        description: 'Full-Service Marketingagentur mit Schwerpunkt auf digitalem Marketing und Markenentwicklung. Wir helfen Unternehmen, ihre Zielgruppe zu erreichen und messbare Ergebnisse zu erzielen.',
        websiteUrl: 'https://marketing-xyz.de',
        calendarUrl: 'https://calendly.com/marketing-xyz',
        successRate: 87,
        totalRatings: 31,
        communication: 85,
        pricePerformance: 88,
        deliveryQuality: 89,
        reliability: 86,
        email: 'hello@marketing-xyz.de',
        phone: '+49 30 55566677',
        whatsapp: '+49 30 55566677',
        linkedin: 'https://linkedin.com/company/marketing-xyz',
        instagram: 'https://instagram.com/marketing.xyz',
        favoriteContact: 'whatsapp',
        comments: [
          {
            id: 1,
            comment: "Social Media Kampagne für Produktlaunch. Sehr kreativ und zielgruppengenau umgesetzt.",
            rating: 8.8,
            date: "2024-09-10"
          },
          {
            id: 2,
            comment: "SEO-Optimierung unserer Website. Ranking deutlich verbessert innerhalb von 3 Monaten.",
            rating: 9.0,
            date: "2024-07-22"
          },
          {
            id: 3,
            comment: "Corporate Design Relaunch. Modernes und konsistentes Markenbild entwickelt.",
            rating: 8.5,
            date: "2024-06-15"
          },
        ],
      },
    };

    return providers[id] || providers['steuerberater_schmidt'];
  };

  const provider = getProviderData(providerId);

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
              coverImage={provider.coverImage}
              showControls={false}
            />

            {/* Kurzbeschreibung */}
            <ProfileDescription description={provider.description} />

            {/* Quick Action Buttons */}
            <QuickActionButtons
              websiteUrl={provider.websiteUrl}
              calendarUrl={provider.calendarUrl}
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

            {/* Projekterfahrungen */}
            <ProjectComments comments={provider.comments} />

            {/* Kontakt & Social Media */}
            <ContactSection
              email={provider.email}
              phone={provider.phone}
              whatsapp={provider.whatsapp}
              linkedin={provider.linkedin}
              instagram={provider.instagram}
            />

            {/* Platz für TabBar */}
            <View style={{ height: 100 }} />
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>

      {/* Floating Action Button */}
      <ProfileFAB
        favoriteContact={provider.favoriteContact}
        bottom={30}
        onPress={() => {
          if (provider.favoriteContact === 'whatsapp') {
            console.log('WhatsApp:', provider.whatsapp);
          } else if (provider.favoriteContact === 'phone') {
            console.log('Telefon:', provider.phone);
          } else if (provider.favoriteContact === 'email') {
            console.log('Email:', provider.email);
          }
        }}
      />
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

