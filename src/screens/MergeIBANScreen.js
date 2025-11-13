import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function MergeIBANScreen() {
  const navigation = useNavigation();
  
  // Mock-Daten für verknüpfte IBANs
  const [linkedIBANs, setLinkedIBANs] = useState([
    { id: 1, last4: '1234', bankName: 'Sparkasse', isPrimary: true, ratingCount: 12 },
    { id: 2, last4: '5678', bankName: 'Deutsche Bank', isPrimary: false, ratingCount: 3 },
  ]);

  const handleAddIBAN = () => {
    console.log('Open Banking Verification starten');
    // TODO: Open Banking Flow
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#F8F9FA', '#FFFFFF']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="chevron-back" size={28} color="#000" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>IBANs verwalten</Text>
            <View style={styles.headerSpacer} />
          </View>

          <ScrollView 
            style={styles.content}
            contentContainerStyle={styles.contentContainer}
            showsVerticalScrollIndicator={false}
          >
            {/* Hero Section */}
            <View style={styles.heroSection}>
              <Text style={styles.heroTitle}>
                Deine Organisation hat mehrere Valuntir-Profile?
              </Text>
              <Text style={styles.heroSubtitle}>
                Dann kannst du hier alle deine IBANs zu einem starken Profil zusammenführen.
              </Text>
            </View>

            {/* Info Card */}
            <View style={styles.infoCard}>
              <View style={styles.infoHeader}>
                <Ionicons name="information-circle" size={20} color="#3B82F6" />
                <Text style={styles.infoTitle}>Wie funktioniert's?</Text>
              </View>
              <View style={styles.stepsContainer}>
                <View style={styles.stepRow}>
                  <Text style={styles.stepNumber}>1. </Text>
                  <Text style={styles.stepText}>Klicke auf "Weitere IBAN hinzufügen"</Text>
                </View>
                <View style={styles.stepRow}>
                  <Text style={styles.stepNumber}>2. </Text>
                  <Text style={styles.stepText}>Verifiziere deine IBAN per Open Banking</Text>
                </View>
                <View style={styles.stepRow}>
                  <Text style={styles.stepNumber}>3. </Text>
                  <Text style={styles.stepText}>Fertig! Alle Profile inkl. aller Statistiken und Metriken werden zusammengeführt</Text>
                </View>
              </View>
            </View>

            {/* Hauptprofil */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Dein Hauptprofil</Text>
              
              {linkedIBANs.filter(iban => iban.isPrimary).map(iban => (
                <View key={iban.id} style={[styles.ibanCard, styles.primaryCard]}>
                  <View style={styles.ibanLeft}>
                    <View style={styles.ibanIconContainer}>
                      <Ionicons name="card" size={24} color="#3B82F6" />
                    </View>
                    <View style={styles.ibanInfo}>
                      <View style={styles.ibanRow}>
                        <Text style={styles.ibanNumber}>DE•• •••• •••• {iban.last4}</Text>
                        <View style={styles.primaryBadge}>
                          <Ionicons name="star" size={10} color="#3B82F6" />
                          <Text style={styles.primaryBadgeText}>Hauptkonto</Text>
                        </View>
                      </View>
                      <Text style={styles.ibanBank}>{iban.bankName}</Text>
                      <Text style={styles.ibanRatings}>{iban.ratingCount} Bewertungen</Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>

            {/* Weitere verknüpfte IBANs */}
            {linkedIBANs.filter(iban => !iban.isPrimary).length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Weitere verknüpfte Konten</Text>
                
                {linkedIBANs.filter(iban => !iban.isPrimary).map(iban => (
                  <View key={iban.id} style={styles.ibanCard}>
                    <View style={styles.ibanLeft}>
                      <View style={[styles.ibanIconContainer, styles.secondaryIcon]}>
                        <Ionicons name="card-outline" size={24} color="#666" />
                      </View>
                      <View style={styles.ibanInfo}>
                        <Text style={styles.ibanNumber}>DE•• •••• •••• {iban.last4}</Text>
                        <Text style={styles.ibanBank}>{iban.bankName}</Text>
                        <Text style={styles.ibanRatings}>{iban.ratingCount} Bewertungen (zusammengeführt)</Text>
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            )}

            {/* Wichtiger Hinweis */}
            <View style={styles.warningCard}>
              <Ionicons name="shield-checkmark" size={20} color="#10B981" />
              <View style={styles.warningContent}>
                <Text style={styles.warningTitle}>Sicher & automatisch</Text>
                <Text style={styles.warningText}>
                  Nur du kannst IBANs hinzufügen. Die Verifizierung erfolgt per Open Banking und ist 100% sicher.
                </Text>
              </View>
            </View>

            {/* Spacer for Bottom Button */}
            <View style={{ height: 100 }} />
          </ScrollView>

          {/* Fixed Bottom Button */}
          <View style={styles.bottomButtonContainer}>
            <TouchableOpacity style={styles.bottomButton} onPress={handleAddIBAN}>
              <Ionicons name="add-circle" size={24} color="#FFFFFF" />
              <Text style={styles.bottomButtonText}>Weitere IBAN hinzufügen</Text>
            </TouchableOpacity>
          </View>
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
    marginBottom: 32,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#000',
    marginBottom: 12,
    textAlign: 'center',
    lineHeight: 32,
    paddingHorizontal: 10,
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 20,
  },
  infoCard: {
    backgroundColor: 'rgba(59, 130, 246, 0.05)',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.1)',
    marginBottom: 32,
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
  },
  stepsContainer: {
    gap: 8,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  stepNumber: {
    fontSize: 14,
    fontWeight: '700',
    color: '#000',
    marginRight: 4,
  },
  stepText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 22,
    flex: 1,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
    marginBottom: 20,
  },
  ibanCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginBottom: 12,
  },
  primaryCard: {
    borderWidth: 1,
    borderColor: '#3B82F6',
    backgroundColor: 'rgba(59, 130, 246, 0.02)',
  },
  ibanLeft: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  ibanIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  secondaryIcon: {
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
  },
  ibanInfo: {
    flex: 1,
  },
  ibanRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  ibanNumber: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    letterSpacing: 1,
  },
  primaryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  primaryBadgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#3B82F6',
  },
  ibanBank: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  ibanRatings: {
    fontSize: 13,
    color: '#999',
  },
  bottomButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 32,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.05)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  bottomButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: '#3B82F6',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 28,
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  bottomButtonText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.3,
  },
  warningCard: {
    flexDirection: 'row',
    backgroundColor: 'rgba(16, 185, 129, 0.05)',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.1)',
    gap: 12,
  },
  warningContent: {
    flex: 1,
  },
  warningTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#000',
    marginBottom: 4,
  },
  warningText: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
  },
});

