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

export default function ProfileScreen() {
  const navigation = useNavigation();
  const [isPublicView, setIsPublicView] = useState(false);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          {/* Toggle diskret oben links */}
          <View style={styles.toggleContainer}>
            <Text style={styles.toggleLabel}>
              {isPublicView ? 'Öffentlich' : 'Anbieter'}
            </Text>
            <Switch
              value={isPublicView}
              onValueChange={setIsPublicView}
              trackColor={{ false: '#767577', true: '#000000' }}
              thumbColor={isPublicView ? '#fff' : '#f4f3f4'}
              style={{ transform: [{ scale: 0.8 }] }}
            />
          </View>
          
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>🏢</Text>
          </View>
          <Text style={styles.companyName}>Beratungszentrum Nord GmbH</Text>
          <Text style={styles.username}>@beratungszentrum_nord</Text>
          <Text style={styles.branch}>Unternehmensberatung</Text>
          
          {/* Einstellungs-Button oben rechts */}
          <TouchableOpacity 
            style={styles.settingsButton}
            onPress={() => navigation.navigate('Settings')}
          >
            <Ionicons name="settings-outline" size={24} color="#000" />
          </TouchableOpacity>
        </View>

        {/* Öffentliches Profil - nur sichtbar wenn Toggle aktiviert */}
        {isPublicView && (
          <View style={styles.publicProfileCard}>
            <Text style={styles.publicProfileTitle}>Öffentliches Profil</Text>
            
            <View style={styles.publicStats}>
              <View style={styles.publicStatItem}>
                <Text style={styles.publicStatNumber}>23</Text>
                <Text style={styles.publicStatLabel}>Projekte abgeschlossen</Text>
              </View>
              
              <View style={styles.publicStatItem}>
                <Text style={styles.publicStatNumber}>87%</Text>
                <Text style={styles.publicStatLabel}>Erfolgsquote</Text>
              </View>
            </View>
            
            <View style={styles.publicRatingBreakdown}>
              <Text style={styles.breakdownTitle}>Bewertungsverteilung</Text>
              <View style={styles.breakdownItem}>
                <Text style={styles.breakdownLabel}>Sehr zufrieden</Text>
                <Text style={styles.breakdownValue}>15</Text>
              </View>
              <View style={styles.breakdownItem}>
                <Text style={styles.breakdownLabel}>Zufrieden</Text>
                <Text style={styles.breakdownValue}>3</Text>
              </View>
              <View style={styles.breakdownItem}>
                <Text style={styles.breakdownLabel}>Neutral</Text>
                <Text style={styles.breakdownValue}>1</Text>
              </View>
              <View style={styles.breakdownItem}>
                <Text style={styles.breakdownLabel}>Unzufrieden</Text>
                <Text style={styles.breakdownValue}>1</Text>
              </View>
            </View>
          </View>
        )}
        
        {/* Anbieter-Einstellungen - nur sichtbar wenn Toggle deaktiviert */}
        {!isPublicView && (
          <>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Firmenprofil</Text>
          
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>Firmenname bearbeiten</Text>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>Branche & Standort</Text>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>Logo hochladen</Text>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>Benutzername ändern</Text>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>
        </View>
        
        
          </>
        )}
      </ScrollView>
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
    alignItems: 'center',
    marginBottom: 30,
    position: 'relative',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 32,
  },
  companyName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  username: {
    fontSize: 16,
    color: '#000000',
    marginBottom: 4,
  },
  branch: {
    fontSize: 14,
    color: '#666',
  },
  settingsButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#f5f5f5',
    borderRadius: 24,
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  toggleContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  toggleLabel: {
    fontSize: 11,
    color: '#666',
    marginRight: 4,
    fontWeight: '600',
  },
  publicProfileCard: {
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
  publicProfileTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  publicStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  publicStatItem: {
    alignItems: 'center',
  },
  publicStatNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 4,
  },
  publicStatLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  publicRatingBreakdown: {
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 16,
  },
  breakdownTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  breakdownItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  breakdownLabel: {
    fontSize: 14,
    color: '#333',
  },
  breakdownValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
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
  menuArrow: {
    fontSize: 18,
    color: '#ccc',
  },
});
