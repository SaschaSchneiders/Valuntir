import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  FlatList,
} from 'react-native';

export default function ConnectionsScreen() {
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
    <SafeAreaView style={styles.container}>
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
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
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
});
