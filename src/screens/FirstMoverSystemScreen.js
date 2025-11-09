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

export default function FirstMoverSystemScreen({ navigation }) {
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
              <View style={styles.badgeContainer}>
                <LinearGradient
                  colors={['#F59E0B', '#EF4444']}
                  style={styles.badge}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Ionicons name="rocket" size={32} color="#FFFFFF" />
                </LinearGradient>
              </View>
              <Text style={styles.headline}>
                First Mover System
              </Text>
              <Text style={styles.subheadline}>
                Sichere dir exklusive Vorteile als Early Adopter
              </Text>
            </View>

            {/* Was ist das? */}
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Ionicons name="information-circle" size={24} color="#3B82F6" />
                <Text style={styles.cardTitle}>Was ist das First Mover System?</Text>
              </View>
              <Text style={styles.cardText}>
                Als Dankeschön für dein frühes Vertrauen in Valuntir belohnen wir dich mit dauerhaften 
                Vorteilen. Je früher du dabei bist, desto mehr profitierst du – ein Leben lang.
              </Text>
            </View>

            {/* Vorteile */}
            <View style={styles.tierSection}>
              <Text style={styles.sectionTitle}>Deine First Mover Vorteile</Text>
              
              {/* Tier 1 */}
              <View style={[styles.tierCard, styles.tierGold]}>
                <View style={styles.tierHeader}>
                  <View style={styles.tierBadge}>
                    <Ionicons name="trophy" size={24} color="#F59E0B" />
                  </View>
                  <View style={styles.tierHeaderText}>
                    <Text style={styles.tierTitle}>Gold Pioneer</Text>
                    <Text style={styles.tierSubtitle}>Registrierung in ersten 500</Text>
                  </View>
                </View>
                
                <View style={styles.benefitsList}>
                  <View style={styles.benefitItem}>
                    <Ionicons name="checkmark-circle" size={20} color="#10B981" />
                    <Text style={styles.benefitItemText}>Lebenslang 50% Rabatt auf Pro & Business</Text>
                  </View>
                  <View style={styles.benefitItem}>
                    <Ionicons name="checkmark-circle" size={20} color="#10B981" />
                    <Text style={styles.benefitItemText}>Exklusives "Gold Pioneer" Badge</Text>
                  </View>
                  <View style={styles.benefitItem}>
                    <Ionicons name="checkmark-circle" size={20} color="#10B981" />
                    <Text style={styles.benefitItemText}>Vorrang im Support</Text>
                  </View>
                  <View style={styles.benefitItem}>
                    <Ionicons name="checkmark-circle" size={20} color="#10B981" />
                    <Text style={styles.benefitItemText}>Zugang zu Beta-Features</Text>
                  </View>
                </View>
              </View>

              {/* Tier 2 */}
              <View style={[styles.tierCard, styles.tierSilver]}>
                <View style={styles.tierHeader}>
                  <View style={styles.tierBadge}>
                    <Ionicons name="medal" size={24} color="#94A3B8" />
                  </View>
                  <View style={styles.tierHeaderText}>
                    <Text style={styles.tierTitle}>Silver Pioneer</Text>
                    <Text style={styles.tierSubtitle}>Registrierung in ersten 2.000</Text>
                  </View>
                </View>
                
                <View style={styles.benefitsList}>
                  <View style={styles.benefitItem}>
                    <Ionicons name="checkmark-circle" size={20} color="#10B981" />
                    <Text style={styles.benefitItemText}>Lebenslang 30% Rabatt auf Pro & Business</Text>
                  </View>
                  <View style={styles.benefitItem}>
                    <Ionicons name="checkmark-circle" size={20} color="#10B981" />
                    <Text style={styles.benefitItemText}>Exklusives "Silver Pioneer" Badge</Text>
                  </View>
                  <View style={styles.benefitItem}>
                    <Ionicons name="checkmark-circle" size={20} color="#10B981" />
                    <Text style={styles.benefitItemText}>Frühzeitiger Zugang zu neuen Features</Text>
                  </View>
                </View>
              </View>

              {/* Tier 3 */}
              <View style={[styles.tierCard, styles.tierBronze]}>
                <View style={styles.tierHeader}>
                  <View style={styles.tierBadge}>
                    <Ionicons name="ribbon" size={24} color="#CD7F32" />
                  </View>
                  <View style={styles.tierHeaderText}>
                    <Text style={styles.tierTitle}>Bronze Pioneer</Text>
                    <Text style={styles.tierSubtitle}>Registrierung in ersten 5.000</Text>
                  </View>
                </View>
                
                <View style={styles.benefitsList}>
                  <View style={styles.benefitItem}>
                    <Ionicons name="checkmark-circle" size={20} color="#10B981" />
                    <Text style={styles.benefitItemText}>Lebenslang 15% Rabatt auf Pro & Business</Text>
                  </View>
                  <View style={styles.benefitItem}>
                    <Ionicons name="checkmark-circle" size={20} color="#10B981" />
                    <Text style={styles.benefitItemText}>Exklusives "Bronze Pioneer" Badge</Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Important Note */}
            <View style={styles.noteCard}>
              <Ionicons name="information-circle-outline" size={24} color="#666" />
              <Text style={styles.noteText}>
                <Text style={styles.noteBold}>Wichtig:</Text> Dein First Mover Status wird automatisch 
                bei der Registrierung vergeben und ist lebenslang gültig. Die Vorteile gelten auch für 
                alle zukünftigen Produkte und Services von Valuntir.
              </Text>
            </View>

            {/* CTA */}
            <TouchableOpacity style={styles.ctaButton}>
              <Text style={styles.ctaButtonText}>Jetzt registrieren & Vorteile sichern</Text>
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
  heroSection: {
    alignItems: 'center',
    marginBottom: 32,
    marginTop: 20,
  },
  badgeContainer: {
    marginBottom: 20,
  },
  badge: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
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
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
    flex: 1,
  },
  cardText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#666',
    lineHeight: 24,
  },
  tierSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
    marginBottom: 20,
  },
  tierCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    marginBottom: 16,
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  tierGold: {
    borderColor: '#F59E0B',
    backgroundColor: '#FFFBEB',
  },
  tierSilver: {
    borderColor: '#94A3B8',
    backgroundColor: '#F8FAFC',
  },
  tierBronze: {
    borderColor: '#CD7F32',
    backgroundColor: '#FEF3C7',
  },
  tierHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 20,
  },
  tierBadge: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  tierHeaderText: {
    flex: 1,
  },
  tierTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#000',
    marginBottom: 4,
  },
  tierSubtitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#666',
  },
  benefitsList: {
    gap: 12,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  benefitItemText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    flex: 1,
    lineHeight: 20,
  },
  noteCard: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
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
  noteBold: {
    fontWeight: '700',
    color: '#000',
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 4,
  },
  ctaButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});

