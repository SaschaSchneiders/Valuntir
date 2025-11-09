import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export default function TrustAndSafetyScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#F8F9FA', '#FFFFFF']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        <SafeAreaView style={styles.safeArea} edges={['top']}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="chevron-back" size={28} color="#000" />
            </TouchableOpacity>
          </View>

          <ScrollView 
            style={styles.content}
            contentContainerStyle={styles.contentContainer}
            showsVerticalScrollIndicator={false}
          >
            {/* Hero */}
            <View style={styles.heroSection}>
              <View style={styles.shieldContainer}>
                <LinearGradient
                  colors={['#10B981', '#059669']}
                  style={styles.shieldBadge}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Ionicons name="shield-checkmark" size={40} color="#FFFFFF" />
                </LinearGradient>
              </View>
              <Text style={styles.headline}>
                Vertrauen & Sicherheit
              </Text>
              <Text style={styles.subheadline}>
                Deine Daten und Transaktionen sind bei uns in sicheren Händen
              </Text>
            </View>

            {/* Versprechen */}
            <View style={styles.promiseCard}>
              <Text style={styles.promiseTitle}>Unser Versprechen an dich</Text>
              <Text style={styles.promiseText}>
                Bei Valuntir steht Sicherheit und Vertrauen an erster Stelle. Wir verwenden modernste 
                Technologien und strenge Richtlinien, um deine Daten zu schützen und ein faires, 
                transparentes Umfeld für alle zu schaffen.
              </Text>
            </View>

            {/* Sicherheitsfeatures */}
            <View style={styles.featuresSection}>
              <Text style={styles.sectionTitle}>Wie wir dich schützen</Text>

              <View style={styles.featureCard}>
                <View style={styles.featureIcon}>
                  <Ionicons name="lock-closed" size={28} color="#10B981" />
                </View>
                <View style={styles.featureContent}>
                  <Text style={styles.featureTitle}>End-zu-End Verschlüsselung</Text>
                  <Text style={styles.featureText}>
                    Alle sensiblen Daten werden mit Bank-Level-Verschlüsselung (256-bit SSL) geschützt. 
                    Deine Informationen sind immer sicher übertragen.
                  </Text>
                </View>
              </View>

              <View style={styles.featureCard}>
                <View style={styles.featureIcon}>
                  <Ionicons name="checkmark-done" size={28} color="#10B981" />
                </View>
                <View style={styles.featureContent}>
                  <Text style={styles.featureTitle}>Verifizierte Identitäten</Text>
                  <Text style={styles.featureText}>
                    Jeder Anbieter durchläuft einen strengen Verifizierungsprozess. Nur echte, 
                    geprüfte Unternehmen können Bewertungen erhalten.
                  </Text>
                </View>
              </View>

              <View style={styles.featureCard}>
                <View style={styles.featureIcon}>
                  <Ionicons name="eye-off" size={28} color="#10B981" />
                </View>
                <View style={styles.featureContent}>
                  <Text style={styles.featureTitle}>Volle Datenkontrolle</Text>
                  <Text style={styles.featureText}>
                    Du entscheidest, was öffentlich ist und was privat bleibt. Jederzeit volle 
                    Kontrolle über deine Daten und Sichtbarkeit.
                  </Text>
                </View>
              </View>

              <View style={styles.featureCard}>
                <View style={styles.featureIcon}>
                  <Ionicons name="server" size={28} color="#10B981" />
                </View>
                <View style={styles.featureContent}>
                  <Text style={styles.featureTitle}>DSGVO-konform</Text>
                  <Text style={styles.featureText}>
                    Alle Daten werden ausschließlich auf deutschen Servern gespeichert und 
                    entsprechen zu 100% den DSGVO-Richtlinien.
                  </Text>
                </View>
              </View>

              <View style={styles.featureCard}>
                <View style={styles.featureIcon}>
                  <Ionicons name="shield-half" size={28} color="#10B981" />
                </View>
                <View style={styles.featureContent}>
                  <Text style={styles.featureTitle}>Betrugsschutz</Text>
                  <Text style={styles.featureText}>
                    Automatische Erkennung von Fake-Bewertungen und manipulierten Profilen durch 
                    KI-gestützte Algorithmen.
                  </Text>
                </View>
              </View>

              <View style={styles.featureCard}>
                <View style={styles.featureIcon}>
                  <Ionicons name="card" size={28} color="#10B981" />
                </View>
                <View style={styles.featureContent}>
                  <Text style={styles.featureTitle}>Sichere Zahlungen</Text>
                  <Text style={styles.featureText}>
                    Alle Zahlungen laufen über zertifizierte Payment-Provider (Stripe). 
                    Deine Zahlungsdaten werden niemals bei uns gespeichert.
                  </Text>
                </View>
              </View>
            </View>

            {/* Fair Play */}
            <View style={styles.fairPlaySection}>
              <Text style={styles.sectionTitle}>Faire Spielregeln für alle</Text>

              <View style={styles.ruleCard}>
                <View style={styles.ruleHeader}>
                  <Ionicons name="people-circle" size={24} color="#3B82F6" />
                  <Text style={styles.ruleTitle}>Echte Bewertungen</Text>
                </View>
                <Text style={styles.ruleText}>
                  Nur verifizierte Geschäftsbeziehungen können bewertet werden. Jede Bewertung ist 
                  nachweisbar und kann nicht gekauft oder gefälscht werden.
                </Text>
              </View>

              <View style={styles.ruleCard}>
                <View style={styles.ruleHeader}>
                  <Ionicons name="eye" size={24} color="#3B82F6" />
                  <Text style={styles.ruleTitle}>Transparenz</Text>
                </View>
                <Text style={styles.ruleText}>
                  Alle Kennzahlen basieren auf echten Daten. Keine geschönten Zahlen, keine versteckten 
                  Informationen – nur nachweisbare Fakten.
                </Text>
              </View>

              <View style={styles.ruleCard}>
                <View style={styles.ruleHeader}>
                  <Ionicons name="scale" size={24} color="#3B82F6" />
                  <Text style={styles.ruleTitle}>Gleichberechtigung</Text>
                </View>
                <Text style={styles.ruleText}>
                  Jeder Anbieter hat die gleichen Chancen. Erfolg basiert ausschließlich auf Qualität 
                  und echten Erfolgsquoten – nicht auf Budget.
                </Text>
              </View>
            </View>

            {/* Garantien */}
            <View style={styles.guaranteeSection}>
              <Text style={styles.sectionTitle}>Unsere Garantien</Text>

              <View style={styles.guaranteesList}>
                <View style={styles.guaranteeItem}>
                  <Ionicons name="checkmark-circle" size={22} color="#10B981" />
                  <Text style={styles.guaranteeText}>
                    <Text style={styles.guaranteeBold}>Keine versteckten Kosten:</Text> Was du siehst, ist was du zahlst
                  </Text>
                </View>

                <View style={styles.guaranteeItem}>
                  <Ionicons name="checkmark-circle" size={22} color="#10B981" />
                  <Text style={styles.guaranteeText}>
                    <Text style={styles.guaranteeBold}>Jederzeit kündbar:</Text> Keine Vertragsbindung, keine Kündigungsfrist
                  </Text>
                </View>

                <View style={styles.guaranteeItem}>
                  <Ionicons name="checkmark-circle" size={22} color="#10B981" />
                  <Text style={styles.guaranteeText}>
                    <Text style={styles.guaranteeBold}>Geld-zurück-Garantie:</Text> 30 Tage Testphase, volle Rückerstattung
                  </Text>
                </View>

                <View style={styles.guaranteeItem}>
                  <Ionicons name="checkmark-circle" size={22} color="#10B981" />
                  <Text style={styles.guaranteeText}>
                    <Text style={styles.guaranteeBold}>24/7 Support:</Text> Wir sind immer für dich da
                  </Text>
                </View>
              </View>
            </View>

            {/* Zertifizierungen */}
            <View style={styles.certificationsCard}>
              <Text style={styles.certificationsTitle}>Zertifizierungen & Standards</Text>
              <View style={styles.certificationsList}>
                <View style={styles.certBadge}>
                  <Text style={styles.certText}>🇪🇺 DSGVO</Text>
                </View>
                <View style={styles.certBadge}>
                  <Text style={styles.certText}>🔒 ISO 27001</Text>
                </View>
                <View style={styles.certBadge}>
                  <Text style={styles.certText}>✓ SSL</Text>
                </View>
                <View style={styles.certBadge}>
                  <Text style={styles.certText}>🛡️ TÜV</Text>
                </View>
              </View>
            </View>

            {/* Contact CTA */}
            <View style={styles.contactCard}>
              <Ionicons name="mail" size={28} color="#666" />
              <Text style={styles.contactTitle}>Noch Fragen zur Sicherheit?</Text>
              <Text style={styles.contactText}>
                Unser Team beantwortet gerne alle deine Fragen zu Datenschutz und Sicherheit.
              </Text>
              <TouchableOpacity style={styles.contactButton}>
                <Text style={styles.contactButtonText}>Kontakt aufnehmen</Text>
                <Ionicons name="arrow-forward" size={18} color="#3B82F6" />
              </TouchableOpacity>
            </View>

            <View style={{ height: 40 }} />
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  gradient: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    padding: 4,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  heroSection: {
    alignItems: 'center',
    marginBottom: 32,
    marginTop: 20,
  },
  shieldContainer: {
    marginBottom: 20,
  },
  shieldBadge: {
    width: 90,
    height: 90,
    borderRadius: 45,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  headline: {
    fontSize: 28,
    fontWeight: '800',
    color: '#000',
    textAlign: 'center',
    lineHeight: 36,
    marginBottom: 12,
  },
  subheadline: {
    fontSize: 16,
    fontWeight: '500',
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  promiseCard: {
    backgroundColor: 'rgba(16, 185, 129, 0.05)',
    borderRadius: 20,
    padding: 24,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.2)',
  },
  promiseTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
    marginBottom: 12,
    textAlign: 'center',
  },
  promiseText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#666',
    lineHeight: 24,
    textAlign: 'center',
  },
  featuresSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
    marginBottom: 20,
  },
  featureCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    gap: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  featureIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  featureContent: {
    flex: 1,
    justifyContent: 'center',
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    marginBottom: 6,
  },
  featureText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
    lineHeight: 20,
  },
  fairPlaySection: {
    marginBottom: 32,
  },
  ruleCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  ruleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  ruleTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
  },
  ruleText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
    lineHeight: 22,
  },
  guaranteeSection: {
    marginBottom: 32,
  },
  guaranteesList: {
    gap: 16,
  },
  guaranteeItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  guaranteeText: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
    color: '#666',
    lineHeight: 22,
  },
  guaranteeBold: {
    fontWeight: '700',
    color: '#000',
  },
  certificationsCard: {
    backgroundColor: '#F8F9FA',
    borderRadius: 20,
    padding: 24,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  certificationsTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    textAlign: 'center',
    marginBottom: 20,
  },
  certificationsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 12,
  },
  certBadge: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  certText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#000',
  },
  contactCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 28,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F0F0F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  contactTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  contactText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 20,
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  contactButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#3B82F6',
  },
});

