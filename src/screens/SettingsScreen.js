import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import DesktopLayout from '../components/DesktopLayout';
import { useResponsive } from '../utils/responsive';
import { usePackage, PACKAGE_TYPES } from '../context/PackageContext';

export default function SettingsScreen({ navigation: navProp }) {
  const navigation = navProp || useNavigation();
  const { isDesktop } = useResponsive();
  const { switchPackage, isFree, isPro, isBusiness } = usePackage();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);

  const tabs = [
    { name: 'Home', icon: 'home-outline' },
    { name: 'Dashboard', icon: 'bar-chart-outline' },
    { name: 'Search', icon: 'search-outline' },
    { name: 'Profile', icon: 'person-outline' },
  ];

  const content = (
    <View style={styles.container}>
      <StatusBar backgroundColor="#F8F9FA" barStyle="dark-content" />
      <View style={styles.statusBarFill} />
      <LinearGradient
        colors={['#F8F9FA', '#FFFFFF', '#F8F9FA']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.screenContainer}>
          <SafeAreaView style={styles.safeArea} edges={[]}>
            {/* Header - nur auf Mobile */}
            {!isDesktop && (
              <LinearGradient
                colors={[
                  'rgba(248, 249, 250, 1)',
                  'rgba(248, 249, 250, 0.95)',
                  'rgba(248, 249, 250, 0.7)',
                  'rgba(248, 249, 250, 0)',
                ]}
                locations={[0, 0.4, 0.7, 1]}
                style={styles.stickyHeader}
              >
                <View style={styles.header}>
                  <Text style={styles.title}>Einstellungen</Text>
                </View>
              </LinearGradient>
            )}

            <ScrollView 
              style={styles.scrollView}
              contentContainerStyle={styles.content}
            >
        
            {/* Valuntir Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Valuntir</Text>
              
              <TouchableOpacity 
                style={styles.menuItem}
                onPress={() => navigation.navigate('AboutValuntir')}
              >
                <View style={styles.menuLeft}>
                  <Ionicons name="information-circle-outline" size={22} color="#000" />
                  <Text style={styles.menuText}>Über Valuntir</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#999" />
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.menuItem}
                onPress={() => navigation.navigate('InviteFriends')}
              >
                <View style={styles.menuLeft}>
                  <Ionicons name="people-outline" size={22} color="#000" />
                  <Text style={styles.menuText}>Freunde einladen</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#999" />
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.menuItem}
                onPress={() => navigation.navigate('FirstMoverSystem')}
              >
                <View style={styles.menuLeft}>
                  <Ionicons name="rocket-outline" size={22} color="#000" />
                  <Text style={styles.menuText}>First Mover System</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#999" />
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.menuItem}
                onPress={() => navigation.navigate('TrustAndSafety')}
              >
                <View style={styles.menuLeft}>
                  <Ionicons name="shield-checkmark-outline" size={22} color="#000" />
                  <Text style={styles.menuText}>Vertrauen & Sicherheit</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#999" />
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.menuItem, styles.menuItemLast]}
                onPress={() => navigation.navigate('SupportChat')}
              >
                <View style={styles.menuLeft}>
                  <Ionicons name="chatbubble-ellipses-outline" size={22} color="#000" />
                  <Text style={styles.menuText}>Support & FAQ</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#999" />
              </TouchableOpacity>
            </View>
        
            {/* App Section */}
        <View style={styles.section}>
              <Text style={styles.sectionTitle}>App</Text>
          
          <View style={styles.menuItem}>
                <View style={styles.menuLeft}>
                  <Ionicons name="notifications-outline" size={22} color="#000" />
            <Text style={styles.menuText}>Push-Benachrichtigungen</Text>
                </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
                  trackColor={{ false: '#D1D5DB', true: '#000000' }}
                  thumbColor="#FFFFFF"
            />
          </View>
              
              <TouchableOpacity 
                style={styles.menuItem}
                onPress={() => navigation.navigate('ArchivedConnections')}
              >
                <View style={styles.menuLeft}>
                  <Ionicons name="archive-outline" size={22} color="#000" />
                  <Text style={styles.menuText}>Archiv</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#999" />
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.menuItem}>
                <View style={styles.menuLeft}>
                  <Ionicons name="globe-outline" size={22} color="#000" />
                  <Text style={styles.menuText}>Sprache</Text>
                </View>
                <View style={styles.menuRight}>
                  <Text style={styles.menuValue}>Deutsch</Text>
                  <Ionicons name="chevron-forward" size={20} color="#999" />
        </View>
              </TouchableOpacity>
              
              <View style={[styles.menuItem, styles.menuItemLast]}>
                <View style={styles.menuLeft}>
                  <Ionicons name="moon-outline" size={22} color="#000" />
                  <Text style={styles.menuText}>Dark Mode</Text>
                </View>
            <Switch
              value={darkModeEnabled}
              onValueChange={setDarkModeEnabled}
                  trackColor={{ false: '#D1D5DB', true: '#000000' }}
                  thumbColor="#FFFFFF"
            />
          </View>
        </View>
        
            {/* Konto Section */}
        <View style={styles.section}>
              <Text style={styles.sectionTitle}>Konto</Text>
          
          <TouchableOpacity style={styles.menuItem}>
                <View style={styles.menuLeft}>
                  <Ionicons name="card-outline" size={22} color="#000" />
                  <Text style={styles.menuText}>Bankverbindung</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => navigation.navigate('MySubscription')}
          >
                <View style={styles.menuLeft}>
                  <Ionicons name="receipt-outline" size={22} color="#000" />
                  <Text style={styles.menuText}>Mein Abo</Text>
        </View>
                <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => {
              if (isBusiness) {
                navigation.navigate('MergeIBAN');
              } else {
                // TODO: Show upgrade prompt
                console.log('Nur für Business-Mitglieder');
              }
            }}
            disabled={!isBusiness}
          >
            <View style={styles.menuLeft}>
              <Ionicons 
                name="git-merge-outline" 
                size={22} 
                color={isBusiness ? "#000" : "#CCC"} 
              />
              <Text style={[styles.menuText, !isBusiness && styles.menuTextDisabled]}>
                Weitere IBANs hinzufügen
              </Text>
              {isBusiness && (
                <View style={styles.businessBadge}>
                  <Ionicons name="briefcase" size={10} color="#000" />
                </View>
              )}
            </View>
            <Ionicons 
              name="chevron-forward" 
              size={20} 
              color={isBusiness ? "#999" : "#DDD"} 
            />
          </TouchableOpacity>
          
              <TouchableOpacity style={[styles.menuItem, styles.menuItemLast]}>
                <View style={styles.menuLeft}>
                  <Ionicons name="log-out-outline" size={22} color="#EF4444" />
                  <Text style={[styles.menuText, styles.logoutText]}>Logout</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>
        </View>
        
            {/* Rechtliches Section (diskret) */}
            <View style={styles.legalSection}>
              <TouchableOpacity>
                <Text style={styles.legalText}>Datenschutz</Text>
          </TouchableOpacity>
          
              <Text style={styles.legalSeparator}>•</Text>
              
              <TouchableOpacity>
                <Text style={styles.legalText}>AGB</Text>
          </TouchableOpacity>
          
              <Text style={styles.legalSeparator}>•</Text>
              
              <TouchableOpacity>
                <Text style={styles.legalText}>Impressum</Text>
          </TouchableOpacity>
        </View>
        
            {/* Demo-Modus - Paket-Switcher */}
            <View style={styles.demoSection}>
              <Text style={styles.demoTitle}>Demo-Modus</Text>
              <View style={styles.packageSwitcherCompact}>
                <TouchableOpacity
                  style={[styles.packageButtonCompact, isFree && styles.packageButtonCompactActive]}
                  onPress={() => switchPackage(PACKAGE_TYPES.FREE)}
                >
                  <Text style={[styles.packageButtonCompactText, isFree && styles.packageButtonCompactTextActive]}>
                    Free
                  </Text>
          </TouchableOpacity>
          
                <TouchableOpacity
                  style={[styles.packageButtonCompact, isPro && styles.packageButtonCompactActive]}
                  onPress={() => switchPackage(PACKAGE_TYPES.PRO)}
                >
                  <Text style={[styles.packageButtonCompactText, isPro && styles.packageButtonCompactTextActive]}>
                    Pro
                  </Text>
          </TouchableOpacity>
          
                <TouchableOpacity
                  style={[styles.packageButtonCompact, isBusiness && styles.packageButtonCompactActive]}
                  onPress={() => switchPackage(PACKAGE_TYPES.BUSINESS)}
                >
                  <Text style={[styles.packageButtonCompactText, isBusiness && styles.packageButtonCompactTextActive]}>
                    Business
                  </Text>
          </TouchableOpacity>
              </View>
        </View>
        
              {/* Platz für TabBar */}
              <View style={{ height: 100 }} />
            </ScrollView>
          </SafeAreaView>

          {/* Schwebende TabBar - nur auf Mobile */}
          {!isDesktop && (
            <View style={styles.floatingTabBarContainer}>
              <View style={styles.floatingTabBar}>
                {tabs.map((tab) => (
                  <TouchableOpacity
                    key={tab.name}
                    style={styles.tabButton}
                    onPress={() => navigation.navigate('Main', { screen: tab.name })}
                  >
                    <Ionicons name={tab.icon} size={24} color="#666666" />
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}
        </View>
      </LinearGradient>
    </View>
  );

  // Wrapper mit Desktop Layout
  if (isDesktop) {
    return (
      <DesktopLayout
        navigation={navigation}
        currentRoute="Settings"
        title="Einstellungen"
        subtitle="Account & App-Einstellungen"
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
  statusBarFill: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 50,
    backgroundColor: '#F8F9FA',
    zIndex: 1000,
  },
  screenContainer: {
    flex: 1,
    overflow: 'visible',
  },
  gradient: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    paddingTop: 50,
  },
  stickyHeader: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 20,
    zIndex: 100,
  },
  scrollView: {
    flex: 1,
    overflow: 'visible',
  },
  content: {
    padding: 20,
    paddingTop: 0,
    overflow: 'visible',
  },
  header: {
    marginBottom: 0,
  },
  title: {
    fontSize: 34,
    fontWeight: '800',
    color: '#000',
  },
  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#666',
    textTransform: 'uppercase',
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  demoSection: {
    marginTop: 8,
    marginBottom: 16,
  },
  demoTitle: {
    fontSize: 11,
    fontWeight: '600',
    color: '#AAA',
    textAlign: 'center',
    marginBottom: 8,
  },
  packageSwitcherCompact: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  packageButtonCompact: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
  },
  packageButtonCompactActive: {
    backgroundColor: '#000000',
  },
  packageButtonCompactText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666666',
  },
  packageButtonCompactTextActive: {
    color: '#FFFFFF',
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
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  menuRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  menuText: {
    fontSize: 15,
    color: '#000',
    fontWeight: '500',
  },
  menuValue: {
    fontSize: 15,
    color: '#999',
  },
  logoutText: {
    color: '#EF4444',
  },
  menuTextDisabled: {
    color: '#CCC',
  },
  businessBadge: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 3,
    marginLeft: 8,
  },
  legalSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    marginBottom: 16,
    gap: 12,
  },
  legalText: {
    fontSize: 12,
    color: '#AAA',
    fontWeight: '400',
  },
  legalSeparator: {
    fontSize: 12,
    color: '#DDD',
  },
  floatingTabBarContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
  },
  floatingTabBar: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
  },
});
