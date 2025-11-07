import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function FreeHomeScreen() {
  const features = [
    {
      icon: 'bar-chart',
      title: 'Erfolgsraten sehen',
      description: 'Sieh objektive Zahlen statt subjektiver Meinungen – wie oft hat ein Anbieter wirklich geliefert?',
      isPrimary: true,
    },
    {
      icon: 'shield-checkmark',
      title: 'Verifizierte Daten',
      description: 'Jede Erfolgsrate basiert auf einer echten Geschäftstransaktion – Fake ist technisch unmöglich',
      isPrimary: true,
    },
    {
      icon: 'people',
      title: 'Community-Power',
      description: 'Profitiere von den Erfahrungen anderer Unternehmer und triff informierte Entscheidungen',
      isPrimary: true,
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
          >
            {/* Hero Section */}
            <View style={styles.hero}>
              <View style={styles.badge}>
                <Ionicons name="star" size={16} color="#666666" />
                <Text style={styles.badgeText}>Free Version</Text>
              </View>
              
              <Text style={styles.headline}>
                Sieh Erfolgsraten,{'\n'}bevor du dich entscheidest
              </Text>
              
              <Text style={styles.subheadline}>
                Valuntir zeigt dir objektive Zahlen statt{'\n'}gefakter Bewertungen
              </Text>
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
                      color={feature.isPrimary ? '#000000' : '#666666'}
                    />
                  </View>
                  <Text style={styles.featureTitle}>{feature.title}</Text>
                  <Text style={styles.featureDescription}>{feature.description}</Text>
                </View>
              ))}
            </View>

            {/* USP Explanation */}
            <View style={styles.uspSection}>
              <View style={styles.uspHeader}>
                <Ionicons name="bar-chart" size={24} color="#000000" />
                <Text style={styles.uspTitle}>Warum Erfolgsraten?</Text>
              </View>
              
              <Text style={styles.uspDescription}>
                Valuntir ist keine weitere Bewertungsplattform. Wir zeigen dir Erfolgsraten: 
                Objektive Zahlen, die auf echten Geschäftstransaktionen basieren.
              </Text>

              <View style={styles.exampleBox}>
                <View style={styles.exampleRow}>
                  <Ionicons name="checkmark-circle" size={20} color="#10B981" />
                  <Text style={styles.exampleText}>
                    <Text style={styles.exampleBold}>Nur echte Kunden</Text> können bewerten
                  </Text>
                </View>

                <View style={styles.exampleRow}>
                  <Ionicons name="checkmark-circle" size={20} color="#10B981" />
                  <Text style={styles.exampleText}>
                    <Text style={styles.exampleBold}>Jede Zahl</Text> basiert auf einer verifizierten Zahlung
                  </Text>
                </View>

                <View style={styles.exampleRow}>
                  <Ionicons name="checkmark-circle" size={20} color="#10B981" />
                  <Text style={styles.exampleText}>
                    <Text style={styles.exampleBold}>Fake-Bewertungen</Text> sind technisch unmöglich
                  </Text>
                </View>
              </View>

              <Text style={styles.uspFootnote}>
                Du siehst die Performance echter Projekte – nicht das, was jemand behauptet.
              </Text>
            </View>

            {/* How it works */}
            <View style={styles.howSection}>
              <Text style={styles.sectionTitle}>So funktioniert's</Text>
              
              <View style={styles.stepCard}>
                <Text style={styles.stepTitle}>Anbieter suchen</Text>
                <Text style={styles.stepDescription}>
                  Finde Unternehmen in deiner Branche und sieh ihre echte Erfolgsrate
                </Text>
              </View>

              <View style={styles.stepCard}>
                <Text style={styles.stepTitle}>Erfolgsraten analysieren</Text>
                <Text style={styles.stepDescription}>
                  Vergleiche objektive Zahlen: Kommunikation, Lieferqualität, Preis-Leistung
                </Text>
              </View>

              <View style={styles.stepCard}>
                <Text style={styles.stepTitle}>Sicher entscheiden</Text>
                <Text style={styles.stepDescription}>
                  Wähle den Anbieter, der nachweislich liefert – nicht nur schön redet
                </Text>
              </View>
            </View>

            {/* Trust Elements */}
            <View style={styles.trustSection}>
              <View style={styles.trustItem}>
                <Ionicons name="lock-closed" size={18} color="#666666" />
                <Text style={styles.trustText}>Verschlüsselt & sicher</Text>
              </View>
              <View style={styles.trustItem}>
                <Ionicons name="shield-checkmark" size={18} color="#666666" />
                <Text style={styles.trustText}>DSGVO-konform</Text>
              </View>
              <View style={styles.trustItem}>
                <Ionicons name="globe" size={18} color="#666666" />
                <Text style={styles.trustText}>Made in Germany</Text>
              </View>
            </View>

            {/* Bottom Spacer */}
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
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  badgeText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#666666',
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
    borderColor: '#E5E5E5',
    backgroundColor: '#FAFAFA',
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
    backgroundColor: '#F0F0F0',
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
  uspSection: {
    backgroundColor: '#FAFAFA',
    borderRadius: 24,
    padding: 24,
    marginBottom: 48,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  uspHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  uspTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000000',
    letterSpacing: -0.3,
  },
  uspDescription: {
    fontSize: 15,
    fontWeight: '500',
    color: '#333333',
    lineHeight: 22,
    marginBottom: 20,
  },
  exampleBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    gap: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  exampleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  exampleText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666666',
    flex: 1,
  },
  exampleBold: {
    fontWeight: '700',
    color: '#000000',
  },
  uspFootnote: {
    fontSize: 13,
    fontWeight: '500',
    color: '#999999',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  howSection: {
    marginBottom: 48,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#000000',
    marginBottom: 24,
    letterSpacing: -0.5,
  },
  stepCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 8,
    letterSpacing: -0.3,
  },
  stepDescription: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666666',
    lineHeight: 20,
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
