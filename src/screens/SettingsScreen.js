import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import DesktopLayout from '../components/DesktopLayout';
import { useResponsive } from '../utils/responsive';

export default function SettingsScreen({ navigation: navProp }) {
  const navigation = navProp || useNavigation();
  const { isDesktop } = useResponsive();
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
      <LinearGradient
        colors={['#F8F9FA', '#FFFFFF', '#F8F9FA']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <SafeAreaView style={styles.safeArea} edges={['top']}>
          <ScrollView contentContainerStyle={styles.content}>
            {/* Header - nur auf Mobile */}
            {!isDesktop && (
              <View style={styles.header}>
                <TouchableOpacity 
                  style={styles.backButton}
                  onPress={() => navigation.goBack()}
                >
                  <Ionicons name="arrow-back" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.title}>⚙️ Einstellungen</Text>
              </View>
            )}
            
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
              
              <TouchableOpacity style={styles.menuItem}>
                <View style={styles.menuLeft}>
                  <Ionicons name="receipt-outline" size={22} color="#000" />
                  <Text style={styles.menuText}>Mein Abo</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#999" />
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
  gradient: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  backButton: {
    marginRight: 12,
    padding: 8,
  },
  title: {
    fontSize: 26,
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
