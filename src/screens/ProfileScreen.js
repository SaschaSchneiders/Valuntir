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
import InfoPopup from '../shared/InfoPopup';
import ProfileCard from '../shared/ProfileCard';
import ChartCard from '../shared/ChartCard';
import RateScale from '../shared/RateScale';
import RatingBreakdown from '../shared/RatingBreakdown';
import CustomAlert from '../shared/CustomAlert';
import ProfileFAB from '../shared/ProfileFAB';
import ProfileDescription from '../shared/ProfileDescription';
import QuickActionButtons from '../shared/QuickActionButtons';
import ProjectComments from '../shared/ProjectComments';
import ContactSection from '../shared/ContactSection';
import DesktopLayout from '../components/DesktopLayout';
import { useResponsive } from '../utils/responsive';
import { usePackage } from '../context/PackageContext';
import BusinessPlanPromoScreen from './BusinessPlanPromoScreen';

export default function ProfileScreen({ navigation: navProp }) {
  const { isDesktop } = useResponsive();
  const navigation = navProp || useNavigation();
  const { isFree, isPro, isBusiness } = usePackage();
  
  // All useState Hooks MUST come before any conditional returns
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

  // Mock Kommentare von bewerteten Projekten
  const projectComments = [
    {
      id: 1,
      comment: "Familienstiftung steuerlich optimal umgesetzt. Sehr kompetente Beratung mit klarem Fokus auf langfristige Vermögenssicherung.",
      rating: 9.5,
      date: "2024-09-15"
    },
    {
      id: 2,
      comment: "Komplexe Holdingstruktur fehlerfrei aufgebaut. Alle rechtlichen Anforderungen wurden berücksichtigt.",
      rating: 9.8,
      date: "2024-08-22"
    },
    {
      id: 3,
      comment: "GmbH-Gründung inklusive Gesellschaftsvertrag und Gewinnverwendung. Sehr strukturiert und transparent.",
      rating: 9.2,
      date: "2024-07-10"
    },
    {
      id: 4,
      comment: "Steuerliche Optimierung bei Immobilienverkauf. Exzellente Beratung, die mehrere Optionen aufgezeigt hat.",
      rating: 9.0,
      date: "2024-06-05"
    },
    {
      id: 5,
      comment: "Nachfolgeplanung mit Übergabevertrag. Alle steuerlichen Aspekte wurden berücksichtigt.",
      rating: 8.8,
      date: "2024-05-18"
    },
    {
      id: 6,
      comment: "Gesellschaftervereinbarung für Familienunternehmen. Klare Regelungen für alle Eventualitäten geschaffen.",
      rating: 9.4,
      date: "2024-04-12"
    },
    {
      id: 7,
      comment: "Umstrukturierung zur Optimierung der Steuerlast. Hervorragende Arbeit mit messbaren Einsparungen.",
      rating: 9.7,
      date: "2024-03-28"
    },
    {
      id: 8,
      comment: "Beratung zum Betriebsübergang. Alle arbeitsrechtlichen und steuerlichen Fragen professionell geklärt.",
      rating: 8.9,
      date: "2024-02-14"
    },
    {
      id: 9,
      comment: "Vermögensplanung für Unternehmerfamilie. Langfristige Strategie mit Fokus auf Generationenwechsel entwickelt.",
      rating: 9.3,
      date: "2024-01-20"
    },
    {
      id: 10,
      comment: "Steuergestaltung bei Immobilienportfolio. Innovative Lösungen für komplexe Strukturen gefunden.",
      rating: 9.1,
      date: "2023-12-08"
    },
    {
      id: 11,
      comment: "Begleitung bei Due Diligence für Unternehmenskauf. Sorgfältige Prüfung aller steuerlichen Risiken.",
      rating: 9.6,
      date: "2023-11-22"
    },
    {
      id: 12,
      comment: "Internationales Steuerrecht bei Auslandsinvestition. Kompetente Beratung zu grenzüberschreitenden Themen.",
      rating: 9.0,
      date: "2023-10-15"
    },
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
  const [coverImageValue, setCoverImageValue] = useState('https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=200&fit=crop'); // Beispiel-Titelbild
  
  // Favorisierte Kontaktmöglichkeit für FAB
  const [favoriteContact, setFavoriteContact] = useState(null); // 'email', 'phone', 'whatsapp' oder null
  
  // Custom Alert State
  const [alertConfig, setAlertConfig] = useState({
    visible: false,
    title: '',
    message: '',
    buttons: []
  });
  
  const showAlert = (title, message, buttons) => {
    setAlertConfig({ visible: true, title, message, buttons });
  };
  
  const hideAlert = () => {
    setAlertConfig({ ...alertConfig, visible: false });
  };
  
  // Handler für Favoriten-Toggle
  const handleToggleFavorite = (contactType) => {
    const contactNames = {
      email: 'E-Mail',
      phone: 'Telefon',
      whatsapp: 'WhatsApp'
    };
    
    // Wenn bereits diese Option favorisiert ist → Deaktivieren
    if (favoriteContact === contactType) {
      showAlert(
        'Favorit entfernt',
        'Der Kontaktbutton wurde von deinem Profil entfernt.',
        [
          {
            text: 'OK',
            style: 'primary',
            onPress: () => {
              setFavoriteContact(null);
              hideAlert();
            }
          }
        ]
      );
      return;
    }
    
    // Wenn eine andere Option favorisiert ist → Warnung
    if (favoriteContact && favoriteContact !== contactType) {
      showAlert(
        'Favorit ändern?',
        `Möchtest du ${contactNames[favoriteContact]} durch ${contactNames[contactType]} als bevorzugte Kontaktmöglichkeit ersetzen?`,
        [
          {
            text: 'Abbrechen',
            style: 'secondary',
            onPress: hideAlert
          },
          {
            text: 'Ersetzen',
            style: 'primary',
            onPress: () => {
              setFavoriteContact(contactType);
              hideAlert();
              setTimeout(() => {
                showAlert(
                  'Favorit gesetzt',
                  `Der Kontaktbutton in deinem öffentlichen Profil ist jetzt mit ${contactNames[contactType]} verknüpft.`,
                  [
                    {
                      text: 'Verstanden',
                      style: 'primary',
                      onPress: hideAlert
                    }
                  ]
                );
              }, 300);
            }
          }
        ]
      );
      return;
    }
    
    // Neue Favorit-Option setzen
    setFavoriteContact(contactType);
    showAlert(
      'Favorit gesetzt',
      `Der Kontaktbutton in deinem öffentlichen Profil ist jetzt mit ${contactNames[contactType]} verknüpft.`,
      [
        {
          text: 'Verstanden',
          style: 'primary',
          onPress: hideAlert
        }
      ]
    );
  };
  
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

  // Handler für Profil-Übernahme
  const handleRequestBusinessAccess = () => {
    console.log('Profil-Übernahme angefordert');
    // TODO: Navigation zur Business-Checkout-Seite oder Unternehmenssuche
  };
  
  // Wenn FreeMode ODER ProMode → zeige BusinessPlanPromoScreen
  // Nur Business-User bekommen das eigene Unternehmensprofil
  if (isFree || isPro) {
    return <BusinessPlanPromoScreen onRequestAccess={handleRequestBusinessAccess} />;
  }

  const content = (
    <View style={styles.container}>
      <LinearGradient
        colors={['#F5F7FA', '#FFFFFF', '#F8F9FB', '#FAFBFC']}
        locations={[0, 0.3, 0.65, 1]}
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
              coverImage={coverImageValue}
            />

            {/* Öffentliche Ansicht */}
            {isPublicView && (
              <>
                {/* Kurzbeschreibung */}
                {showDescription && descriptionValue && (
                  <ProfileDescription description={descriptionValue} />
                )}

                {/* Quick Action Tabs - Webseite & Termin */}
                <QuickActionButtons
                  websiteUrl={showWebsite ? websiteValue : null}
                  calendarUrl={showCalendar ? calendarValue : null}
                />

                {/* Chart & Statistiken */}
                <ChartCard 
                  timeframeData={timeframeData}
                  title="Verlauf der Erfolgsquote"
                  defaultTimeframe="6months"
                />

                {/* Erfolgsquote Scale */}
                <View style={{ marginBottom: 24 }}>
                  <RateScale 
                    rate={87} 
                    size="medium" 
                    showLabel={false}
                    title="Erfolgsquote"
                    totalRatings={124}
                  />
                </View>

                {/* Bewertungsdetails - 4 Kernbereiche */}
                <View style={{ marginBottom: 24 }}>
                  <RatingBreakdown
                    communication={87}
                    pricePerformance={92}
                    deliveryQuality={89}
                    reliability={94}
                    totalProjects={124}
                  />
                </View>

                {/* Projekterfahrungen (Accordion) */}
                <ProjectComments comments={projectComments} />

                {/* Kontakt & Social Media */}
                <ContactSection
                  email={showEmail ? emailValue : null}
                  phone={showPhone ? phoneValue : null}
                  whatsapp={showWhatsApp ? whatsAppValue : null}
                  linkedin={showLinkedIn ? linkedInValue : null}
                  instagram={showInstagram ? instagramValue : null}
                />
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
          
          <TouchableOpacity style={styles.menuItem}>
                    <View style={styles.menuLeft}>
                      <View style={styles.menuIconContainer}>
                        <Ionicons name="image-outline" size={20} color="#000" />
                      </View>
                      <Text style={styles.menuText}>Logo hochladen</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>
          
                  <TouchableOpacity style={[styles.menuItem, styles.menuItemLast]}>
                    <View style={styles.menuLeft}>
                      <View style={styles.menuIconContainer}>
                        <Ionicons name="images-outline" size={20} color="#000" />
                      </View>
                      <Text style={styles.menuText}>Titelbild hochladen</Text>
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
        
                {/* Links */}
                <View style={styles.menuCard}>
                  <Text style={styles.cardTitle}>Links</Text>
                  
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

                {/* Kontakt */}
                <View style={styles.menuCard}>
                  <Text style={styles.cardTitle}>Kontakt</Text>
                  
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
                    <View style={styles.toggleRight}>
                      {favoriteContact === 'email' && (
                        <View style={styles.favoriteBadge}>
                          <Ionicons name="star" size={14} color="#FFD700" />
                        </View>
                      )}
                      <Switch
                        value={showEmail}
                        onValueChange={() => handleToggle('email', showEmail, setShowEmail, emailValue)}
                        trackColor={{ false: '#D1D5DB', true: '#000000' }}
                        thumbColor="#FFFFFF"
                        style={{ transform: [{ scale: 0.8 }] }}
                      />
                    </View>
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
                    <View style={styles.toggleRight}>
                      {favoriteContact === 'phone' && (
                        <View style={styles.favoriteBadge}>
                          <Ionicons name="star" size={14} color="#FFD700" />
                        </View>
                      )}
                      <Switch
                        value={showPhone}
                        onValueChange={() => handleToggle('phone', showPhone, setShowPhone, phoneValue)}
                        trackColor={{ false: '#D1D5DB', true: '#000000' }}
                        thumbColor="#FFFFFF"
                        style={{ transform: [{ scale: 0.8 }] }}
                      />
                    </View>
                  </View>

                  <View style={[styles.toggleItem, styles.toggleItemLast]}>
                    <View style={styles.menuLeft}>
                      <View style={styles.menuIconContainer}>
                        <Ionicons name="logo-whatsapp" size={20} color="#000" />
                      </View>
                      <View style={styles.menuTextContainer}>
                        <Text style={styles.menuText}>WhatsApp</Text>
                        {whatsAppValue ? <Text style={styles.menuSubtext}>{whatsAppValue}</Text> : null}
                      </View>
                    </View>
                    <View style={styles.toggleRight}>
                      {favoriteContact === 'whatsapp' && (
                        <View style={styles.favoriteBadge}>
                          <Ionicons name="star" size={14} color="#FFD700" />
                        </View>
                      )}
                      <Switch
                        value={showWhatsApp}
                        onValueChange={() => handleToggle('whatsapp', showWhatsApp, setShowWhatsApp, whatsAppValue)}
                        trackColor={{ false: '#D1D5DB', true: '#000000' }}
                        thumbColor="#FFFFFF"
                        style={{ transform: [{ scale: 0.8 }] }}
                      />
                    </View>
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
        isContactType={activeModal === 'email' || activeModal === 'phone' || activeModal === 'whatsapp'}
        isFavorite={activeModal === favoriteContact}
        onToggleFavorite={() => {
          const currentModal = activeModal;
          closeModal();
          setTimeout(() => {
            handleToggleFavorite(currentModal);
          }, 300);
        }}
        onClose={closeModal}
        onSave={saveValue}
        onChangeText={setInputValue}
      />

      {/* Floating Action Button - NUR in öffentlicher Ansicht UND wenn Favorit gesetzt */}
      {isPublicView && (
        <ProfileFAB
          favoriteContact={favoriteContact}
          onPress={() => {
            // Favorisierte Kontaktmöglichkeit verwenden
            if (favoriteContact === 'whatsapp' && showWhatsApp && whatsAppValue) {
              console.log('WhatsApp:', whatsAppValue);
            } else if (favoriteContact === 'phone' && showPhone && phoneValue) {
              console.log('Telefon:', phoneValue);
            } else if (favoriteContact === 'email' && showEmail && emailValue) {
              console.log('Email:', emailValue);
            }
          }}
        />
      )}

      {/* Custom Alert */}
      <CustomAlert
        visible={alertConfig.visible}
        title={alertConfig.title}
        message={alertConfig.message}
        buttons={alertConfig.buttons}
        onClose={hideAlert}
      />
    </View>
  );

  // Wrapper mit Desktop Layout
  if (isDesktop) {
    return (
      <DesktopLayout
        navigation={navigation}
        currentRoute="Profile"
        title="Profil"
        subtitle="Verwalte dein öffentliches Profil"
      >
        {content}
      </DesktopLayout>
    );
  }

  return content;
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
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 5,
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
  toggleRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  favoriteBadge: {
    backgroundColor: '#FFF9E6',
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FFE4A0',
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
});






