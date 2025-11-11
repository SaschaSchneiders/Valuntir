import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Share,
  Clipboard,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import QRCode from 'react-native-qrcode-svg';

export default function InviteFriendsScreen({ navigation }) {
  const [copiedLink, setCopiedLink] = useState(false);
  
  // User-spezifischer Einladungslink (später dynamisch)
  const referralLink = 'https://valuntir.com/invite/abc123xyz';
  
  const handleCopyLink = () => {
    Clipboard.setString(referralLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Nutze Valuntir für echte Erfolgsquoten! Melde dich über meinen Link an und wir profitieren beide davon:\n\n${referralLink}`,
        title: 'Valuntir einladen',
      });
    } catch (error) {
      console.error(error);
    }
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
            <Text style={styles.headerTitle}>Freunde einladen</Text>
            <View style={styles.headerSpacer} />
          </View>

          <ScrollView 
            style={styles.content}
            contentContainerStyle={styles.contentContainer}
            showsVerticalScrollIndicator={false}
          >
            {/* Hero */}
            <View style={styles.heroSection}>
              <Text style={styles.heroHeadline}>FREUNDE EINLADEN</Text>
              <Text style={styles.heroSubheadline}>Gemeinsam profitieren</Text>
            </View>

            {/* Intro */}
            <View style={styles.introSection}>
              <Text style={styles.introText}>
                Lade deine Freunde zu Valuntir ein und ihr profitiert beide. 
                Du erhältst 10% des Abo-Preises deiner eingeladenen Freunde, 
                solange sie aktiv sind. Automatisch und unbegrenzt.
              </Text>
            </View>

            {/* Einladungslink & QR-Code */}
            <View style={styles.linkSection}>
              <Text style={styles.sectionTitle}>Dein Einladungslink</Text>
              
              <View style={styles.linkCard}>
                <View style={styles.linkTextContainer}>
                  <Text style={styles.linkText} numberOfLines={1}>{referralLink}</Text>
                </View>
                <TouchableOpacity 
                  style={styles.copyButton}
                  onPress={handleCopyLink}
                >
                  <Ionicons 
                    name={copiedLink ? "checkmark" : "copy-outline"} 
                    size={20} 
                    color={copiedLink ? "#10B981" : "#3B82F6"} 
                  />
                  <Text style={[styles.copyButtonText, copiedLink && styles.copiedText]}>
                    {copiedLink ? "Kopiert!" : "Link kopieren"}
                  </Text>
                </TouchableOpacity>
              </View>

              {/* QR Code */}
              <View style={styles.qrSection}>
                <Text style={styles.qrTitle}>Oder einfach scannen</Text>
                <View style={styles.qrContainer}>
                  <QRCode
                    value={referralLink}
                    size={180}
                    backgroundColor="#FFFFFF"
                    color="#000000"
                  />
                </View>
                <Text style={styles.qrDescription}>
                  QR-Code zeigen und direkt einladen
                </Text>
              </View>
            </View>

            {/* So funktioniert's */}
            <View style={styles.featuresSection}>
              <Text style={styles.sectionTitle}>So funktioniert's</Text>

              <View style={styles.featureCard}>
                <View style={styles.featureIcon}>
                  <Ionicons name="link" size={28} color="#3B82F6" />
                </View>
                <View style={styles.featureContent}>
                  <Text style={styles.featureTitle}>1. Link teilen</Text>
                  <Text style={styles.featureText}>
                    Sende deinen persönlichen Einladungslink an Freunde oder 
                    zeige ihnen den QR-Code.
                  </Text>
                </View>
              </View>

              <View style={styles.featureCard}>
                <View style={styles.featureIcon}>
                  <Ionicons name="person-add" size={28} color="#3B82F6" />
                </View>
                <View style={styles.featureContent}>
                  <Text style={styles.featureTitle}>2. Freund meldet sich an</Text>
                  <Text style={styles.featureText}>
                    Dein Freund registriert sich über deinen Link und schließt 
                    ein Abo ab.
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
                    Du erhältst automatisch 10% seines monatlichen Abo-Preises. 
                    Dauerhaft, solange er aktiv bleibt.
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
                  <Text style={styles.calculationLabel}>Freund mit Pro-Abo:</Text>
                  <Text style={styles.calculationValue}>4,90 €/Monat</Text>
                </View>
                
                <View style={styles.calculationRow}>
                  <Text style={styles.calculationLabel}>Deine Provision (10%):</Text>
                  <Text style={styles.calculationHighlight}>0,49 €/Monat</Text>
                </View>
                
                <View style={styles.calculationDivider} />
                
                <View style={styles.calculationResult}>
                  <Text style={styles.calculationResultLabel}>Bei 10 eingeladenen Freunden:</Text>
                  <Text style={styles.calculationResultValue}>4,90 €/Monat</Text>
                  <Text style={styles.calculationResultYear}>58,80 € pro Jahr</Text>
                </View>
              </LinearGradient>
            </View>

            {/* Share Buttons */}
            <View style={styles.shareSection}>
              <TouchableOpacity 
                style={styles.shareButton}
                onPress={handleShare}
              >
                <Ionicons name="share-social" size={22} color="#FFFFFF" />
                <Text style={styles.shareButtonText}>Link teilen</Text>
              </TouchableOpacity>
            </View>

            {/* Important Note */}
            <View style={styles.noteCard}>
              <Ionicons name="information-circle" size={20} color="#666" />
              <Text style={styles.noteText}>
                Deine Provision wird automatisch gutgeschrieben, sobald dein 
                eingeladener Freund ein Abo abschließt. Die Provision läuft 
                unbegrenzt, solange beide Accounts aktiv sind.
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
  introSection: {
    marginBottom: 40,
  },
  introText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    lineHeight: 26,
  },
  linkSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
    marginBottom: 20,
  },
  linkCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  linkTextContainer: {
    backgroundColor: '#F5F5F5',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  linkText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3B82F6',
  },
  copyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  copyButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#3B82F6',
  },
  copiedText: {
    color: '#10B981',
  },
  qrSection: {
    alignItems: 'center',
  },
  qrTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    marginBottom: 20,
  },
  qrContainer: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: '#E5E5E5',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 3,
  },
  qrDescription: {
    fontSize: 14,
    fontWeight: '500',
    color: '#999',
    textAlign: 'center',
  },
  featuresSection: {
    marginBottom: 32,
  },
  featureCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
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
  shareSection: {
    marginBottom: 24,
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3B82F6',
    borderRadius: 28,
    paddingVertical: 18,
    paddingHorizontal: 32,
    gap: 12,
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 4,
  },
  shareButtonText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  noteCard: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
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
