import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Clipboard,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export default function TrustBadgeScreen({ navigation }) {
  // Mock-Daten (später von API)
  const badgeData = {
    companyName: 'Dein Unternehmen',
    successRate: 94,
    reviewCount: 47,
    userId: 'abc123', // Unique ID für iframe URL
    lastUpdated: new Date().toLocaleDateString('de-DE'),
  };

  const getBadgeHTML = () => {
    const width = 280; // Standard-Breite
    const height = 336; // 1.2 Aspect Ratio
    
    return `<!-- Valuntir Trust-Badge -->
<iframe 
  src="https://valuntir.com/badge/${badgeData.userId}" 
  width="${width}" 
  height="${height}" 
  frameborder="0" 
  scrolling="no"
  title="Valuntir Trust-Badge"
></iframe>`;
  };

  const handleCopyCode = () => {
    Clipboard.setString(getBadgeHTML());
    Alert.alert(
      'Code kopiert! ✓',
      'Du kannst den HTML-Code jetzt in deine Website einfügen.',
      [{ text: 'OK' }]
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
            <Text style={styles.headerTitle}>Trust-Badge</Text>
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
                Zeige deine Erfolgsquote auf deiner Website
              </Text>
              <Text style={styles.heroSubtitle}>
                Baue Vertrauen auf mit einem verifizierten Badge, das deine 
                tatsächliche Leistung transparent darstellt.
              </Text>
            </View>

            {/* Live Vorschau */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Live-Vorschau</Text>
              
              <View style={styles.badgePreview}>
                {/* Badge Content */}
                <View style={styles.badge}>
                  {/* V-Logo als Wasserzeichen */}
                  <Image 
                    source={require('../../assets/V - transparent.png')}
                    style={styles.watermarkLogo}
                    resizeMode="contain"
                  />
                  
                  {/* Main Content */}
                  <View style={styles.badgeContent}>
                    {/* Erfolgsquote - die Zahl ist das Wichtigste */}
                    <Text style={styles.successRate}>
                      {badgeData.successRate}%
                    </Text>
                    
                    <Text style={styles.successRateLabel}>
                      Erfolgsquote
                    </Text>
                    
                    {/* Valuntir Brand */}
                    <View style={styles.brandContainer}>
                      <Text style={styles.brandText}>
                        Valuntir
                      </Text>
                    </View>
                    
                    {/* Proof - minimalistisch */}
                    <View style={styles.proofContainer}>
                      <Text style={styles.proofText}>
                        {badgeData.reviewCount} Bewertungen
                      </Text>
                      <Text style={styles.proofDivider}>
                        •
                      </Text>
                      <Text style={styles.proofText}>
                        {badgeData.lastUpdated}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>

            {/* HTML Code */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>HTML-Code</Text>
              
              <View style={styles.codeCard}>
                <View style={styles.codeHeader}>
                  <Ionicons name="code-slash" size={18} color="#666" />
                  <Text style={styles.codeTitle}>Füge diesen Code in deine Website ein</Text>
                </View>
                
                <View style={styles.codeBlock}>
                  <Text style={styles.codeText}>{getBadgeHTML()}</Text>
                </View>
                
                <TouchableOpacity 
                  style={styles.copyButton}
                  onPress={handleCopyCode}
                >
                  <Ionicons name="copy-outline" size={20} color="#FFFFFF" />
                  <Text style={styles.copyButtonText}>Code kopieren</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Info Boxen */}
            <View style={styles.infoSection}>
              <View style={styles.infoCard}>
                <Ionicons name="shield-checkmark" size={20} color="#10B981" />
                <View style={styles.infoTextContainer}>
                  <Text style={styles.infoTitle}>Vertrauenswürdig & verifiziert</Text>
                  <Text style={styles.infoText}>
                    Nur echte, verifizierte Daten. Der Badge ist klickbar und führt direkt zu deinem Valuntir-Profil.
                  </Text>
                </View>
              </View>

              <View style={styles.infoCard}>
                <Ionicons name="sync" size={20} color="#3B82F6" />
                <View style={styles.infoTextContainer}>
                  <Text style={styles.infoTitle}>Automatisch aktualisiert</Text>
                  <Text style={styles.infoText}>
                    Zeigt immer deine aktuelle Erfolgsquote. Keine manuelle Pflege nötig.
                  </Text>
                </View>
              </View>

              <View style={styles.infoCard}>
                <Ionicons name="flash" size={20} color="#F59E0B" />
                <View style={styles.infoTextContainer}>
                  <Text style={styles.infoTitle}>Schnell & leichtgewichtig</Text>
                  <Text style={styles.infoText}>
                    Beeinflusst die Ladezeit deiner Website nicht. Optimiert für Performance.
                  </Text>
                </View>
              </View>
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
    marginBottom: 32,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#000',
    marginBottom: 12,
    textAlign: 'center',
    lineHeight: 32,
    paddingHorizontal: 20,
  },
  heroSubtitle: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    marginBottom: 16,
  },
  badgePreview: {
    alignItems: 'center',
    paddingVertical: 48,
    paddingHorizontal: 24,
  },
  badgePreviewDark: {
    // Kein extra Styling mehr nötig
  },
  badge: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 32,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    width: '100%',
    maxWidth: 280,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 12,
    position: 'relative',
    alignItems: 'center',
  },
  badgeDark: {
    backgroundColor: '#1F2937',
    borderColor: '#374151',
  },
  badgeSmall: {
    maxWidth: 240,
    padding: 24,
  },
  badgeLarge: {
    maxWidth: 320,
    padding: 40,
  },
  watermarkLogo: {
    position: 'absolute',
    width: '140%',
    height: '140%',
    opacity: 0.03,
    alignSelf: 'center',
    top: '0%', // Vertikal zentriert
  },
  watermarkLogoDark: {
    opacity: 0.08,
  },
  badgeContent: {
    alignItems: 'center',
    zIndex: 1,
  },
  successRate: {
    fontSize: 56,
    fontWeight: '900',
    color: '#000',
    letterSpacing: -2,
    marginBottom: 4,
  },
  successRateDark: {
    color: '#FFFFFF',
  },
  successRateLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 16,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  successRateLabelDark: {
    color: '#9CA3AF',
  },
  brandContainer: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 16,
  },
  brandContainerDark: {
    borderColor: '#374151',
  },
  brandText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    letterSpacing: 0.5,
  },
  brandTextDark: {
    color: '#FFFFFF',
  },
  proofContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  proofText: {
    fontSize: 10,
    color: '#999',
    fontWeight: '500',
  },
  proofTextDark: {
    color: '#6B7280',
  },
  proofDivider: {
    fontSize: 10,
    color: '#CCC',
  },
  proofDividerDark: {
    color: '#4B5563',
  },
  optionGroup: {
    marginBottom: 20,
  },
  optionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    marginBottom: 12,
  },
  optionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  optionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  optionButtonActive: {
    backgroundColor: '#FFFFFF',
    borderColor: '#000',
  },
  optionButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  optionButtonTextActive: {
    color: '#000',
  },
  codeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.06)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  codeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  codeTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#666',
  },
  codeBlock: {
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  codeText: {
    fontSize: 11,
    fontFamily: 'monospace',
    color: '#374151',
    lineHeight: 16,
  },
  copyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#000',
    paddingVertical: 14,
    borderRadius: 28,
  },
  copyButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  infoSection: {
    gap: 12,
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.06)',
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 1,
  },
  infoTextContainer: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#000',
    marginBottom: 4,
  },
  infoText: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
  },
});

