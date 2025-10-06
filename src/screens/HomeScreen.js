import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import ConnectionCard from '../shared/ConnectionCard';
import ConnectionRating from '../shared/ConnectionRating';

export default function HomeScreen() {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [ratingModalVisible, setRatingModalVisible] = useState(false);
  const [selectedConnection, setSelectedConnection] = useState(null);

  // Mock-Daten für Connections die bewertet werden können
  const connections = [
    {
      id: 1,
      company: 'Steuerberater Schmidt',
      amount: 1950,
      date: new Date('2024-10-01'),
      category: 'Steuerberatung',
      status: 'pending',
    },
    {
      id: 2,
      company: 'Marketing Agentur XYZ',
      amount: 8500,
      date: new Date('2024-09-28'),
      category: 'Marketing',
      status: 'pending',
    },
    {
      id: 3,
      company: 'IT-Consulting Pro',
      amount: 3200,
      date: new Date('2024-09-15'),
      category: 'IT-Beratung',
      status: 'pending',
    },
    {
      id: 4,
      company: 'Rechtsanwalt Müller',
      amount: 2400,
      date: new Date('2024-08-20'),
      category: 'Rechtsberatung',
      status: 'rated',
    },
  ];

  const filterTabs = [
    { key: 'all', label: 'Alle' },
    { key: 'today', label: 'Heute' },
    { key: 'week', label: '7T' },
    { key: 'month', label: '30T' },
    { key: '90days', label: '90T' },
    { key: 'older', label: 'Älter' },
  ];

  const filterConnections = (connections, filter) => {
    const now = new Date();
    switch (filter) {
      case 'today':
        return connections.filter(c => {
          const diff = now - c.date;
          return diff < 24 * 60 * 60 * 1000;
        });
      case 'week':
        return connections.filter(c => {
          const diff = now - c.date;
          return diff < 7 * 24 * 60 * 60 * 1000;
        });
      case 'month':
        return connections.filter(c => {
          const diff = now - c.date;
          return diff < 30 * 24 * 60 * 60 * 1000;
        });
      case '90days':
        return connections.filter(c => {
          const diff = now - c.date;
          return diff < 90 * 24 * 60 * 60 * 1000;
        });
      case 'older':
        return connections.filter(c => {
          const diff = now - c.date;
          return diff >= 90 * 24 * 60 * 60 * 1000;
        });
      default:
        return connections;
    }
  };

  const filteredConnections = filterConnections(connections, selectedFilter);

  const handleRateConnection = (connection) => {
    setSelectedConnection(connection);
    setRatingModalVisible(true);
  };

  const handleSubmitRating = (rating) => {
    console.log('Bewertung abgeschickt:', rating);
    // TODO: Backend API Call
    setRatingModalVisible(false);
    setSelectedConnection(null);
  };

  const handleCloseRating = () => {
    setRatingModalVisible(false);
    setSelectedConnection(null);
  };

  const handleSetReminder = (connectionId, days) => {
    console.log(`Erinnerung gesetzt für Connection ${connectionId} in ${days} Tagen`);
    // TODO: Backend API Call
    // Hier würde die Erinnerung gespeichert werden
  };

  return (
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
            <View style={styles.header}>
              <Text style={styles.title}>Valuntir</Text>
              <Text style={styles.subtitle}>Bewerte deine Connections</Text>
            </View>

            {/* Filter Tabs */}
            <View style={styles.filterContainer}>
              {filterTabs.map((tab) => (
                <TouchableOpacity
                  key={tab.key}
                  style={[
                    styles.filterTab,
                    selectedFilter === tab.key && styles.filterTabActive
                  ]}
                  onPress={() => setSelectedFilter(tab.key)}
                >
                  <Text
                    style={[
                      styles.filterTabText,
                      selectedFilter === tab.key && styles.filterTabTextActive
                    ]}
                  >
                    {tab.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Connection Liste */}
            <View style={styles.connectionsList}>
              {filteredConnections.length === 0 ? (
                <View style={styles.emptyState}>
                  <Ionicons name="checkmark-circle-outline" size={64} color="#999" />
                  <Text style={styles.emptyStateText}>Keine Connections gefunden</Text>
                </View>
              ) : (
                filteredConnections.map((connection) => (
                  <ConnectionCard
                    key={connection.id}
                    connection={connection}
                    onPress={() => handleRateConnection(connection)}
                    onSetReminder={handleSetReminder}
                  />
                ))
              )}
            </View>
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>

      {/* Rating Modal */}
      <ConnectionRating
        visible={ratingModalVisible}
        connection={selectedConnection}
        onClose={handleCloseRating}
        onSubmit={handleSubmitRating}
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
    paddingBottom: 100,
  },
  header: {
    marginBottom: 24,
    paddingTop: 8,
  },
  title: {
    fontSize: 34,
    fontWeight: '800',
    color: '#000000',
    letterSpacing: -0.5,
    marginBottom: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.06)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    fontWeight: '500',
  },
  filterContainer: {
    flexDirection: 'row',
    marginBottom: 24,
    gap: 6,
  },
  filterTab: {
    flex: 1,
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(245, 245, 245, 0.8)',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.05)',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  filterTabActive: {
    backgroundColor: '#000000',
    borderColor: '#000000',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  filterTabText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666666',
  },
  filterTabTextActive: {
    color: '#FFFFFF',
  },
  connectionsList: {
    gap: 12,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#999999',
    fontWeight: '500',
    marginTop: 16,
  },
});

