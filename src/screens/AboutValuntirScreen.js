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
import UpgradeTeaser from '../shared/UpgradeTeaser';
import { usePackage } from '../context/PackageContext';

export default function AboutValuntirScreen({ navigation }) {
  const { isFree } = usePackage();

  const handleUpgrade = () => {
    navigation.navigate('Main', { screen: 'Dashboard' });
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
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="chevron-back" size={28} color="#000" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Über Valuntir</Text>
            <View style={styles.headerSpacer} />
          </View>

          <ScrollView 
            style={styles.content}
            contentContainerStyle={styles.contentContainer}
            showsVerticalScrollIndicator={false}
          >
            {/* Hero */}
            <View style={styles.heroSection}>
              <Text style={styles.heroHeadline}>VALUNTIR</Text>
              <Text style={styles.heroSubheadline}>Die Erfolgsquoten-Plattform</Text>
            </View>

            {/* Ziel */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Warum gibt es Valuntir?</Text>
              <Text style={styles.sectionText}>
                Kennen Sie den Satz: "Es bringt nichts gut zu sein, wenn andere sich besser verkaufen."
                {'\n\n'}
                Wir hassen diesen Satz. Und für uns ist klar: Für alle ehrlichen Geschäftsleute ist es besser, wenn sich Qualität gegen gewiefte Verkäufer durchsetzt.
                {'\n\n'}
                Deshalb haben wir eine unfälschbare Erfolgsquote geschaffen. Sie zeigt neutral und glasklar, welche Anbieter nur im Marketing & Verkauf glänzen und welche ihre Versprechen halten und nachhaltige Qualität liefern.
              </Text>
            </View>

            {/* Philosophie */}
            <View style={styles.highlightSection}>
              <LinearGradient
                colors={['rgba(59, 130, 246, 0.08)', 'rgba(59, 130, 246, 0.02)']}
                style={styles.highlightGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
              >
                <Text style={styles.highlightTitle}>Wie funktioniert das?</Text>
                <Text style={styles.highlightText}>
                  Ganz einfach: Jedes Mal wenn du etwas bezahlst, kannst du den Empfänger (den Anbieter) bewerten.
                  {'\n\n'}
                  Aber nicht mit Sternen oder Kommentaren. Sondern mit harten Fakten: Wurde das Projekt erfolgreich? Würden Sie wieder mit diesem Anbieter arbeiten?
                  {'\n\n'}
                  Aus all diesen Bewertungen errechnen wir eine unfälschbare Erfolgsquote. Dabei setzen wir auf einen intelligenten Algorithmus und verzichten auf Meinungen und Gefühle.
                  {'\n\n'}
                  Und das Beste: Wir verifizieren jede Bewertung durch echte Zahlungsströme. Wer nicht wirklich bezahlt hat, kann nicht bewerten.
                </Text>
              </LinearGradient>
            </View>

            {/* Community */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Wer profitiert davon?</Text>
              <Text style={styles.sectionText}>
                Alle ehrlichen und guten Geschäftsleute. Und alle, die keine Lust mehr haben auf leere Marketing-Versprechen.
                {'\n\n'}
                Je mehr Menschen ihre positiven sowie negativen Erfahrungen teilen, desto klarer wird das Bild. Die Guten werden sichtbar. Die Schlechten müssen sich verbessern oder verschwinden.
                {'\n\n'}
                So entsteht ein Markt, in dem nicht das größte Werbebudget gewinnt. Sondern die beste Leistung.
              </Text>
            </View>

            {/* Upgrade Teaser (nur für FREE User) */}
            {isFree && (
              <UpgradeTeaser
                title="Bereit loszulegen?"
                subtitle="Erzähle von deinen Erfahrungen und bring auch du mehr Wahrheit in die Wirtschaft."
                icon="diamond"
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
  section: {
    marginBottom: 40,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#000',
    marginBottom: 16,
    letterSpacing: -0.5,
  },
  sectionText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    lineHeight: 26,
  },
  highlightSection: {
    marginBottom: 32,
  },
  highlightGradient: {
    borderRadius: 24,
    padding: 28,
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.15)',
  },
  highlightTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#000',
    marginBottom: 16,
    letterSpacing: -0.3,
  },
  highlightText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    lineHeight: 26,
  },
});

