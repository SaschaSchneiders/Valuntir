import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import ConnectionCard from '../shared/ConnectionCard';
import ConnectionRating from '../shared/ConnectionRating';
import FilterPills from '../shared/FilterPills';
import DesktopLayout from '../components/DesktopLayout';
import FreeHomeScreen from './FreeHomeScreen';
import { useResponsive } from '../utils/responsive';
import { usePackage } from '../context/PackageContext';

export default function HomeScreen({ navigation }) {
  const { isDesktop } = useResponsive();
  const { isFree } = usePackage();
  const [sortOption, setSortOption] = useState('newest');
  const [ratingModalVisible, setRatingModalVisible] = useState(false);
  const [selectedConnection, setSelectedConnection] = useState(null);

  // Im FREE-Modus: Trust & Explainer Screen zeigen
  if (isFree) {
    return <FreeHomeScreen />;
  }

  // Mock-Daten für Connections die bewertet werden können (dynamisch basierend auf heute)
  const today = new Date();
  const [connections, setConnections] = useState([
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
  ]);

  const sortTabs = [
    { key: 'newest', label: 'Neueste' },
    { key: 'highest', label: 'Höchste' },
    { key: 'lowest', label: 'Niedrigste' },
    { key: 'oldest', label: 'Älteste' },
  ];

  const sortConnections = (connections, sort) => {
    const sorted = [...connections];
    switch (sort) {
      case 'newest':
        return sorted.sort((a, b) => b.date - a.date);
      case 'highest':
        return sorted.sort((a, b) => b.amount - a.amount);
      case 'lowest':
        return sorted.sort((a, b) => a.amount - b.amount);
      case 'oldest':
        return sorted.filter(c => c.status !== 'rated').sort((a, b) => a.date - b.date);
      default:
        return sorted;
    }
  };

  const sortedConnections = sortConnections(connections, sortOption).filter(
    (conn) => !conn.archived
  );

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

  const handleArchiveConnection = (connectionId) => {
    setConnections((prevConnections) =>
      prevConnections.map((conn) =>
        conn.id === connectionId ? { ...conn, archived: true } : conn
      )
    );
    console.log(`Connection ${connectionId} archiviert`);
  };

  const content = (
    <View style={styles.container}>
      <StatusBar backgroundColor="#F8F9FA" barStyle="dark-content" />
      <View style={styles.statusBarFill} />
      <LinearGradient
        colors={['#F8F9FA', '#FFFFFF', '#F8F9FA']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        <SafeAreaView style={styles.safeArea} edges={[]}>
          <View style={styles.container}>
            {/* STICKY Header with Title and Filter Pills */}
            {!isDesktop && (
              <LinearGradient
                colors={['rgba(248, 249, 250, 1)', 'rgba(248, 249, 250, 0.95)', 'rgba(248, 249, 250, 0.7)', 'rgba(248, 249, 250, 0)']}
                locations={[0, 0.4, 0.7, 1]}
                style={styles.stickyHeader}
              >
                <View style={styles.header}>
                  <View style={styles.headerLeft}>
                    <Text style={styles.headerTitle}>Valuntir</Text>
                    <Text style={styles.headerSubtitle}>Bewerte deine Connections</Text>
                  </View>
                  <TouchableOpacity 
                    style={styles.iconButton}
                    onPress={() => navigation.navigate('Reminders')}
                  >
                    <Ionicons name="notifications-outline" size={24} color="#000" />
                  </TouchableOpacity>
                </View>
                <FilterPills 
                  tabs={sortTabs}
                  selectedFilter={sortOption}
                  onFilterChange={setSortOption}
                />
              </LinearGradient>
            )}

            {/* Scrollable Cards */}
            <ScrollView
              style={styles.scrollView}
              contentContainerStyle={styles.content}
              showsVerticalScrollIndicator={false}
            >
              {sortedConnections.length === 0 ? (
                <View style={styles.emptyState}>
                  <Ionicons name="checkmark-circle-outline" size={64} color="#999" />
                  <Text style={styles.emptyStateText}>Keine Connections gefunden</Text>
                </View>
              ) : (
                sortedConnections.map((connection) => (
                  <View key={connection.id} style={styles.cardWrapper}>
                    <ConnectionCard
                      connection={connection}
                      onPress={() => handleRateConnection(connection)}
                      onSetReminder={handleSetReminder}
                      onArchive={handleArchiveConnection}
                    />
                  </View>
                ))
              )}
            </ScrollView>
          </View>
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

  // Wrapper mit Desktop Layout
  if (isDesktop) {
    return (
      <DesktopLayout
        navigation={navigation}
        currentRoute="Home"
        title="Home"
        subtitle="Bewerte deine offenen Connections"
      >
        {content}
      </DesktopLayout>
    );
  }

  return content;
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    overflow: 'visible',
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
  safeArea: {
    flex: 1,
    overflow: 'visible',
    paddingTop: 50,
  },
  container: {
    flex: 1,
    overflow: 'visible',
  },
  stickyHeader: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 20,
    zIndex: 100,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  headerLeft: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 34,
    fontWeight: '800',
    color: '#000000',
    letterSpacing: -0.5,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#666666',
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  scrollView: {
    flex: 1,
    overflow: 'visible',
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 0,
    paddingBottom: 100,
    overflow: 'visible',
  },
  cardWrapper: {
    marginBottom: 16,
    overflow: 'visible',
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

