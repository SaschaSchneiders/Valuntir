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

export default function InviteFriendsScreen({ navigation }) {
  const [copied, setCopied] = useState(false);
  const referralCode = 'VALUNTIR2024';
  const referralLink = 'https://valuntir.app/ref/VALUNTIR2024';

  const handleCopyCode = () => {
    Clipboard.setString(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Probiere Valuntir aus – Die Plattform für transparente Geschäftsbeziehungen! Nutze meinen Code: ${referralCode}\n\n${referralLink}`,
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
          </View>

          <ScrollView 
            style={styles.content}
            contentContainerStyle={styles.contentContainer}
            showsVerticalScrollIndicator={false}
          >
            {/* Hero */}
            <View style={styles.heroSection}>
              <View style={styles.emojiContainer}>
                <Text style={styles.emoji}>🎁</Text>
              </View>
              <Text style={styles.headline}>
                Freunde einladen & profitieren
              </Text>
              <Text style={styles.subheadline}>
                Teile Valuntir mit deinem Netzwerk und erhalte exklusive Vorteile
              </Text>
            </View>

            {/* Referral Code Card */}
            <View style={styles.codeCard}>
              <Text style={styles.codeLabel}>Dein persönlicher Einladungscode</Text>
              <View style={styles.codeContainer}>
                <Text style={styles.codeText}>{referralCode}</Text>
                <TouchableOpacity 
                  style={styles.copyButton}
                  onPress={handleCopyCode}
                >
                  <Ionicons 
                    name={copied ? "checkmark" : "copy-outline"} 
                    size={20} 
                    color={copied ? "#10B981" : "#3B82F6"} 
                  />
                  <Text style={[styles.copyButtonText, copied && styles.copiedText]}>
                    {copied ? "Kopiert!" : "Kopieren"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Benefits */}
            <View style={styles.benefitsSection}>
              <Text style={styles.sectionTitle}>Was du bekommst</Text>
              
              <View style={styles.benefitCard}>
                <View style={styles.benefitIcon}>
                  <Ionicons name="gift" size={28} color="#3B82F6" />
                </View>
                <View style={styles.benefitContent}>
                  <Text style={styles.benefitTitle}>Pro-Features für 1 Monat</Text>
                  <Text style={styles.benefitText}>
                    Für jeden Freund, der sich mit deinem Code registriert
                  </Text>
                </View>
              </View>

              <View style={styles.benefitCard}>
                <View style={styles.benefitIcon}>
                  <Ionicons name="people" size={28} color="#10B981" />
                </View>
                <View style={styles.benefitContent}>
                  <Text style={styles.benefitTitle}>Exklusiver Zugang</Text>
                  <Text style={styles.benefitText}>
                    Ab 5 Einladungen: Zugang zu Premium-Features
                  </Text>
                </View>
              </View>

              <View style={styles.benefitCard}>
                <View style={styles.benefitIcon}>
                  <Ionicons name="trophy" size={28} color="#F59E0B" />
                </View>
                <View style={styles.benefitContent}>
                  <Text style={styles.benefitTitle}>VIP-Status</Text>
                  <Text style={styles.benefitText}>
                    Ab 10 Einladungen: Lebenslanger Pro-Account
                  </Text>
                </View>
              </View>
            </View>

            {/* How it works */}
            <View style={styles.howItWorksSection}>
              <Text style={styles.sectionTitle}>So funktioniert's</Text>
              
              <View style={styles.stepsList}>
                <View style={styles.stepItem}>
                  <View style={styles.stepNumber}>
                    <Text style={styles.stepNumberText}>1</Text>
                  </View>
                  <Text style={styles.stepText}>Teile deinen Einladungscode mit Freunden</Text>
                </View>

                <View style={styles.stepItem}>
                  <View style={styles.stepNumber}>
                    <Text style={styles.stepNumberText}>2</Text>
                  </View>
                  <Text style={styles.stepText}>Deine Freunde registrieren sich mit dem Code</Text>
                </View>

                <View style={styles.stepItem}>
                  <View style={styles.stepNumber}>
                    <Text style={styles.stepNumberText}>3</Text>
                  </View>
                  <Text style={styles.stepText}>Ihr beide erhaltet automatisch eure Prämien</Text>
                </View>
              </View>
            </View>

            {/* Share Button */}
            <TouchableOpacity 
              style={styles.shareButton}
              onPress={handleShare}
            >
              <Ionicons name="share-social" size={22} color="#FFFFFF" />
              <Text style={styles.shareButtonText}>Jetzt teilen</Text>
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
  emojiContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  emoji: {
    fontSize: 40,
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
  codeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    marginBottom: 32,
    borderWidth: 2,
    borderColor: '#3B82F6',
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 4,
  },
  codeLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#666',
    textAlign: 'center',
    marginBottom: 12,
  },
  codeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
  },
  codeText: {
    fontSize: 20,
    fontWeight: '800',
    color: '#000',
    letterSpacing: 2,
  },
  copyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  copyButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#3B82F6',
  },
  copiedText: {
    color: '#10B981',
  },
  benefitsSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
    marginBottom: 20,
  },
  benefitCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    gap: 16,
  },
  benefitIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  benefitContent: {
    flex: 1,
    justifyContent: 'center',
  },
  benefitTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    marginBottom: 4,
  },
  benefitText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
    lineHeight: 20,
  },
  howItWorksSection: {
    marginBottom: 32,
  },
  stepsList: {
    gap: 16,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  stepNumber: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepNumberText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  stepText: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: '#000',
    lineHeight: 22,
  },
  shareButton: {
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
  shareButtonText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});

