import React, { useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Animated,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import TransFAB from '../shared/TransFAB';

export default function FirstMoverSystemScreen({ navigation }) {
  const scrollY = useRef(new Animated.Value(0)).current;

  // Scroll Handler für Animated ScrollView
  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: false }
  );

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
            <Text style={styles.headerTitle}>First Mover Programm</Text>
            <View style={styles.headerSpacer} />
          </View>

          <ScrollView 
            style={styles.content}
            contentContainerStyle={styles.contentContainer}
            showsVerticalScrollIndicator={false}
            onScroll={handleScroll}
            scrollEventThrottle={16}
          >
            {/* Hero */}
            <View style={styles.heroSection}>
              <Text style={styles.heroHeadline}>FIRST MOVER{'\n'}PROGRAMM</Text>
              <Text style={styles.heroSubheadline}>Passives Einkommen aufbauen</Text>
            </View>

            {/* Intro */}
            <View style={styles.introSection}>
              <Text style={styles.introText}>
                Sei der Erste, der einen Anbieter bewertet, und profitiere dauerhaft davon. 
                Sobald dieser Anbieter sein Profil aktiviert, erhältst du 10% seines monatlichen 
                Abo-Preises. Automatisch und unbegrenzt, solange beide Accounts aktiv sind.
              </Text>
            </View>

            {/* Wie es funktioniert */}
            <View style={styles.featuresSection}>
              <Text style={styles.sectionTitle}>So funktioniert's</Text>

              <View style={styles.featureCard}>
                <View style={styles.featureIcon}>
                  <Ionicons name="diamond" size={28} color="#3B82F6" />
                </View>
                <View style={styles.featureContent}>
                  <Text style={styles.featureTitle}>1. Werde Pro-Mitglied</Text>
                  <Text style={styles.featureText}>
                    Nur mit einem aktiven Pro-Abo kannst du am First Mover Programm teilnehmen 
                    und durch deine Bewertungen passives Einkommen aufbauen.
                  </Text>
                </View>
              </View>

              <View style={styles.featureCard}>
                <View style={styles.featureIcon}>
                  <Ionicons name="star" size={28} color="#3B82F6" />
                </View>
                <View style={styles.featureContent}>
                  <Text style={styles.featureTitle}>2. Als Erster bewerten</Text>
                  <Text style={styles.featureText}>
                    Bewerte einen Anbieter als Erster nach einer echten Transaktion. 
                    Du wirst automatisch als First Mover registriert.
                  </Text>
                </View>
              </View>

              <View style={styles.featureCard}>
                <View style={styles.featureIcon}>
                  <Ionicons name="cash" size={28} color="#3B82F6" />
                </View>
                <View style={styles.featureContent}>
                  <Text style={styles.featureTitle}>3. Provision erhalten</Text>
                  <Text style={styles.featureText}>
                    Sobald der Anbieter sein Profil aktiviert, erhältst du automatisch 10% 
                    seines monatlichen Abo-Preises. Dauerhaft und ohne weiteren Aufwand.
                  </Text>
                </View>
              </View>
            </View>

            {/* Beispielrechnung */}
            <View style={styles.calculationSection}>
              <LinearGradient
                colors={['rgba(59, 130, 246, 0.08)', 'rgba(59, 130, 246, 0.02)']}
                style={styles.calculationGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
              >
                <View style={styles.calculationHeader}>
                  <Ionicons name="calculator" size={24} color="#3B82F6" />
                  <Text style={styles.calculationTitle}>Beispielrechnung</Text>
                </View>
                
                <View style={styles.calculationRow}>
                  <Text style={styles.calculationLabel}>Anbieter-Abo:</Text>
                  <Text style={styles.calculationValue}>49,00 €/Monat</Text>
                </View>
                
                <View style={styles.calculationRow}>
                  <Text style={styles.calculationLabel}>Deine Provision (10%):</Text>
                  <Text style={styles.calculationHighlight}>4,90 €/Monat</Text>
                </View>
                
                <View style={styles.calculationDivider} />
                
                <View style={styles.calculationResult}>
                  <Text style={styles.calculationResultLabel}>Bei 10 First Mover Bewertungen:</Text>
                  <Text style={styles.calculationResultValue}>49,00 €/Monat</Text>
                  <Text style={styles.calculationResultYear}>588,00 € pro Jahr</Text>
                </View>
              </LinearGradient>
            </View>

            {/* Vorteile */}
            <View style={styles.benefitsSection}>
              <Text style={styles.sectionTitle}>Deine Vorteile</Text>

              <View style={styles.benefitRow}>
                <Ionicons name="infinite" size={24} color="#10B981" />
                <Text style={styles.benefitText}>
                  Unbegrenzte Laufzeit solange der Anbieter sein Abo behält
                </Text>
              </View>

              <View style={styles.benefitRow}>
                <Ionicons name="trending-up" size={24} color="#10B981" />
                <Text style={styles.benefitText}>
                  Passives Einkommen ohne weiteren Aufwand
                </Text>
              </View>

              <View style={styles.benefitRow}>
                <Ionicons name="flash" size={24} color="#10B981" />
                <Text style={styles.benefitText}>
                  Automatische monatliche Gutschrift
                </Text>
              </View>

              <View style={styles.benefitRow}>
                <Ionicons name="people" size={24} color="#10B981" />
                <Text style={styles.benefitText}>
                  Unterstütze die Community und werde belohnt
                </Text>
              </View>
            </View>

            {/* Important Note */}
            <View style={styles.noteCard}>
              <Ionicons name="information-circle" size={20} color="#666" />
              <Text style={styles.noteText}>
                Deine First Mover Bewertungen bleiben dauerhaft in deinem Profil sichtbar. 
                Du erhältst die Provision nur, wenn dein Account zum Zeitpunkt der 
                Abo-Aktivierung des Anbieters aktiv ist.
              </Text>
            </View>

            {/* Bottom Spacer für FAB */}
            <View style={{ height: 180 }} />
          </ScrollView>

          {/* TransFAB */}
          <TransFAB 
            scrollY={scrollY} 
            bottom={40} 
            onPress={handleUpgrade}
            text="Auf Valuntir Pro upgraden"
            icon="diamond"
          />
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
  calculationSection: {
    marginBottom: 32,
  },
  calculationGradient: {
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.15)',
  },
  calculationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
  },
  calculationTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#000',
    letterSpacing: -0.3,
  },
  calculationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  calculationLabel: {
    fontSize: 15,
    fontWeight: '500',
    color: '#666',
  },
  calculationValue: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000',
  },
  calculationHighlight: {
    fontSize: 16,
    fontWeight: '800',
    color: '#3B82F6',
  },
  calculationDivider: {
    height: 1,
    backgroundColor: 'rgba(59, 130, 246, 0.2)',
    marginVertical: 16,
  },
  calculationResult: {
    alignItems: 'center',
    paddingTop: 8,
  },
  calculationResultLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
    marginBottom: 8,
  },
  calculationResultValue: {
    fontSize: 32,
    fontWeight: '900',
    color: '#3B82F6',
    letterSpacing: -1,
    marginBottom: 4,
  },
  calculationResultYear: {
    fontSize: 14,
    fontWeight: '600',
    color: '#10B981',
  },
  benefitsSection: {
    marginBottom: 32,
  },
  benefitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 16,
  },
  benefitText: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
    color: '#333',
    lineHeight: 22,
  },
  noteCard: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    borderRadius: 16,
    padding: 20,
    gap: 12,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  noteText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
    lineHeight: 22,
  },
});
