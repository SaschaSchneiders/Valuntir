import React, { useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Animated, TextInput, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import TransFAB from '../shared/TransFAB';

export default function BusinessPlanPromoScreen({ onRequestAccess }) {
  const scrollY = useRef(new Animated.Value(0)).current;

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: false }
  );

  const features = [
    {
      icon: 'create',
      title: 'Profil gestalten',
      description: 'Füge Logo, Beschreibung und Kontaktdaten hinzu – verwandle Besucher in Leads',
      isPrimary: true,
    },
    {
      icon: 'call',
      title: 'Leads empfangen',
      description: 'Erhalte direkte Kontaktanfragen von Interessenten über dein öffentliches Profil',
      isPrimary: true,
    },
    {
      icon: 'bar-chart',
      title: 'Statistiken einsehen',
      description: 'Analysiere Profilaufrufe, Interaktionen und Lead-Conversions in Echtzeit',
      isPrimary: true,
    },
    {
      icon: 'eye-off',
      title: 'Score pausieren',
      description: 'Pausiere deine Erfolgsrate zeitweise – volle Kontrolle über deine Sichtbarkeit',
      isPrimary: false,
    },
    {
      icon: 'ribbon',
      title: 'Trust-Badge',
      description: 'Zeige deine Valuntir-Erfolgsrate auf deiner Website und in E-Mail-Signaturen',
      isPrimary: false,
    },
    {
      icon: 'notifications',
      title: 'Benachrichtigungen',
      description: 'Werde sofort informiert, wenn du neue Bewertungen oder Leads erhältst',
      isPrimary: false,
    },
  ];

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#F8F9FA', '#FFFFFF', '#F8F9FA']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        <SafeAreaView style={styles.safeArea} edges={['top']}>
          <ScrollView 
            style={styles.scrollView}
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
            onScroll={handleScroll}
            scrollEventThrottle={16}
          >
            {/* Hero Section */}
            <View style={styles.hero}>
              <View style={styles.badge}>
                <Ionicons name="briefcase" size={16} color="#3B82F6" />
                <Text style={styles.badgeText}>Valuntir Business</Text>
              </View>
              
              <Text style={styles.headline}>
                Du wirst bewertet?{'\n'}Dann übernimm die Kontrolle.
              </Text>
              
              <Text style={styles.subheadline}>
                Deine Erfolgsrate ist öffentlich – gestalte dein{'\n'}Profil und wandle Besucher in Kunden um.
              </Text>
            </View>

            {/* Company Search */}
            <View style={styles.searchInlineSection}>
              <Text style={styles.searchInlineText}>
                Suche nach deinem Unternehmen oder gib deine Geschäfts-IBAN ein:
              </Text>
              
              <View style={styles.searchInputWrapper}>
                <Ionicons name="business" size={20} color="#999999" style={styles.searchInlineIcon} />
                <TextInput
                  style={styles.searchInlineInput}
                  placeholder="Firmenname oder IBAN..."
                  placeholderTextColor="#999999"
                />
              </View>
              
              <TouchableOpacity style={styles.searchInlineButton}>
                <Text style={styles.searchInlineButtonText}>Suchen</Text>
                <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
              </TouchableOpacity>
            </View>

            {/* Features Grid */}
            <View style={styles.featuresSection}>
              {features.map((feature, index) => (
                <View 
                  key={index} 
                  style={[
                    styles.featureCard,
                    feature.isPrimary && styles.featureCardPrimary
                  ]}
                >
                  <View style={[
                    styles.iconContainer,
                    feature.isPrimary && styles.iconContainerPrimary
                  ]}>
                    <Ionicons 
                      name={feature.icon} 
                      size={24} 
                      color={feature.isPrimary ? '#3B82F6' : '#666666'}
                    />
                  </View>
                  <Text style={styles.featureTitle}>{feature.title}</Text>
                  <Text style={styles.featureDescription}>{feature.description}</Text>
                </View>
              ))}
            </View>

            {/* Why Business Section */}
            <View style={styles.whySection}>
              <Text style={styles.sectionTitle}>Warum Business?</Text>
              
              <View style={styles.reasonCard}>
                <Ionicons name="shield-checkmark" size={24} color="#3B82F6" />
                <View style={styles.reasonContent}>
                  <Text style={styles.reasonTitle}>Kontrolliere dein Image</Text>
                  <Text style={styles.reasonText}>
                    Deine Bewertungen sind öffentlich – mit Business kannst du dein Profil aktiv gestalten.
                  </Text>
                </View>
              </View>

              <View style={styles.reasonCard}>
                <Ionicons name="trending-up" size={24} color="#3B82F6" />
                <View style={styles.reasonContent}>
                  <Text style={styles.reasonTitle}>Leads generieren</Text>
                  <Text style={styles.reasonText}>
                    Interessenten sehen deine Erfolgsrate – verwandle sie mit Kontaktoptionen in Kunden.
                  </Text>
                </View>
              </View>

              <View style={styles.reasonCard}>
                <Ionicons name="eye" size={24} color="#3B82F6" />
                <View style={styles.reasonContent}>
                  <Text style={styles.reasonTitle}>Daten nutzen</Text>
                  <Text style={styles.reasonText}>
                    Sieh wer dein Profil besucht, welche Kontakte geklickt werden und wie du performst.
                  </Text>
                </View>
              </View>
            </View>

            {/* Price Section */}
            <View style={styles.priceSection}>
              <View style={styles.priceBox}>
                <Text style={styles.priceLabel}>Business-Abo</Text>
                <View style={styles.priceRow}>
                  <Text style={styles.priceAmount}>49€</Text>
                  <Text style={styles.pricePeriod}>/Monat</Text>
                </View>
                <Text style={styles.priceDescription}>
                  Jederzeit kündbar. Keine versteckten Kosten.
                </Text>
              </View>
              
              <View style={styles.proIncludedBadge}>
                <Ionicons name="checkmark-circle" size={16} color="#3B82F6" />
                <Text style={styles.proIncludedText}>Inkl. aller Pro-Features</Text>
              </View>
            </View>

            {/* Trust Elements */}
            <View style={styles.trustSection}>
              <View style={styles.trustItem}>
                <Ionicons name="shield-checkmark" size={18} color="#10B981" />
                <Text style={styles.trustText}>Keine Vertragsbindung</Text>
              </View>
              <View style={styles.trustItem}>
                <Ionicons name="speedometer" size={18} color="#10B981" />
                <Text style={styles.trustText}>Sofort aktiv</Text>
              </View>
              <View style={styles.trustItem}>
                <Ionicons name="people" size={18} color="#10B981" />
                <Text style={styles.trustText}>Transparente Bewertungen</Text>
              </View>
            </View>

            {/* Bottom Spacer für FAB */}
            <View style={{ height: 180 }} />
          </ScrollView>

          {/* Animated Floating Action Button */}
          <TransFAB 
            scrollY={scrollY}
            onPress={onRequestAccess}
            text="Profil übernehmen"
            icon="briefcase"
            bottom={120}
          />
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
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
  },
  hero: {
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 48,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.2)',
  },
  badgeText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#3B82F6',
  },
  proIncludedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: 'rgba(59, 130, 246, 0.05)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.1)',
  },
  proIncludedText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#3B82F6',
  },
  headline: {
    fontSize: 36,
    fontWeight: '900',
    color: '#000000',
    textAlign: 'center',
    marginBottom: 16,
    letterSpacing: -1,
    lineHeight: 42,
  },
  subheadline: {
    fontSize: 16,
    fontWeight: '500',
    color: '#666666',
    textAlign: 'center',
    lineHeight: 24,
  },
  searchInlineSection: {
    paddingHorizontal: 20,
    marginBottom: 48,
  },
  searchInlineText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#666666',
    marginBottom: 16,
    lineHeight: 22,
  },
  searchInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    paddingHorizontal: 16,
    height: 52,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  searchInlineIcon: {
    marginRight: 12,
  },
  searchInlineInput: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
  },
  searchInlineButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#000000',
    borderRadius: 12,
    height: 52,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  searchInlineButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  featuresSection: {
    marginBottom: 48,
    gap: 16,
  },
  featureCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
  },
  featureCardPrimary: {
    borderColor: 'rgba(59, 130, 246, 0.2)',
    backgroundColor: 'rgba(59, 130, 246, 0.02)',
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconContainerPrimary: {
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 8,
    letterSpacing: -0.3,
  },
  featureDescription: {
    fontSize: 15,
    fontWeight: '500',
    color: '#666666',
    lineHeight: 22,
  },
  whySection: {
    marginBottom: 48,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#000000',
    marginBottom: 24,
    letterSpacing: -0.5,
  },
  reasonCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    gap: 16,
  },
  reasonContent: {
    flex: 1,
  },
  reasonTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 6,
    letterSpacing: -0.3,
  },
  reasonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666666',
    lineHeight: 20,
  },
  priceSection: {
    marginBottom: 32,
  },
  priceBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  priceLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666666',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 8,
  },
  priceAmount: {
    fontSize: 48,
    fontWeight: '900',
    color: '#000000',
    letterSpacing: -2,
  },
  pricePeriod: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666666',
    marginLeft: 4,
  },
  priceDescription: {
    fontSize: 13,
    fontWeight: '500',
    color: '#999999',
    textAlign: 'center',
  },
  trustSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 20,
    marginBottom: 24,
  },
  trustItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  trustText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#666666',
  },
});

