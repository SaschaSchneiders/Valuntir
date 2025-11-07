import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Animated, TextInput, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function BusinessPlanPromoScreen({ onRequestAccess }) {
  const scrollY = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isIbanValid, setIsIbanValid] = useState(false);

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: false }
  );

  // Scroll zum Eingabefeld
  const scrollToSearch = () => {
    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
  };

  // Formatiere IBAN: DE89 3704 0044 0532 0130 00
  // DE + 2 Prüfziffern (ohne Space) + Rest in 4er-Blöcken
  const formatIban = (numbers) => {
    const clean = numbers.replace(/\s/g, '');
    
    if (clean.length === 0) return '';
    
    // Erste 2 Ziffern (Prüfziffer) direkt nach DE
    const checkDigits = clean.slice(0, 2);
    // Rest in 4er-Blöcken
    const rest = clean.slice(2);
    const restFormatted = rest.match(/.{1,4}/g)?.join(' ') || '';
    
    // Kombiniere: falls nur Prüfziffer vorhanden, kein Space
    if (rest.length === 0) {
      return checkDigits;
    }
    
    return `${checkDigits} ${restFormatted}`;
  };

  // IBAN-Verifizierung (später echte API)
  const handleIbanInput = (input) => {
    // Nur Zahlen erlauben
    const numbersOnly = input.replace(/[^0-9]/g, '');
    
    // Max 20 Ziffern (deutsche IBAN: 2 Prüfziffern + 18 Kontodaten)
    const truncated = numbersOnly.slice(0, 20);
    
    // Formatiere mit Leerzeichen
    const formatted = formatIban(truncated);
    setSearchQuery(formatted);
    
    // Validierung: Deutsche IBAN hat exakt 20 Ziffern
    const isValid = truncated.length === 20;
    setIsIbanValid(isValid);
    
    if (truncated.length === 0) {
      setSearchResults([]);
      setIsIbanValid(false);
      return;
    }

    // Vollständige IBAN: DE + Eingabe
    const fullIban = 'DE' + truncated;
    
    // Mindestens 8 Ziffern für sinnvolle Suche
    if (truncated.length < 8) {
      setSearchResults([]);
      return;
    }

    // Mock: Prüfe ob IBAN in System existiert
    // Später durch echte API ersetzen: POST /api/business/check-iban
    const mockResult = {
      exists: true,
      company: {
        id: 1,
        name: 'Steuerberatung Schmidt GmbH',
        location: 'Hamburg, Deutschland',
        iban: fullIban,
        ratings: 24,
        score: 92
      }
    };

    // Simuliere API-Call mit Delay
    setTimeout(() => {
      if (mockResult.exists) {
        setSearchResults([mockResult.company]);
      } else {
        setSearchResults([]);
      }
    }, 300);
  };

  const features = [
    {
      icon: 'create',
      title: 'Profil gestalten',
      description: 'Füge Logo, Beschreibung und Kontaktdaten hinzu – verwandle Besucher in Leads',
      isPrimary: true,
    },
    {
      icon: 'call',
      title: 'Leads empfangen',
      description: 'Erhalte direkte Kontaktanfragen von Interessenten über dein öffentliches Profil',
      isPrimary: true,
    },
    {
      icon: 'bar-chart',
      title: 'Statistiken einsehen',
      description: 'Analysiere Profilaufrufe, Interaktionen und Lead-Conversions in Echtzeit',
      isPrimary: true,
    },
    {
      icon: 'eye-off',
      title: 'Score pausieren',
      description: 'Pausiere deine Erfolgsrate zeitweise – volle Kontrolle über deine Sichtbarkeit',
      isPrimary: false,
    },
    {
      icon: 'ribbon',
      title: 'Trust-Badge',
      description: 'Zeige deine Valuntir-Erfolgsrate auf deiner Website und in E-Mail-Signaturen',
      isPrimary: false,
    },
    {
      icon: 'notifications',
      title: 'Benachrichtigungen',
      description: 'Werde sofort informiert, wenn du neue Bewertungen oder Leads erhältst',
      isPrimary: false,
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
            ref={scrollViewRef}
            style={styles.scrollView}
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
            onScroll={handleScroll}
            scrollEventThrottle={16}
          >
            {/* Hero Section */}
            <View style={styles.hero}>
              <View style={styles.badge}>
                <Ionicons name="briefcase" size={16} color="#3B82F6" />
                <Text style={styles.badgeText}>Valuntir Business</Text>
              </View>
              
              <Text style={styles.headline}>
                Du wirst bewertet?{'\n'}Dann übernimm die Kontrolle.
              </Text>
              
              <Text style={styles.subheadline}>
                Gib deine Geschäfts-IBAN ein, um dein{'\n'}Unternehmensprofil selbst zu kontrollieren:
              </Text>
              
              <View style={styles.searchContainer}>
                <View style={[
                  styles.searchInputWrapper,
                  isIbanValid && styles.searchInputWrapperValid
                ]}>
                  <Ionicons name="card-outline" size={22} color={isIbanValid ? "#10B981" : "#3B82F6"} style={styles.searchInlineIcon} />
                  <View style={styles.ibanPrefixContainer}>
                    <Text style={styles.ibanPrefix}>DE</Text>
                    <TextInput
                      style={styles.searchInlineInput}
                      placeholder="89 3704 0044 0532 0130 00"
                      placeholderTextColor="#CCCCCC"
                      value={searchQuery}
                      onChangeText={handleIbanInput}
                      returnKeyType="done"
                      autoCorrect={false}
                      keyboardType="number-pad"
                    />
                  </View>
                  {isIbanValid && (
                    <Ionicons name="checkmark-circle" size={22} color="#10B981" style={styles.validIcon} />
                  )}
                  {searchQuery.length > 0 && !isIbanValid && (
                    <TouchableOpacity onPress={() => handleIbanInput('')}>
                      <Ionicons name="close-circle" size={22} color="#999999" />
                    </TouchableOpacity>
                  )}
                </View>

                {/* Search Results Dropdown */}
                {searchQuery.trim().length > 0 && (
                  <View style={styles.searchDropdown}>
                    {searchResults.length > 0 ? (
                      searchResults.map((result) => (
                        <View key={result.id} style={styles.resultItem}>
                          <View style={styles.resultInfo}>
                            <Text style={styles.resultName}>{result.name}</Text>
                            <View style={styles.resultMeta}>
                              <Ionicons name="location-outline" size={14} color="#666666" />
                              <Text style={styles.locationText}>{result.location}</Text>
                            </View>
                          </View>
                     {isIbanValid ? (
                       <View style={styles.claimButtonContainer}>
                         <LinearGradient
                           colors={['#34D399', '#10B981', '#10B981']}
                           start={{ x: 0, y: 0 }}
                           end={{ x: 1, y: 1 }}
                           style={styles.claimButtonGradient}
                         >
                           <TouchableOpacity 
                             style={styles.claimButton}
                             onPress={() => {
                               console.log('Starte Verifizierung für:', result.name, result.iban);
                               onRequestAccess();
                             }}
                             activeOpacity={0.9}
                           >
                             <Text style={styles.claimButtonText}>
                               Kontrollieren
                             </Text>
                           </TouchableOpacity>
                         </LinearGradient>
                       </View>
                     ) : (
                       <View style={styles.claimButtonDisabled}>
                         <TouchableOpacity 
                           style={styles.claimButton}
                           disabled
                           activeOpacity={1}
                         >
                           <Text style={[styles.claimButtonText, { color: '#9CA3AF' }]}>
                             Kontrollieren
                           </Text>
                         </TouchableOpacity>
                       </View>
                     )}
                        </View>
                      ))
                    ) : (
                      <View style={styles.noResultsContainer}>
                        <Ionicons name="card-outline" size={40} color="#CCCCCC" />
                        <Text style={styles.noResultsTitle}>IBAN nicht gefunden</Text>
                        <Text style={styles.noResultsText}>
                          Diese IBAN ist noch nicht im System.{'\n'}Lege jetzt ein Profil an.
                        </Text>
                        <TouchableOpacity 
                          style={styles.createProfileButton}
                          onPress={onRequestAccess}
                        >
                          <Ionicons name="add-circle-outline" size={20} color="#3B82F6" />
                          <Text style={styles.createProfileButtonText}>Neues Profil anlegen</Text>
                        </TouchableOpacity>
                      </View>
                    )}
                  </View>
                )}
              </View>
              
              <Text style={styles.searchHint}>
                💡 Für Firmensuche nutze die normale Suchfunktion
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
                      color={feature.isPrimary ? '#3B82F6' : '#666666'}
                    />
                  </View>
                  <Text style={styles.featureTitle}>{feature.title}</Text>
                  <Text style={styles.featureDescription}>{feature.description}</Text>
                </View>
              ))}
            </View>

            {/* Why Business Section */}
            <View style={styles.whySection}>
              <Text style={styles.sectionTitle}>Warum Business?</Text>
              
              <View style={styles.reasonCard}>
                <Ionicons name="shield-checkmark" size={24} color="#3B82F6" />
                <View style={styles.reasonContent}>
                  <Text style={styles.reasonTitle}>Kontrolliere dein Image</Text>
                  <Text style={styles.reasonText}>
                    Deine Bewertungen sind öffentlich – mit Business kannst du dein Profil aktiv gestalten.
                  </Text>
                </View>
              </View>

              <View style={styles.reasonCard}>
                <Ionicons name="trending-up" size={24} color="#3B82F6" />
                <View style={styles.reasonContent}>
                  <Text style={styles.reasonTitle}>Leads generieren</Text>
                  <Text style={styles.reasonText}>
                    Interessenten sehen deine Erfolgsrate – verwandle sie mit Kontaktoptionen in Kunden.
                  </Text>
                </View>
              </View>

              <View style={styles.reasonCard}>
                <Ionicons name="eye" size={24} color="#3B82F6" />
                <View style={styles.reasonContent}>
                  <Text style={styles.reasonTitle}>Daten nutzen</Text>
                  <Text style={styles.reasonText}>
                    Sieh wer dein Profil besucht, welche Kontakte geklickt werden und wie du performst.
                  </Text>
                </View>
              </View>
            </View>

            {/* Price Section */}
            <View style={styles.priceSection}>
              <View style={styles.priceBox}>
                <Text style={styles.priceLabel}>Business-Abo</Text>
                <View style={styles.priceRow}>
                  <Text style={styles.priceAmount}>49€</Text>
                  <Text style={styles.pricePeriod}>/Monat</Text>
                </View>
                <Text style={styles.priceDescription}>
                  Jederzeit kündbar. Keine versteckten Kosten.
                </Text>
              </View>
              
              <View style={styles.proIncludedBadge}>
                <Ionicons name="checkmark-circle" size={16} color="#3B82F6" />
                <Text style={styles.proIncludedText}>Inkl. aller Pro-Features</Text>
              </View>
            </View>

            {/* Trust Elements */}
            <View style={styles.trustSection}>
              <View style={styles.trustItem}>
                <Ionicons name="shield-checkmark" size={18} color="#10B981" />
                <Text style={styles.trustText}>Keine Vertragsbindung</Text>
              </View>
              <View style={styles.trustItem}>
                <Ionicons name="speedometer" size={18} color="#10B981" />
                <Text style={styles.trustText}>Sofort aktiv</Text>
              </View>
              <View style={styles.trustItem}>
                <Ionicons name="people" size={18} color="#10B981" />
                <Text style={styles.trustText}>Transparente Bewertungen</Text>
              </View>
            </View>

            {/* CTA Button am Ende */}
            <View style={styles.ctaButtonContainer}>
              <LinearGradient
                colors={['#3B82F6', '#2563EB', '#1D4ED8']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.ctaButtonGradient}
              >
                <TouchableOpacity 
                  style={styles.ctaButton}
                  onPress={scrollToSearch}
                  activeOpacity={0.9}
                >
                  <Ionicons name="briefcase" size={20} color="#FFFFFF" style={{ marginRight: 8 }} />
                  <Text style={styles.ctaButtonText}>Profil übernehmen</Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>

            {/* Bottom Spacer für Tab Bar */}
            <View style={{ height: 120 }} />
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
    paddingBottom: 20,
  },
  hero: {
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 48,
    paddingHorizontal: 20,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.2)',
  },
  badgeText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#3B82F6',
  },
  proIncludedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: 'rgba(59, 130, 246, 0.05)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.1)',
  },
  proIncludedText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#3B82F6',
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
    fontWeight: '600',
    color: '#666666',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },
  searchContainer: {
    width: '100%',
    position: 'relative',
    zIndex: 1000,
  },
  searchHint: {
    fontSize: 13,
    fontWeight: '500',
    color: '#999999',
    textAlign: 'center',
    marginTop: 16,
    fontStyle: 'italic',
  },
  searchInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#3B82F6',
    paddingHorizontal: 20,
    height: 64,
    width: '100%',
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 8,
  },
  searchInputWrapperValid: {
    borderColor: '#10B981',
    shadowColor: '#10B981',
  },
  validIcon: {
    marginLeft: 8,
  },
  searchInlineIcon: {
    marginRight: 16,
  },
  ibanPrefixContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  ibanPrefix: {
    fontSize: 17,
    fontWeight: '700',
    color: '#000000',
    marginRight: 4,
  },
  searchInlineInput: {
    flex: 1,
    fontSize: 17,
    fontWeight: '600',
    color: '#000000',
  },
  searchDropdown: {
    marginTop: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 8,
    overflow: 'hidden',
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  resultInfo: {
    flex: 1,
    marginRight: 12,
  },
  resultName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 6,
  },
  resultMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  locationText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666666',
  },
  claimButtonContainer: {
    // Mittelweg Shadow
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 14,
    elevation: 100,
    borderRadius: 32,
  },
  claimButtonGradient: {
    borderRadius: 32,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    overflow: 'hidden',
  },
  claimButtonDisabled: {
    borderRadius: 32,
    backgroundColor: '#E5E7EB',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    overflow: 'hidden',
  },
  claimButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 32,
  },
  claimButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: -0.2,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
  noResultsContainer: {
    alignItems: 'center',
    padding: 32,
  },
  noResultsTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333333',
    marginTop: 16,
    marginBottom: 8,
  },
  noResultsText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#666666',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 20,
  },
  createProfileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#3B82F6',
  },
  createProfileButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#3B82F6',
  },
  featuresSection: {
    marginBottom: 48,
    gap: 16,
    paddingHorizontal: 20,
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
    borderColor: 'rgba(59, 130, 246, 0.2)',
    backgroundColor: 'rgba(59, 130, 246, 0.02)',
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
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
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
  whySection: {
    marginBottom: 48,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#000000',
    marginBottom: 24,
    letterSpacing: -0.5,
  },
  reasonCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    gap: 16,
  },
  reasonContent: {
    flex: 1,
  },
  reasonTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 6,
    letterSpacing: -0.3,
  },
  reasonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666666',
    lineHeight: 20,
  },
  priceSection: {
    marginBottom: 32,
    paddingHorizontal: 20,
  },
  priceBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  priceLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666666',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 8,
  },
  priceAmount: {
    fontSize: 48,
    fontWeight: '900',
    color: '#000000',
    letterSpacing: -2,
  },
  pricePeriod: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666666',
    marginLeft: 4,
  },
  priceDescription: {
    fontSize: 13,
    fontWeight: '500',
    color: '#999999',
    textAlign: 'center',
  },
  trustSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 20,
    marginBottom: 24,
    paddingHorizontal: 20,
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
  ctaButtonContainer: {
    paddingHorizontal: 20,
    marginTop: -10,
    marginBottom: -20,
    // Premium Shadow mit Glow-Effekt (wie TransFAB)
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 999,
    borderRadius: 32,
  },
  ctaButtonGradient: {
    borderRadius: 32,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    overflow: 'hidden',
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    borderRadius: 32,
  },
  ctaButtonText: {
    fontSize: 17,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -0.3,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});

