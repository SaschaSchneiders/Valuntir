import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { usePackage, PACKAGE_TYPES } from '../context/PackageContext';

export default function MySubscriptionScreen({ navigation }) {
  const { currentPackage, isFree, isPro, isBusiness } = usePackage();
  
  const packages = [
    {
      id: 'free',
      name: 'Free',
      price: 'Kostenlos',
      priceMonthly: 0,
      description: 'Für den Einstieg',
      color: '#666',
      features: [
        { text: 'Valuntir nutzen', included: true },
        { text: 'Suchfunktion unbegrenzt', included: true },
        { text: 'Anbieterprofil ansehen', limited: 'Max. 3/Monat' },
        { text: 'Eigene Bewertung abgeben', included: false },
        { text: 'First-Mover-Status sichern', included: false },
        { text: 'First-Mover-Provision', included: false },
        { text: 'Werbefrei', included: false },
      ],
    },
    {
      id: 'pro',
      name: 'Pro',
      price: '4,99 €',
      priceMonthly: 4.99,
      description: 'Für aktive Nutzer',
      color: '#3B82F6',
      popular: true,
      features: [
        { text: 'Alle Free-Features', included: true },
        { text: 'Unbegrenzt Anbieter ansehen', included: true },
        { text: 'Eigene Bewertungen abgeben', included: true, note: 'mit Banking-Verbindung' },
        { text: 'First-Mover-Status sichern', included: true },
        { text: 'First-Mover-Provision erhalten', included: true },
        { text: 'Werbefrei', included: true },
        { text: 'Profil personalisieren', included: false },
        { text: 'Statistik- & Analyse-Tools', included: false },
        { text: 'Lead-Modul', included: false },
      ],
    },
    {
      id: 'business',
      name: 'Business',
      price: '49 €',
      priceMonthly: 49,
      description: 'Für Anbieter',
      color: '#000',
      features: [
        { text: 'Alle Pro-Features', included: true },
        { text: 'Profil personalisieren (Logo, Text)', included: true },
        { text: 'Erfolgsquote pausieren', included: true },
        { text: 'Statistik- & Analyse-Tools', included: true },
        { text: 'Trust-Badge für Website/Mails', included: true },
        { text: 'Kontaktoption aktivieren (Leads)', included: true },
        { text: 'Premium-Support', included: true },
      ],
    },
  ];

  const currentPackageData = packages.find(pkg => {
    if (isFree) return pkg.id === 'free';
    if (isPro) return pkg.id === 'pro';
    if (isBusiness) return pkg.id === 'business';
    return pkg.id === 'free';
  });

  const handleUpgrade = (packageId) => {
    if (packageId === 'free') return;
    
    // TODO: Integration mit Payment-Provider (Stripe)
    Alert.alert(
      'Upgrade',
      `Möchtest du auf ${packageId === 'pro' ? 'Pro (4,99 €/Monat)' : 'Business (49 €/Monat)'} upgraden?`,
      [
        { text: 'Abbrechen', style: 'cancel' },
        {
          text: 'Jetzt upgraden',
          onPress: () => {
            // Payment-Flow würde hier starten
            console.log('Upgrade to:', packageId);
          }
        }
      ]
    );
  };

  const handleCancelSubscription = () => {
    Alert.alert(
      'Abo kündigen',
      'Möchtest du dein Abo wirklich kündigen? Du kannst bis zum Ende des bezahlten Zeitraums weiter nutzen.',
      [
        { text: 'Abbrechen', style: 'cancel' },
        {
          text: 'Kündigen',
          style: 'destructive',
          onPress: () => {
            // TODO: Backend-Call
            console.log('Cancel subscription');
          }
        }
      ]
    );
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
          </View>

          <ScrollView 
            style={styles.content}
            contentContainerStyle={styles.contentContainer}
            showsVerticalScrollIndicator={false}
          >
            {/* Current Package Status */}
            <View style={styles.currentPackageSection}>
              <Text style={styles.sectionTitle}>Dein aktuelles Paket</Text>
              <View style={[styles.currentPackageCard, { borderColor: currentPackageData.color }]}>
                <View style={styles.currentPackageHeader}>
                  <View>
                    <Text style={styles.currentPackageName}>{currentPackageData.name}</Text>
                    <Text style={styles.currentPackagePrice}>{currentPackageData.price}/Monat</Text>
                  </View>
                  {currentPackageData.id === 'free' && (
                    <View style={styles.freeBadge}>
                      <Text style={styles.freeBadgeText}>Kostenlos</Text>
                    </View>
                  )}
                  {currentPackageData.id !== 'free' && (
                    <View style={[styles.activeBadge, { backgroundColor: currentPackageData.color }]}>
                      <Ionicons name="checkmark-circle" size={18} color="#FFFFFF" />
                      <Text style={styles.activeBadgeText}>Aktiv</Text>
                    </View>
                  )}
                </View>
                
                {!isFree && (
                  <View style={styles.subscriptionInfo}>
                    <View style={styles.infoRow}>
                      <Ionicons name="calendar-outline" size={16} color="#666" />
                      <Text style={styles.infoText}>Nächste Abrechnung: 01.01.2025</Text>
                    </View>
                    <View style={styles.infoRow}>
                      <Ionicons name="card-outline" size={16} color="#666" />
                      <Text style={styles.infoText}>•••• 4242 (Visa)</Text>
                    </View>
                  </View>
                )}
              </View>
            </View>

            {/* Package Comparison */}
            <View style={styles.comparisonSection}>
              <Text style={styles.sectionTitle}>Alle Pakete im Vergleich</Text>
              
              {packages.map((pkg, index) => {
                const isCurrentPackage = 
                  (isFree && pkg.id === 'free') ||
                  (isPro && pkg.id === 'pro') ||
                  (isBusiness && pkg.id === 'business');

                return (
                  <View 
                    key={pkg.id}
                    style={[
                      styles.packageCard,
                      pkg.popular && styles.packageCardPopular,
                      isCurrentPackage && styles.packageCardCurrent,
                    ]}
                  >
                    {pkg.popular && (
                      <View style={styles.popularBadge}>
                        <Text style={styles.popularBadgeText}>Beliebt</Text>
                      </View>
                    )}

                    <View style={styles.packageHeader}>
                      <Text style={styles.packageName}>{pkg.name}</Text>
                      <Text style={styles.packageDescription}>{pkg.description}</Text>
                      <View style={styles.packagePricing}>
                        <Text style={styles.packagePrice}>{pkg.price}</Text>
                        {pkg.priceMonthly > 0 && (
                          <Text style={styles.packagePriceNote}>/Monat</Text>
                        )}
                      </View>
                    </View>

                    <View style={styles.featuresList}>
                      {pkg.features.map((feature, featureIndex) => (
                        <View key={featureIndex} style={styles.featureItem}>
                          {feature.included ? (
                            <Ionicons name="checkmark-circle" size={20} color="#10B981" />
                          ) : feature.limited ? (
                            <Ionicons name="alert-circle" size={20} color="#F59E0B" />
                          ) : (
                            <Ionicons name="close-circle" size={20} color="#E5E5E5" />
                          )}
                          <View style={styles.featureTextContainer}>
                            <Text style={[
                              styles.featureText,
                              !feature.included && !feature.limited && styles.featureTextDisabled
                            ]}>
                              {feature.text}
                            </Text>
                            {(feature.limited || feature.note) && (
                              <Text style={styles.featureNote}>
                                {feature.limited || feature.note}
                              </Text>
                            )}
                          </View>
                        </View>
                      ))}
                    </View>

                    {/* Action Button */}
                    {!isCurrentPackage && (
                      <TouchableOpacity 
                        style={[styles.upgradeButton, { backgroundColor: pkg.color }]}
                        onPress={() => handleUpgrade(pkg.id)}
                      >
                        <Text style={styles.upgradeButtonText}>
                          {pkg.id === 'free' ? 'Downgrade' : 'Jetzt upgraden'}
                        </Text>
                        <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
                      </TouchableOpacity>
                    )}

                    {isCurrentPackage && pkg.id !== 'free' && (
                      <TouchableOpacity 
                        style={styles.manageButton}
                        onPress={handleCancelSubscription}
                      >
                        <Text style={styles.manageButtonText}>Abo verwalten</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                );
              })}
            </View>

            {/* Info Section */}
            <View style={styles.infoSection}>
              <View style={styles.infoCard}>
                <Ionicons name="shield-checkmark" size={24} color="#10B981" />
                <Text style={styles.infoCardTitle}>Jederzeit kündbar</Text>
                <Text style={styles.infoCardText}>
                  Keine Mindestlaufzeit, keine Kündigungsfrist. Du kannst jederzeit kündigen 
                  und das Abo läuft bis zum Ende des bezahlten Zeitraums weiter.
                </Text>
              </View>

              <View style={styles.infoCard}>
                <Ionicons name="refresh" size={24} color="#3B82F6" />
                <Text style={styles.infoCardTitle}>30 Tage Geld-zurück-Garantie</Text>
                <Text style={styles.infoCardText}>
                  Teste Pro oder Business risikofrei. Wenn du nicht zufrieden bist, 
                  erhältst du innerhalb von 30 Tagen den vollen Betrag zurück.
                </Text>
              </View>

              <View style={styles.infoCard}>
                <Ionicons name="card" size={24} color="#666" />
                <Text style={styles.infoCardTitle}>Sichere Zahlung</Text>
                <Text style={styles.infoCardText}>
                  Alle Zahlungen laufen über Stripe. Wir speichern keine Zahlungsdaten. 
                  Akzeptiert werden Kreditkarten, SEPA und PayPal.
                </Text>
              </View>
            </View>

            {/* Contact CTA */}
            <View style={styles.contactCard}>
              <Ionicons name="chatbubble-ellipses" size={28} color="#3B82F6" />
              <Text style={styles.contactTitle}>Fragen zu den Paketen?</Text>
              <Text style={styles.contactText}>
                Unser Team berät dich gerne bei der Auswahl des passenden Pakets
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
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
    marginBottom: 16,
  },
  currentPackageSection: {
    marginBottom: 32,
    marginTop: 20,
  },
  currentPackageCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  currentPackageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  currentPackageName: {
    fontSize: 24,
    fontWeight: '800',
    color: '#000',
    marginBottom: 4,
  },
  currentPackagePrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  freeBadge: {
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  freeBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#666',
  },
  activeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  activeBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  subscriptionInfo: {
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F5F5F5',
    gap: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  infoText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  comparisonSection: {
    marginBottom: 32,
  },
  packageCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
    position: 'relative',
  },
  packageCardPopular: {
    borderWidth: 2,
    borderColor: '#3B82F6',
    shadowColor: '#3B82F6',
    shadowOpacity: 0.15,
  },
  packageCardCurrent: {
    backgroundColor: '#F8F9FA',
  },
  popularBadge: {
    position: 'absolute',
    top: -12,
    right: 20,
    backgroundColor: '#3B82F6',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 12,
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  popularBadgeText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#FFFFFF',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  packageHeader: {
    marginBottom: 20,
  },
  packageName: {
    fontSize: 22,
    fontWeight: '800',
    color: '#000',
    marginBottom: 4,
  },
  packageDescription: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
    marginBottom: 12,
  },
  packagePricing: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  packagePrice: {
    fontSize: 32,
    fontWeight: '800',
    color: '#000',
  },
  packagePriceNote: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    marginLeft: 4,
  },
  featuresList: {
    gap: 12,
    marginBottom: 20,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  featureTextContainer: {
    flex: 1,
  },
  featureText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#000',
    lineHeight: 20,
  },
  featureTextDisabled: {
    color: '#CCCCCC',
  },
  featureNote: {
    fontSize: 12,
    fontWeight: '500',
    color: '#999',
    marginTop: 2,
  },
  upgradeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  upgradeButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  manageButton: {
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    alignItems: 'center',
  },
  manageButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#666',
  },
  infoSection: {
    marginBottom: 24,
    gap: 16,
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    alignItems: 'center',
  },
  infoCardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    marginTop: 12,
    marginBottom: 8,
    textAlign: 'center',
  },
  infoCardText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
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

