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

export default function AboutValuntirScreen({ navigation }) {
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
              <Text style={styles.heroSubheadline}>Fakten schaffen</Text>
            </View>

            {/* Ziel */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Unser Ziel</Text>
              <Text style={styles.sectionText}>
                Gefakte Bewertungen. Geschönte Referenzen. Undurchsichtige Versprechen. 
                Jedes Jahr verbrennen Unternehmen Millionen mit den falschen Partnern.
                {'\n\n'}
                Valuntir glaubt an Transparenz. An echte Erfolgsquoten statt Marketing-Versprechen. 
                An gute Geschäftsbeziehungen, die auf Leistung basieren – nicht auf schönen Worten.
                {'\n\n'}
                Wir schaffen einen Ort, an dem die Besten sichtbar werden und schlechte Anbieter 
                keinen Platz mehr haben.
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
                <Text style={styles.highlightTitle}>Unsere Philosophie</Text>
                <Text style={styles.highlightText}>
                  Leistung sollte zählen. Nicht Marketingbudget. Nicht aufgeblähte PR. 
                  Nicht gekaufte 5-Sterne-Bewertungen.
                  {'\n\n'}
                  Ein Handwerker, der großartige Arbeit leistet, sollte die gleichen Chancen haben 
                  wie ein Konzern mit Millionen-Budget. Eine Steuerberaterin, die ihre Mandanten 
                  zum Erfolg führt, sollte gesehen werden.
                  {'\n\n'}
                  Bei Valuntir entscheiden Fakten: Projekterfolg. Kundenzufriedenheit. Stammkundenanteil. 
                  Messbar. Nachweisbar. Transparent.
                </Text>
              </LinearGradient>
            </View>

            {/* Community */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Unsere Community</Text>
              <Text style={styles.sectionText}>
                Valuntir lebt von Ehrlichkeit. Wir bauen eine Community auf, die von Vertrauen, 
                Ehrlichkeit und Wertschätzung geprägt ist.
                {'\n\n'}
                Je mehr Menschen ihre Geschäftsbeziehungen ehrlich bewerten, desto klarer wird das Bild. 
                Desto mehr profitiert jeder Einzelne. Die Guten steigen auf. Die Schlechten fallen zurück 
                oder verbessern sich.
                {'\n\n'}
                So entsteht ein Markt, in dem Qualität gewinnt – und alle davon profitieren.
              </Text>
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

