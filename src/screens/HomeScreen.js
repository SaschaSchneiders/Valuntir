import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import ConnectionCard from '../shared/ConnectionCard';
import ConnectionRating from '../shared/ConnectionRating';
import HeaderWithSubtitle from '../shared/HeaderWithSubtitle';
import FilterPills from '../shared/FilterPills';

export default function HomeScreen({ navigation }) {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [ratingModalVisible, setRatingModalVisible] = useState(false);
  const [selectedConnection, setSelectedConnection] = useState(null);

  // Mock-Daten für Connections die bewertet werden können (dynamisch basierend auf heute)
  const today = new Date();
  const connections = [
    {
      id: 1,
      company: 'Webdesign Studio Nord',
      amount: 4200,
      date: new Date(today.getTime() - 4 * 24 * 60 * 60 * 1000), // vor 4 Tagen
      category: 'Webdesign',
      status: 'pending',
    },
    {
      id: 2,
      company: 'Steuerberater Schmidt',
      amount: 1950,
      date: new Date(today.getTime() - 8 * 24 * 60 * 60 * 1000), // vor 8 Tagen
      category: 'Steuerberatung',
      status: 'pending',
    },
    {
      id: 3,
      company: 'Marketing Agentur XYZ',
      amount: 8500,
      date: new Date(today.getTime() - 14 * 24 * 60 * 60 * 1000), // vor 2 Wochen
      category: 'Marketing',
      status: 'pending',
    },
    {
      id: 4,
      company: 'IT-Consulting Pro',
      amount: 3200,
      date: new Date(today.getTime() - 28 * 24 * 60 * 60 * 1000), // vor ca. 1 Monat
      category: 'IT-Beratung',
      status: 'pending',
    },
    {
      id: 5,
      company: 'Fotografie Meier',
      amount: 1800,
      date: new Date(today.getTime() - 42 * 24 * 60 * 60 * 1000), // vor ca. 1,5 Monaten
      category: 'Fotografie',
      status: 'pending',
    },
    {
      id: 6,
      company: 'Rechtsanwalt Müller',
      amount: 2400,
      date: new Date(today.getTime() - 55 * 24 * 60 * 60 * 1000), // vor ca. 2 Monaten
      category: 'Rechtsberatung',
      status: 'pending',
    },
    {
      id: 7,
      company: 'Content-Agentur Berlin',
      amount: 5600,
      date: new Date(today.getTime() - 80 * 24 * 60 * 60 * 1000), // vor ca. 3 Monaten
      category: 'Content Creation',
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
            <HeaderWithSubtitle 
              title="Valuntir" 
              subtitle="Bewerte deine Connections"
              showIcon={true}
              iconName="notifications-outline"
              onIconPress={() => navigation.navigate('Reminders')}
            />

            <FilterPills 
              tabs={filterTabs}
              selectedFilter={selectedFilter}
              onFilterChange={setSelectedFilter}
            />

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
  connectionsList: {
    gap: 10,
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

