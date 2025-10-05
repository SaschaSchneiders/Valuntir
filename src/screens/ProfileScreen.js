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
import InfoPopup from '../shared/InfoPopup';
import ProfileCard from '../shared/ProfileCard';
import ChartCard from '../shared/ChartCard';
import RateScale from '../shared/RateScale';

export default function ProfileScreen() {
  const navigation = useNavigation();
  const [isPublicView, setIsPublicView] = useState(false);
  
  // Chart Daten für öffentliche Ansicht
  const generateRealisticData = (numPoints, baseValue = 87) => {
    const data = [];
    let currentValue = baseValue;
    
    for (let i = 0; i < numPoints; i++) {
      const change = (Math.random() - 0.5) * 4;
      currentValue = Math.max(75, Math.min(95, currentValue + change));
      data.push(Math.round(currentValue * 10) / 10);
    }
    return data;
  };

  const timeframeData = {
    '14days': {
      data: generateRealisticData(14, 87),
      labels: Array.from({length: 14}, (_, i) => `T${i+1}`)
    },
    '30days': {
      data: generateRealisticData(30, 87),
      labels: Array.from({length: 30}, (_, i) => `T${i+1}`)
    },
    '90days': {
      data: generateRealisticData(90, 87),
      labels: Array.from({length: 90}, (_, i) => i % 7 === 0 ? `W${Math.floor(i/7)+1}` : '')
    },
    '6months': {
      data: generateRealisticData(182, 87),
      labels: Array.from({length: 182}, (_, i) => i % 30 === 0 ? `M${Math.floor(i/30)+1}` : '')
    },
    'year': {
      data: generateRealisticData(365, 87),
      labels: Array.from({length: 365}, (_, i) => i % 30 === 0 ? `M${Math.floor(i/30)+1}` : '')
    },
    'max': {
      data: generateRealisticData(730, 87),
      labels: Array.from({length: 730}, (_, i) => i % 182 === 0 ? `H${Math.floor(i/182)+1}` : '')
    }
  };

  const stats = [
    { value: '124', label: 'Projekte' },
    { value: '87%', label: 'Erfolgsquote' },
    { value: '4.8', label: 'Bewertung' },
  ];
  
  // Toggle States für Kontaktoptionen
  const [showDescription, setShowDescription] = useState(true);
  const [showWebsite, setShowWebsite] = useState(true);
  const [showEmail, setShowEmail] = useState(true);
  const [showPhone, setShowPhone] = useState(true);
  const [showWhatsApp, setShowWhatsApp] = useState(true);
  const [showCalendar, setShowCalendar] = useState(true);
  const [showLinkedIn, setShowLinkedIn] = useState(true);
  const [showInstagram, setShowInstagram] = useState(true);
  
  // Modal States
  const [activeModal, setActiveModal] = useState(null);
  const [inputValue, setInputValue] = useState('');
  
  // Gespeicherte Werte
  const [descriptionValue, setDescriptionValue] = useState('Wir sind Ihr kompetenter Partner für strategische Unternehmensberatung. Mit über 15 Jahren Erfahrung unterstützen wir mittelständische Unternehmen bei der digitalen Transformation und Prozessoptimierung.');
  const [websiteValue, setWebsiteValue] = useState('https://beratungszentrum-nord.de');
  const [emailValue, setEmailValue] = useState('kontakt@beratungszentrum-nord.de');
  const [phoneValue, setPhoneValue] = useState('+49 40 123456789');
  const [whatsAppValue, setWhatsAppValue] = useState('+49 40 123456789');
  const [calendarValue, setCalendarValue] = useState('https://calendly.com/beratungszentrum-nord');
  const [linkedInValue, setLinkedInValue] = useState('https://linkedin.com/company/beratungszentrum-nord');
  const [instagramValue, setInstagramValue] = useState('https://instagram.com/beratungszentrum.nord');
  const [changeRequestMessage, setChangeRequestMessage] = useState('');
  
  // Modal Handler
  const openModal = (type, currentValue = '') => {
    setActiveModal(type);
    setInputValue(currentValue);
  };
  
  const closeModal = () => {
    setActiveModal(null);
    setInputValue('');
  };
  
  const saveValue = () => {
    switch(activeModal) {
      case 'description':
        setDescriptionValue(inputValue);
        break;
      case 'website':
        setWebsiteValue(inputValue);
        break;
      case 'email':
        setEmailValue(inputValue);
        break;
      case 'phone':
        setPhoneValue(inputValue);
        break;
      case 'whatsapp':
        setWhatsAppValue(inputValue);
        break;
      case 'calendar':
        setCalendarValue(inputValue);
        break;
      case 'linkedin':
        setLinkedInValue(inputValue);
        break;
      case 'instagram':
        setInstagramValue(inputValue);
        break;
      case 'changeRequest':
        setChangeRequestMessage(inputValue);
        // Hier würde die Nachricht an den Valuntir Support gesendet werden
        console.log('Support-Anfrage für Unternehmensdaten-Änderung:', inputValue);
        // TODO: Backend API Call
        break;
    }
    closeModal();
  };
  
  const handleToggle = (type, currentState, setter, currentValue) => {
    if (!currentState) {
      openModal(type, currentValue);
      setter(true);
    } else {
      setter(false);
    }
  };

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
            <ProfileCard
              isPublicView={isPublicView}
              onToggleChange={setIsPublicView}
              onSettingsPress={() => navigation.navigate('Settings')}
              companyName="Beratungszentrum Nord GmbH"
              branch="Unternehmensberatung"
            />

            {/* Öffentliche Ansicht */}
            {isPublicView && (
              <>
                {/* Kurzbeschreibung */}
                {showDescription && descriptionValue && (
                  <View style={styles.publicSection}>
                    <Text style={styles.publicDescription}>{descriptionValue}</Text>
                  </View>
                )}

                {/* Chart & Statistiken */}
                <ChartCard 
                  timeframeData={timeframeData}
                  stats={stats}
                  title="Verlauf der Erfolgsquote"
                  defaultTimeframe="6months"
                />

                {/* Erfolgsquote Scale */}
                <RateScale 
                  rate={87} 
                  size="medium" 
                  showLabel={false}
                  title="Erfolgsquote"
                  totalRatings={124}
                />

                {/* Kontaktmöglichkeiten */}
                {(showEmail && emailValue) || (showPhone && phoneValue) || (showWhatsApp && whatsAppValue) ? (
                  <View style={styles.publicSection}>
                    <Text style={styles.publicSectionTitle}>Kontakt</Text>
                    
                    {showEmail && emailValue && (
                      <View style={styles.publicContactItem}>
                        <Ionicons name="mail-outline" size={20} color="#666" />
                        <Text style={styles.publicContactText}>{emailValue}</Text>
                      </View>
                    )}
                    
                    {showPhone && phoneValue && (
                      <View style={styles.publicContactItem}>
                        <Ionicons name="call-outline" size={20} color="#666" />
                        <Text style={styles.publicContactText}>{phoneValue}</Text>
                      </View>
                    )}
                    
                    {showWhatsApp && whatsAppValue && (
                      <View style={styles.publicContactItem}>
                        <Ionicons name="logo-whatsapp" size={20} color="#666" />
                        <Text style={styles.publicContactText}>{whatsAppValue}</Text>
                      </View>
                    )}
                  </View>
                ) : null}

                {/* Links */}
                {(showWebsite && websiteValue) || (showCalendar && calendarValue) ? (
                  <View style={styles.publicSection}>
                    <Text style={styles.publicSectionTitle}>Links</Text>
                    
                    {showWebsite && websiteValue && (
                      <TouchableOpacity style={styles.publicLinkItem}>
                        <Ionicons name="globe-outline" size={20} color="#000" />
                        <Text style={styles.publicLinkText}>Webseite</Text>
                        <Ionicons name="chevron-forward" size={20} color="#CCC" />
                      </TouchableOpacity>
                    )}
                    
                    {showCalendar && calendarValue && (
                      <TouchableOpacity style={styles.publicLinkItem}>
                        <Ionicons name="calendar-outline" size={20} color="#000" />
                        <Text style={styles.publicLinkText}>Termin buchen</Text>
                        <Ionicons name="chevron-forward" size={20} color="#CCC" />
                      </TouchableOpacity>
                    )}
                  </View>
                ) : null}

                {/* Social Media */}
                {(showLinkedIn && linkedInValue) || (showInstagram && instagramValue) ? (
                  <View style={styles.publicSection}>
                    <Text style={styles.publicSectionTitle}>Social Media</Text>
                    
                    <View style={styles.publicSocialRow}>
                      {showLinkedIn && linkedInValue && (
                        <TouchableOpacity style={styles.publicSocialButton}>
                          <Ionicons name="logo-linkedin" size={28} color="#0A66C2" />
                        </TouchableOpacity>
                      )}
                      
                      {showInstagram && instagramValue && (
                        <TouchableOpacity style={styles.publicSocialButton}>
                          <Ionicons name="logo-instagram" size={28} color="#E4405F" />
                        </TouchableOpacity>
                      )}
                    </View>
                  </View>
                ) : null}
              </>
            )}

            {/* Pflichtangaben - nur im Anbieter-Modus */}
            {!isPublicView && (
              <>
                <View style={styles.menuCard}>
                  <View style={styles.cardTitleRow}>
                    <Text style={styles.cardTitle}>Firmenprofil</Text>
                    <TouchableOpacity 
                      style={styles.editIconButton}
                      onPress={() => openModal('changeRequest', changeRequestMessage)}
                    >
                      <Ionicons name="pencil-outline" size={20} color="#666" />
                    </TouchableOpacity>
                  </View>
                  
                  {/* Read-Only Felder - bereits von Plattform definiert */}
                  <View style={styles.infoItem}>
                    <View style={styles.menuLeft}>
                      <View style={styles.menuIconContainer}>
                        <Ionicons name="business-outline" size={20} color="#000" />
                      </View>
                      <View>
                        <Text style={styles.infoLabel}>Firmenname</Text>
                        <Text style={styles.infoValue}>Beratungszentrum Nord GmbH</Text>
                      </View>
                    </View>
                  </View>

                  <View style={styles.infoItem}>
                    <View style={styles.menuLeft}>
                      <View style={styles.menuIconContainer}>
                        <Ionicons name="briefcase-outline" size={20} color="#000" />
                      </View>
                      <View>
                        <Text style={styles.infoLabel}>Branche</Text>
                        <Text style={styles.infoValue}>Unternehmensberatung</Text>
                      </View>
                    </View>
                  </View>

                  <View style={styles.infoItem}>
                    <View style={styles.menuLeft}>
                      <View style={styles.menuIconContainer}>
                        <Ionicons name="location-outline" size={20} color="#000" />
                      </View>
                      <View>
                        <Text style={styles.infoLabel}>Standort</Text>
                        <Text style={styles.infoValue}>Hamburg, Deutschland</Text>
                      </View>
                    </View>
                  </View>

                  {/* Editierbare Felder */}
                  <View style={styles.toggleItem}>
                    <View style={styles.menuLeft}>
                      <View style={styles.menuIconContainer}>
                        <Ionicons name="document-text-outline" size={20} color="#000" />
                      </View>
                      <View style={styles.menuTextContainer}>
                        <Text style={styles.menuText}>Kurzbeschreibung</Text>
                        {descriptionValue ? (
                          <Text style={styles.menuSubtext} numberOfLines={2}>
                            {descriptionValue}
                          </Text>
                        ) : (
                          <Text style={styles.menuSubtext}>Max. 200 Zeichen</Text>
                        )}
                      </View>
                    </View>
                    <Switch
                      value={showDescription}
                      onValueChange={() => handleToggle('description', showDescription, setShowDescription, descriptionValue)}
                      trackColor={{ false: '#D1D5DB', true: '#000000' }}
                      thumbColor="#FFFFFF"
                      style={{ transform: [{ scale: 0.8 }] }}
                    />
                  </View>

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

                {/* Keywords */}
                <View style={styles.menuCard}>
                  <Text style={styles.cardTitle}>Sichtbarkeit</Text>
                  
                  <TouchableOpacity style={[styles.menuItem, styles.menuItemLast]}>
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
                </View>

                {/* Kontaktinformationen */}
                <View style={styles.menuCard}>
                  <Text style={styles.cardTitle}>Kontakt</Text>
                  
                  <View style={styles.toggleItem}>
                    <View style={styles.menuLeft}>
                      <View style={styles.menuIconContainer}>
                        <Ionicons name="globe-outline" size={20} color="#000" />
                      </View>
                      <View style={styles.menuTextContainer}>
                        <Text style={styles.menuText}>Webseite</Text>
                        {websiteValue ? <Text style={styles.menuSubtext}>{websiteValue}</Text> : null}
                      </View>
                    </View>
                    <Switch
                      value={showWebsite}
                      onValueChange={() => handleToggle('website', showWebsite, setShowWebsite, websiteValue)}
                      trackColor={{ false: '#D1D5DB', true: '#000000' }}
                      thumbColor="#FFFFFF"
                      style={{ transform: [{ scale: 0.8 }] }}
                    />
                  </View>

                  <View style={styles.toggleItem}>
                    <View style={styles.menuLeft}>
                      <View style={styles.menuIconContainer}>
                        <Ionicons name="mail-outline" size={20} color="#000" />
                      </View>
                      <View style={styles.menuTextContainer}>
                        <Text style={styles.menuText}>E-Mail</Text>
                        {emailValue ? <Text style={styles.menuSubtext}>{emailValue}</Text> : null}
                      </View>
                    </View>
                    <Switch
                      value={showEmail}
                      onValueChange={() => handleToggle('email', showEmail, setShowEmail, emailValue)}
                      trackColor={{ false: '#D1D5DB', true: '#000000' }}
                      thumbColor="#FFFFFF"
                      style={{ transform: [{ scale: 0.8 }] }}
                    />
                  </View>

                  <View style={styles.toggleItem}>
                    <View style={styles.menuLeft}>
                      <View style={styles.menuIconContainer}>
                        <Ionicons name="call-outline" size={20} color="#000" />
                      </View>
                      <View style={styles.menuTextContainer}>
                        <Text style={styles.menuText}>Telefon</Text>
                        {phoneValue ? <Text style={styles.menuSubtext}>{phoneValue}</Text> : null}
                      </View>
                    </View>
                    <Switch
                      value={showPhone}
                      onValueChange={() => handleToggle('phone', showPhone, setShowPhone, phoneValue)}
                      trackColor={{ false: '#D1D5DB', true: '#000000' }}
                      thumbColor="#FFFFFF"
                      style={{ transform: [{ scale: 0.8 }] }}
                    />
                  </View>

                  <View style={styles.toggleItem}>
                    <View style={styles.menuLeft}>
                      <View style={styles.menuIconContainer}>
                        <Ionicons name="logo-whatsapp" size={20} color="#000" />
                      </View>
                      <View style={styles.menuTextContainer}>
                        <Text style={styles.menuText}>WhatsApp</Text>
                        {whatsAppValue ? <Text style={styles.menuSubtext}>{whatsAppValue}</Text> : null}
                      </View>
                    </View>
                    <Switch
                      value={showWhatsApp}
                      onValueChange={() => handleToggle('whatsapp', showWhatsApp, setShowWhatsApp, whatsAppValue)}
                      trackColor={{ false: '#D1D5DB', true: '#000000' }}
                      thumbColor="#FFFFFF"
                      style={{ transform: [{ scale: 0.8 }] }}
                    />
                  </View>

                  <View style={[styles.toggleItem, styles.toggleItemLast]}>
                    <View style={styles.menuLeft}>
                      <View style={styles.menuIconContainer}>
                        <Ionicons name="calendar-outline" size={20} color="#000" />
                      </View>
                      <View style={styles.menuTextContainer}>
                        <Text style={styles.menuText}>Kalender-Link</Text>
                        {calendarValue ? <Text style={styles.menuSubtext}>{calendarValue}</Text> : null}
                      </View>
                    </View>
                    <Switch
                      value={showCalendar}
                      onValueChange={() => handleToggle('calendar', showCalendar, setShowCalendar, calendarValue)}
                      trackColor={{ false: '#D1D5DB', true: '#000000' }}
                      thumbColor="#FFFFFF"
                      style={{ transform: [{ scale: 0.8 }] }}
                    />
                  </View>
                </View>

                {/* Social Media */}
                <View style={styles.menuCard}>
                  <Text style={styles.cardTitle}>Social Media</Text>
                  
                  <View style={styles.toggleItem}>
                    <View style={styles.menuLeft}>
                      <View style={styles.menuIconContainer}>
                        <Ionicons name="logo-linkedin" size={20} color="#000" />
                      </View>
                      <View style={styles.menuTextContainer}>
                        <Text style={styles.menuText}>LinkedIn</Text>
                        {linkedInValue ? <Text style={styles.menuSubtext}>{linkedInValue}</Text> : null}
                      </View>
                    </View>
                    <Switch
                      value={showLinkedIn}
                      onValueChange={() => handleToggle('linkedin', showLinkedIn, setShowLinkedIn, linkedInValue)}
                      trackColor={{ false: '#D1D5DB', true: '#000000' }}
                      thumbColor="#FFFFFF"
                      style={{ transform: [{ scale: 0.8 }] }}
                    />
                  </View>

                  <View style={[styles.toggleItem, styles.toggleItemLast]}>
                    <View style={styles.menuLeft}>
                      <View style={styles.menuIconContainer}>
                        <Ionicons name="logo-instagram" size={20} color="#000" />
                      </View>
                      <View style={styles.menuTextContainer}>
                        <Text style={styles.menuText}>Instagram</Text>
                        {instagramValue ? <Text style={styles.menuSubtext}>{instagramValue}</Text> : null}
                      </View>
                    </View>
                    <Switch
                      value={showInstagram}
                      onValueChange={() => handleToggle('instagram', showInstagram, setShowInstagram, instagramValue)}
                      trackColor={{ false: '#D1D5DB', true: '#000000' }}
                      thumbColor="#FFFFFF"
                      style={{ transform: [{ scale: 0.8 }] }}
                    />
                  </View>
                </View>
              </>
            )}

            {/* Platz für TabBar */}
            <View style={{ height: 100 }} />
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>

      {/* Input Modal */}
      <InfoPopup
        visible={activeModal !== null}
        title={
          activeModal === 'description' ? 'Kurzbeschreibung' :
          activeModal === 'website' ? 'Webseite' :
          activeModal === 'email' ? 'E-Mail' :
          activeModal === 'phone' ? 'Telefon' :
          activeModal === 'whatsapp' ? 'WhatsApp' :
          activeModal === 'calendar' ? 'Kalender-Link' :
          activeModal === 'linkedin' ? 'LinkedIn' :
          activeModal === 'instagram' ? 'Instagram' :
          activeModal === 'changeRequest' ? 'Unternehmensdaten ändern' :
          ''
        }
        value={inputValue}
        placeholder={
          activeModal === 'description' ? 'Kurze Beschreibung deines Unternehmens (max. 200 Zeichen)...' :
          activeModal === 'website' ? 'https://...' :
          activeModal === 'email' ? 'info@firma.de' :
          activeModal === 'phone' ? '+49 ...' :
          activeModal === 'whatsapp' ? 'wa.me/...' :
          activeModal === 'calendar' ? 'https://calendly.com/...' :
          activeModal === 'linkedin' ? 'https://linkedin.com/in/...' :
          activeModal === 'instagram' ? 'https://instagram.com/...' :
          activeModal === 'changeRequest' ? 'Beschreibe, welche Daten du ändern möchtest (Firmenname, Branche, Standort)...' :
          'https://...'
        }
        keyboardType={
          activeModal === 'email' ? 'email-address' :
          activeModal === 'phone' ? 'phone-pad' :
          activeModal === 'changeRequest' ? 'default' :
          activeModal === 'description' ? 'default' :
          'url'
        }
        multiline={activeModal === 'changeRequest' || activeModal === 'description'}
        numberOfLines={activeModal === 'changeRequest' ? 5 : activeModal === 'description' ? 4 : 1}
        maxLength={activeModal === 'description' ? 200 : undefined}
        saveButtonText={activeModal === 'changeRequest' ? 'Support kontaktieren' : 'Speichern'}
        onClose={closeModal}
        onSave={saveValue}
        onChangeText={setInputValue}
      />
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
  publicStatsCard: {
    marginBottom: 12,
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
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 12,
  },
  cardTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  editIconButton: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ratingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
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
    padding: 16,
    marginBottom: 12,
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
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  menuItemLast: {
    borderBottomWidth: 0,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  infoLabel: {
    fontSize: 13,
    color: '#999',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 15,
    color: '#000',
    fontWeight: '600',
  },
  toggleItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  toggleItemLast: {
    borderBottomWidth: 0,
  },
  menuLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginRight: 12,
  },
  menuIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuTextContainer: {
    flex: 1,
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
  // Öffentliche Ansicht Styles
  publicSection: {
    marginBottom: 24,
  },
  publicDescription: {
    fontSize: 15,
    lineHeight: 22,
    color: '#333',
    marginBottom: 8,
  },
  publicSectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#000',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  publicContactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 8,
  },
  publicContactText: {
    fontSize: 15,
    color: '#333',
  },
  publicLinkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  publicLinkText: {
    flex: 1,
    fontSize: 15,
    color: '#000',
    fontWeight: '500',
  },
  publicSocialRow: {
    flexDirection: 'row',
    gap: 12,
  },
  publicSocialButton: {
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
    elevation: 3,
  },
});
