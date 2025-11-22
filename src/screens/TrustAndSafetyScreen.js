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
import { usePackage } from '../context/PackageContext';
import UpgradeTeaser from '../shared/UpgradeTeaser';

export default function TrustAndSafetyScreen({ navigation }) {
  const { isFree } = usePackage();

  const handleUpgrade = () => {
    navigation.navigate('ProPlanPromo');
  };
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
            <Text style={styles.headerTitle}>Sicherheit</Text>
            <View style={styles.headerSpacer} />
          </View>

          <ScrollView 
            style={styles.content}
            contentContainerStyle={styles.contentContainer}
            showsVerticalScrollIndicator={false}
          >
            {/* Hero */}
            <View style={styles.heroSection}>
              <Text style={styles.heroHeadline}>VALUNTIR{'\n'}SECURITY-SYSTEM</Text>
              <Text style={styles.heroSubheadline}>Entwickelt für maximalen Schutz</Text>
            </View>

            {/* Intro */}
            <View style={styles.introSection}>
              <Text style={styles.introText}>
                Da wir mit Banken zusammenarbeiten, müssen unsere Sicherheits-Standards auf dem gleichen 
                Level sein. Deshalb nutzen wir den exakt gleichen Standard, den alle großen Banken verwenden.
                {'\n\n'}
                Das Valuntir Security-System basiert auf Open Banking – bewährt, geprüft und absolut sicher.
              </Text>
            </View>

            {/* Sicherheitsfeatures */}
            <View style={styles.featuresSection}>
              <Text style={styles.sectionTitle}>Das System</Text>

              <View style={styles.featureCard}>
                <View style={styles.featureIcon}>
                  <Ionicons name="checkmark-done" size={28} color="#3B82F6" />
                </View>
                <View style={styles.featureContent}>
                  <Text style={styles.featureTitle}>Verifizierte Identitäten</Text>
                  <Text style={styles.featureText}>
                    Jeder Nutzer und jeder Anbieter wird durch echte Zahlungen verifiziert. 
                    Nur wer tatsächlich Geschäftsbeziehungen hat, kann bewerten.
                  </Text>
                </View>
              </View>

              <View style={styles.featureCard}>
                <View style={styles.featureIcon}>
                  <Ionicons name="lock-closed" size={28} color="#3B82F6" />
                </View>
                <View style={styles.featureContent}>
                  <Text style={styles.featureTitle}>Bank-Level-Verschlüsselung</Text>
                  <Text style={styles.featureText}>
                    Alle Daten werden mit der gleichen 256-bit SSL-Verschlüsselung geschützt, 
                    die auch im Online-Banking zum Einsatz kommt.
                  </Text>
                </View>
              </View>

              <View style={styles.featureCard}>
                <View style={styles.featureIcon}>
                  <Ionicons name="bar-chart" size={28} color="#3B82F6" />
                </View>
                <View style={styles.featureContent}>
                  <Text style={styles.featureTitle}>Verlässliche Erfolgsquoten</Text>
                  <Text style={styles.featureText}>
                    Alle Erfolgsraten basieren auf verifizierten Geschäftsbeziehungen. Dabei werden ausschließlich echte Zahlungen erfasst und unser Algorithmus garantiert 100% Betrugsschutz.
                  </Text>
                </View>
              </View>

              <View style={styles.featureCard}>
                <View style={styles.featureIcon}>
                  <Ionicons name="server" size={28} color="#3B82F6" />
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
                  <Ionicons name="eye-off" size={28} color="#3B82F6" />
                </View>
                <View style={styles.featureContent}>
                  <Text style={styles.featureTitle}>Read-only Zugriff</Text>
                  <Text style={styles.featureText}>
                    Das System kann nur Transaktionen auslesen. Zahlungen durchführen oder 
                    Kontodaten ändern ist technisch unmöglich.
                  </Text>
                </View>
              </View>
            </View>

            {/* Upgrade Teaser (nur für FREE User) */}
            {isFree && (
              <UpgradeTeaser
                title="Bereit loszulegen?"
                subtitle="Nutze jetzt 100% verifizierte Erfolgsquoten und finde garantiert die besten Partner"
                icon="shield-checkmark"
                gradientColors={['#3B82F6', '#2563EB']}
                shadowColor="#3B82F6"
                onPress={handleUpgrade}
              />
            )}

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
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  backButton: {
    padding: 4,
    width: 36,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#000',
  },
  headerSpacer: {
    width: 36,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  heroSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  heroHeadline: {
    fontSize: 36,
    fontWeight: '900',
    color: '#000000',
    textAlign: 'center',
    marginBottom: 4,
    letterSpacing: -1,
    lineHeight: 42,
  },
  heroSubheadline: {
    fontSize: 16,
    fontWeight: '500',
    color: '#3B82F6',
    textAlign: 'center',
    lineHeight: 24,
  },
  introSection: {
    marginBottom: 40,
  },
  introText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    lineHeight: 26,
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
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
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

