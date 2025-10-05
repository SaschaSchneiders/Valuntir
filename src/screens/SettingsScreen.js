import React from 'react';
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

export default function SettingsScreen() {
  const navigation = useNavigation();
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = React.useState(false);

  const tabs = [
    { name: 'Home', icon: 'home-outline' },
    { name: 'Dashboard', icon: 'bar-chart-outline' },
    { name: 'Search', icon: 'search-outline' },
    { name: 'Profile', icon: 'person-outline' },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.title}>Einstellungen</Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Connections</Text>
          
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => navigation.navigate('Connections')}
          >
            <Text style={styles.menuText}>Connections verwalten</Text>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>Connection-Vorlagen</Text>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Allgemein</Text>
          
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>Sprache</Text>
            <Text style={styles.menuValue}>Deutsch</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>Region</Text>
            <Text style={styles.menuValue}>Deutschland</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Benachrichtigungen</Text>
          
          <View style={styles.menuItem}>
            <Text style={styles.menuText}>Push-Benachrichtigungen</Text>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: '#767577', true: '#000000' }}
              thumbColor={notificationsEnabled ? '#fff' : '#f4f3f4'}
            />
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Erscheinungsbild</Text>
          
          <View style={styles.menuItem}>
            <Text style={styles.menuText}>Dunkler Modus</Text>
            <Switch
              value={darkModeEnabled}
              onValueChange={setDarkModeEnabled}
              trackColor={{ false: '#767577', true: '#000000' }}
              thumbColor={darkModeEnabled ? '#fff' : '#f4f3f4'}
            />
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sicherheit</Text>
          
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>Passwort ändern</Text>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>Zwei-Faktor-Authentifizierung</Text>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Datenschutz</Text>
          
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>Datenschutzeinstellungen</Text>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>Daten exportieren</Text>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Abo & Billing</Text>
          
          <View style={styles.subscriptionInfo}>
            <Text style={styles.subscriptionTitle}>Aktuelles Paket</Text>
            <Text style={styles.subscriptionPlan}>Professional</Text>
            <Text style={styles.subscriptionDetails}>50 Connections/Monat</Text>
          </View>
          
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>Abo verwalten</Text>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>Rechnungen</Text>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>Zahlungsmethoden</Text>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Über</Text>
          
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>Version</Text>
            <Text style={styles.menuValue}>1.0.0</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>Lizenz</Text>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>Impressum</Text>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.section}>
          <TouchableOpacity style={styles.logoutButton}>
            <Text style={styles.logoutText}>Abmelden</Text>
          </TouchableOpacity>
        </View>
        
        {/* Platz für die schwebende TabBar */}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Schwebende TabBar */}
      <View style={styles.floatingTabBarContainer}>
        <View style={styles.floatingTabBar}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab.name}
              style={styles.tabButton}
              onPress={() => navigation.navigate(tab.name)}
            >
              <Ionicons name={tab.icon} size={24} color="#666666" />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 20,
    paddingBottom: 100, // Platz für FloatingTabBar
  },
  header: {
    marginBottom: 24,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 16,
    padding: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuText: {
    fontSize: 16,
    color: '#333',
  },
  menuValue: {
    fontSize: 16,
    color: '#666',
  },
  menuArrow: {
    fontSize: 18,
    color: '#ccc',
  },
  logoutButton: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  logoutText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  subscriptionInfo: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  subscriptionTitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  subscriptionPlan: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 2,
  },
  subscriptionDetails: {
    fontSize: 14,
    color: '#666',
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
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
});
