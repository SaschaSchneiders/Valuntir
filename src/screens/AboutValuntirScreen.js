import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
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
          </View>

          <ScrollView 
            style={styles.content}
            contentContainerStyle={styles.contentContainer}
            showsVerticalScrollIndicator={false}
          >
            {/* Logo */}
            <View style={styles.logoContainer}>
              <Image
                source={require('../../assets/VALUNTIR.png')}
                style={styles.logo}
                resizeMode="contain"
              />
            </View>

            {/* Hero Section */}
            <View style={styles.heroSection}>
              <Text style={styles.headline}>
                Echte Erfolgsquoten für fundierte Entscheidungen
              </Text>
              <Text style={styles.subheadline}>
                Verbrenne nie wieder Geld mit schlechten Anbietern, indem du im Voraus die Erfolgschancen schwarz auf weiß siehst.
              </Text>
            </View>

            {/* Mission */}
            <View style={styles.card}>
              <View style={styles.iconBadge}>
                <Ionicons name="bulb" size={24} color="#3B82F6" />
              </View>
              <Text style={styles.cardTitle}>Unsere Mission</Text>
              <Text style={styles.cardText}>
                Valuntir macht Geschäftsbeziehungen transparent und messbar. Wir zeigen echte Erfolgsquoten 
                statt geschönter Referenzen – damit du die richtige Entscheidung triffst.
              </Text>
            </View>

            {/* Wie es funktioniert */}
            <View style={styles.card}>
              <View style={styles.iconBadge}>
                <Ionicons name="checkmark-circle" size={24} color="#10B981" />
              </View>
              <Text style={styles.cardTitle}>So funktioniert's</Text>
              <Text style={styles.cardText}>
                <Text style={styles.bold}>1. Verifizierte Bewertungen:</Text> Nur echte Kunden können bewerten{'\n\n'}
                <Text style={styles.bold}>2. Transparente Kennzahlen:</Text> Erfolgsquoten, Projektwerte, Stammkundenanteil{'\n\n'}
                <Text style={styles.bold}>3. Faire Vergleiche:</Text> Finde den passenden Anbieter anhand echter Daten
              </Text>
            </View>

            {/* Vorteile */}
            <View style={styles.card}>
              <View style={styles.iconBadge}>
                <Ionicons name="star" size={24} color="#F59E0B" />
              </View>
              <Text style={styles.cardTitle}>Deine Vorteile</Text>
              
              <View style={styles.benefitsList}>
                <View style={styles.benefitItem}>
                  <Ionicons name="shield-checkmark" size={20} color="#3B82F6" />
                  <Text style={styles.benefitText}>100% verifizierte Bewertungen</Text>
                </View>
                <View style={styles.benefitItem}>
                  <Ionicons name="analytics" size={20} color="#3B82F6" />
                  <Text style={styles.benefitText}>Transparente Erfolgsquoten</Text>
                </View>
                <View style={styles.benefitItem}>
                  <Ionicons name="people" size={20} color="#3B82F6" />
                  <Text style={styles.benefitText}>Direkter Kontakt zu Anbietern</Text>
                </View>
                <View style={styles.benefitItem}>
                  <Ionicons name="time" size={20} color="#3B82F6" />
                  <Text style={styles.benefitText}>Spare Zeit bei der Suche</Text>
                </View>
              </View>
            </View>

            {/* CTA */}
            <TouchableOpacity style={styles.ctaButton}>
              <Text style={styles.ctaButtonText}>Jetzt durchstarten</Text>
              <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
            </TouchableOpacity>

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
  logoContainer: {
    alignItems: 'center',
    marginBottom: 32,
    marginTop: 20,
  },
  logo: {
    width: 200,
    height: 50,
  },
  heroSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  headline: {
    fontSize: 28,
    fontWeight: '800',
    color: '#000',
    textAlign: 'center',
    lineHeight: 36,
    marginBottom: 16,
  },
  subheadline: {
    fontSize: 16,
    fontWeight: '500',
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  iconBadge: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
    marginBottom: 12,
  },
  cardText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#666',
    lineHeight: 24,
  },
  bold: {
    fontWeight: '700',
    color: '#000',
  },
  benefitsList: {
    gap: 16,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  benefitText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000',
    flex: 1,
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 32,
    gap: 12,
    marginTop: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 4,
  },
  ctaButtonText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});

