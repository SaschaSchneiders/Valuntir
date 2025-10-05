import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import PrimaryButton from '../shared/PrimaryButton';

export default function ProfileScreen() {
  const navigation = useNavigation();
  const [isPublicView, setIsPublicView] = useState(false);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#F8F9FA', '#FFFFFF', '#F8F9FA']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <SafeAreaView style={styles.safeArea} edges={['top']}>
          <ScrollView contentContainerStyle={styles.content}>
            {/* Profil Card */}
            <View style={styles.profileCard}>
              {/* Toggle - Absolut positioniert */}
              <View style={styles.toggleContainer}>
                <Switch
                  value={isPublicView}
                  onValueChange={setIsPublicView}
                  trackColor={{ false: '#D1D5DB', true: '#000000' }}
                  thumbColor="#FFFFFF"
                  style={{ transform: [{ scale: 0.65 }] }}
                />
                <Text style={styles.toggleLabel}>
                  {isPublicView ? 'Öffentlich' : 'Anbieter'}
                </Text>
              </View>

              {/* Settings Button - Absolut positioniert */}
              <TouchableOpacity 
                style={styles.settingsButton}
                onPress={() => navigation.navigate('Settings')}
              >
                <Ionicons name="settings-outline" size={20} color="#666" />
              </TouchableOpacity>

              <View style={styles.avatarContainer}>
                <View style={styles.avatar}>
                  <Ionicons name="business" size={48} color="#FFFFFF" />
                </View>
              </View>

              <Text style={styles.companyName}>Beratungszentrum Nord GmbH</Text>
              <Text style={styles.username}>@beratungszentrum_nord</Text>
              <View style={styles.branchBadge}>
                <Ionicons name="briefcase-outline" size={14} color="#666" />
                <Text style={styles.branchText}>Unternehmensberatung</Text>
              </View>
            </View>

            {/* Öffentliche Stats - nur im öffentlichen Modus */}
            {isPublicView && (
              <>
                <View style={styles.publicStatsCard}>
                  <View style={styles.publicStatRow}>
                    <View style={styles.publicStatItem}>
                      <Text style={styles.publicStatNumber}>23</Text>
                      <Text style={styles.publicStatLabel}>Projekte</Text>
                    </View>
                    <View style={styles.publicStatDivider} />
                    <View style={styles.publicStatItem}>
                      <Text style={styles.publicStatNumber}>87%</Text>
                      <Text style={styles.publicStatLabel}>Erfolgsquote</Text>
                    </View>
                  </View>
                </View>

                {/* Bewertungsverteilung */}
                <View style={styles.ratingCard}>
                  <Text style={styles.cardTitle}>Bewertungsverteilung</Text>
                  
                  <View style={styles.ratingItem}>
                    <View style={styles.ratingLeft}>
                      <Ionicons name="happy" size={20} color="#22C55E" />
                      <Text style={styles.ratingLabel}>Sehr zufrieden</Text>
                    </View>
                    <Text style={styles.ratingValue}>15</Text>
                  </View>

                  <View style={styles.ratingItem}>
                    <View style={styles.ratingLeft}>
                      <Ionicons name="happy-outline" size={20} color="#84CC16" />
                      <Text style={styles.ratingLabel}>Zufrieden</Text>
                    </View>
                    <Text style={styles.ratingValue}>3</Text>
                  </View>

                  <View style={styles.ratingItem}>
                    <View style={styles.ratingLeft}>
                      <Ionicons name="remove-circle-outline" size={20} color="#F59E0B" />
                      <Text style={styles.ratingLabel}>Neutral</Text>
                    </View>
                    <Text style={styles.ratingValue}>1</Text>
                  </View>

                  <View style={styles.ratingItem}>
                    <View style={styles.ratingLeft}>
                      <Ionicons name="sad-outline" size={20} color="#EF4444" />
                      <Text style={styles.ratingLabel}>Unzufrieden</Text>
                    </View>
                    <Text style={styles.ratingValue}>1</Text>
                  </View>
                </View>
              </>
            )}

            {/* Pflichtangaben - nur im Anbieter-Modus */}
            {!isPublicView && (
              <>
                <View style={styles.menuCard}>
                  <View style={styles.cardTitleRow}>
                    <Text style={styles.cardTitle}>Pflichtangaben</Text>
                    <View style={styles.requiredBadge}>
                      <Text style={styles.requiredText}>Erforderlich</Text>
                    </View>
                  </View>
                  
                  <TouchableOpacity style={styles.menuItem}>
                    <View style={styles.menuLeft}>
                      <View style={styles.menuIconContainer}>
                        <Ionicons name="business-outline" size={20} color="#000" />
                      </View>
                      <Text style={styles.menuText}>Firmenname</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color="#999" />
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.menuItem}>
                    <View style={styles.menuLeft}>
                      <View style={styles.menuIconContainer}>
                        <Ionicons name="briefcase-outline" size={20} color="#000" />
                      </View>
                      <Text style={styles.menuText}>Branche</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color="#999" />
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.menuItem}>
                    <View style={styles.menuLeft}>
                      <View style={styles.menuIconContainer}>
                        <Ionicons name="location-outline" size={20} color="#000" />
                      </View>
                      <Text style={styles.menuText}>Standort</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color="#999" />
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.menuItem}>
                    <View style={styles.menuLeft}>
                      <View style={styles.menuIconContainer}>
                        <Ionicons name="document-text-outline" size={20} color="#000" />
                      </View>
                      <View>
                        <Text style={styles.menuText}>Kurzbeschreibung</Text>
                        <Text style={styles.menuSubtext}>Max. 200 Zeichen</Text>
                      </View>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color="#999" />
                  </TouchableOpacity>

                  <TouchableOpacity style={[styles.menuItem, styles.menuItemLast]}>
                    <View style={styles.menuLeft}>
                      <View style={styles.menuIconContainer}>
                        <Ionicons name="image-outline" size={20} color="#000" />
                      </View>
                      <Text style={styles.menuText}>Logo hochladen</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color="#999" />
                  </TouchableOpacity>
                </View>

                {/* Kontaktinformationen */}
                <View style={styles.menuCard}>
                  <Text style={styles.cardTitle}>Kontakt</Text>
                  
                  <TouchableOpacity style={styles.menuItem}>
                    <View style={styles.menuLeft}>
                      <View style={styles.menuIconContainer}>
                        <Ionicons name="globe-outline" size={20} color="#000" />
                      </View>
                      <Text style={styles.menuText}>Webseite</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color="#999" />
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.menuItem}>
                    <View style={styles.menuLeft}>
                      <View style={styles.menuIconContainer}>
                        <Ionicons name="mail-outline" size={20} color="#000" />
                      </View>
                      <Text style={styles.menuText}>E-Mail</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color="#999" />
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.menuItem}>
                    <View style={styles.menuLeft}>
                      <View style={styles.menuIconContainer}>
                        <Ionicons name="call-outline" size={20} color="#000" />
                      </View>
                      <Text style={styles.menuText}>Telefon</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color="#999" />
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.menuItem}>
                    <View style={styles.menuLeft}>
                      <View style={styles.menuIconContainer}>
                        <Ionicons name="logo-whatsapp" size={20} color="#000" />
                      </View>
                      <Text style={styles.menuText}>WhatsApp</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color="#999" />
                  </TouchableOpacity>

                  <TouchableOpacity style={[styles.menuItem, styles.menuItemLast]}>
                    <View style={styles.menuLeft}>
                      <View style={styles.menuIconContainer}>
                        <Ionicons name="calendar-outline" size={20} color="#000" />
                      </View>
                      <Text style={styles.menuText}>Kalender-Link</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color="#999" />
                  </TouchableOpacity>
                </View>

                {/* Social Media */}
                <View style={styles.menuCard}>
                  <Text style={styles.cardTitle}>Social Media</Text>
                  
                  <TouchableOpacity style={styles.menuItem}>
                    <View style={styles.menuLeft}>
                      <View style={styles.menuIconContainer}>
                        <Ionicons name="logo-linkedin" size={20} color="#000" />
                      </View>
                      <Text style={styles.menuText}>LinkedIn</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color="#999" />
                  </TouchableOpacity>

                  <TouchableOpacity style={[styles.menuItem, styles.menuItemLast]}>
                    <View style={styles.menuLeft}>
                      <View style={styles.menuIconContainer}>
                        <Ionicons name="logo-instagram" size={20} color="#000" />
                      </View>
                      <Text style={styles.menuText}>Instagram</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color="#999" />
                  </TouchableOpacity>
                </View>

                {/* Keywords */}
                <View style={styles.menuCard}>
                  <Text style={styles.cardTitle}>Sichtbarkeit</Text>
                  
                  <TouchableOpacity style={styles.menuItem}>
                    <View style={styles.menuLeft}>
                      <View style={styles.menuIconContainer}>
                        <Ionicons name="pricetag-outline" size={20} color="#000" />
                      </View>
                      <View>
                        <Text style={styles.menuText}>Such-Keywords</Text>
                        <Text style={styles.menuSubtext}>Max. 8-10 Stichworte</Text>
                      </View>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color="#999" />
                  </TouchableOpacity>

                  <TouchableOpacity style={[styles.menuItem, styles.menuItemLast]}>
                    <View style={styles.menuLeft}>
                      <View style={styles.menuIconContainer}>
                        <Ionicons name="at-outline" size={20} color="#000" />
                      </View>
                      <Text style={styles.menuText}>Benutzername</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color="#999" />
                  </TouchableOpacity>
                </View>
              </>
            )}

            {/* Platz für TabBar */}
            <View style={{ height: 100 }} />
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
  content: {
    padding: 20,
  },
  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  toggleContainer: {
    position: 'absolute',
    top: 12,
    left: 12,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingHorizontal: 6,
    paddingVertical: 4,
    zIndex: 10,
  },
  toggleLabel: {
    fontSize: 9,
    color: '#666',
    marginTop: 2,
    fontWeight: '600',
  },
  settingsButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  avatarContainer: {
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  companyName: {
    fontSize: 22,
    fontWeight: '800',
    color: '#000000',
    marginBottom: 6,
    textAlign: 'center',
  },
  username: {
    fontSize: 15,
    color: '#666666',
    marginBottom: 12,
    fontWeight: '500',
  },
  branchBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    gap: 6,
  },
  branchText: {
    fontSize: 13,
    color: '#666',
    fontWeight: '600',
  },
  publicStatsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  publicStatRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  publicStatItem: {
    flex: 1,
    alignItems: 'center',
  },
  publicStatNumber: {
    fontSize: 32,
    fontWeight: '800',
    color: '#000000',
    marginBottom: 4,
  },
  publicStatLabel: {
    fontSize: 13,
    color: '#666',
    fontWeight: '500',
  },
  publicStatDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#E5E5E5',
  },
  ratingCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 16,
  },
  cardTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  requiredBadge: {
    backgroundColor: '#FEF3C7',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  requiredText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#D97706',
  },
  ratingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  ratingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  ratingLabel: {
    fontSize: 15,
    color: '#333',
    fontWeight: '500',
  },
  ratingValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000000',
  },
  menuCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  menuItemLast: {
    borderBottomWidth: 0,
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  menuIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuText: {
    fontSize: 15,
    color: '#000',
    fontWeight: '500',
  },
  menuSubtext: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
});
