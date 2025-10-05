import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function ConnectionsScreen() {
  const navigation = useNavigation();

  const tabs = [
    { name: 'Home', icon: 'home-outline' },
    { name: 'Dashboard', icon: 'bar-chart-outline' },
    { name: 'Search', icon: 'search-outline' },
    { name: 'Profile', icon: 'person-outline' },
  ];
  // Mock-Daten für Connections (synchronisiert mit Dashboard)
  const connections = [
    { id: '1', status: 'pending', date: '2024-01-15', customer: '@bauhaus_berlin' },
    { id: '2', status: 'confirmed', date: '2024-01-14', customer: '@techconsult_munich' },
    { id: '3', status: 'rated', date: '2024-01-13', customer: '@finanzberatung_hh' },
    { id: '4', status: 'rated', date: '2024-01-12', customer: '@coaching_stuttgart' },
    { id: '5', status: 'pending', date: '2024-01-11', customer: '@marketing_koeln' },
  ];

  // Statistiken synchronisiert mit Dashboard
  const connectionsSent = 23; // Aus Dashboard
  const pendingConnections = 3; // Aus Dashboard
  const totalRatings = 20; // Aus Dashboard

  // Abgespeckte Abo-Informationen (nur Slots)
  const totalConnections = 50;
  const usedConnections = 23;
  const remainingConnections = totalConnections - usedConnections;


  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return '#999999';
      case 'confirmed': return '#666666';
      case 'rated': return '#000000';
      default: return '#666';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending': return 'Ausstehend';
      case 'confirmed': return 'Bestätigt';
      case 'rated': return 'Bewertet';
      default: return status;
    }
  };

  const renderConnection = ({ item }) => (
    <View style={styles.connectionCard}>
      <Text style={styles.customerName}>{item.customer}</Text>
      <Text style={styles.connectionDate}>{item.date}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Connections</Text>
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>+ Neu</Text>
        </TouchableOpacity>
      </View>
      
          {/* Kombinierte Stats & Slots Card */}
          <View style={styles.combinedCard}>
            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{connectionsSent}</Text>
                <Text style={styles.statLabel}>Versendet</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{pendingConnections}</Text>
                <Text style={styles.statLabel}>Ausstehend</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{totalRatings}</Text>
                <Text style={styles.statLabel}>Bewertet</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{remainingConnections}</Text>
                <Text style={styles.statLabel}>Frei</Text>
              </View>
            </View>
            
            {/* Fortschrittsbalken */}
            <View style={styles.progressSection}>
              <View style={styles.progressHeader}>
                <Text style={styles.progressLabel}>Connection-Nutzung</Text>
                <Text style={styles.progressValue}>{usedConnections}/{totalConnections}</Text>
              </View>
              <View style={styles.usageBar}>
                <View style={[styles.usageFill, { width: `${(usedConnections / totalConnections) * 100}%` }]} />
              </View>
            </View>
          </View>


      <FlatList
        data={connections}
        renderItem={renderConnection}
        keyExtractor={(item) => item.id}
        contentContainerStyle={[styles.listContainer, { paddingBottom: 100 }]}
        showsVerticalScrollIndicator={false}
      />

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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  addButton: {
    backgroundColor: '#000000',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  combinedCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 100, // Platz für FloatingTabBar
  },
  connectionCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  customerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  connectionDate: {
    fontSize: 14,
    color: '#666',
  },
  progressSection: {
    marginTop: 8,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 13,
    fontWeight: '500',
    color: '#666',
  },
  progressValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
  },
  usageBar: {
    height: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  usageFill: {
    height: '100%',
    backgroundColor: '#000000',
    borderRadius: 4,
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
