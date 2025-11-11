import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import ConnectionCard from '../shared/ConnectionCard';
import ConnectionRating from '../shared/ConnectionRating';
import DesktopLayout from '../components/DesktopLayout';
import FreeHomeScreen from './FreeHomeScreen';
import { useResponsive } from '../utils/responsive';
import { usePackage } from '../context/PackageContext';

export default function HomeScreen({ navigation }) {
  const { isDesktop } = useResponsive();
  const { isFree } = usePackage();
  const [sortOption, setSortOption] = useState('newest');
  const [sortModalVisible, setSortModalVisible] = useState(false);
  const [ratingModalVisible, setRatingModalVisible] = useState(false);
  const [selectedConnection, setSelectedConnection] = useState(null);

  // Animation values for Sort Modal
  const sortFadeAnim = useRef(new Animated.Value(0)).current;
  const sortSlideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    if (sortModalVisible) {
      // Reset to initial state first
      sortFadeAnim.setValue(0);
      sortSlideAnim.setValue(50);
      
      // Then animate in
      Animated.parallel([
        Animated.timing(sortFadeAnim, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.spring(sortSlideAnim, {
          toValue: 0,
          tension: 40,
          friction: 8,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(sortFadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(sortSlideAnim, {
          toValue: 50,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [sortModalVisible, sortFadeAnim, sortSlideAnim]);

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

  const sortOptions = [
    { key: 'newest', label: 'Neueste zuerst', icon: 'time-outline' },
    { key: 'highest', label: 'Höchster Betrag zuerst', icon: 'trending-up' },
    { key: 'lowest', label: 'Niedrigster Betrag zuerst', icon: 'trending-down' },
    { key: 'oldest', label: 'Älteste unbewertete zuerst', icon: 'hourglass-outline' },
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
      <LinearGradient
        colors={['#F8F9FA', '#FFFFFF', '#F8F9FA']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        <SafeAreaView style={styles.safeArea} edges={['top']}>
          <View style={styles.container}>
            {/* STICKY Header with Sort Icon */}
            <View style={styles.stickyHeader}>
              {!isDesktop && (
                <View style={styles.header}>
                  <View style={styles.headerLeft}>
                    <Text style={styles.headerTitle}>Valuntir</Text>
                    <Text style={styles.headerSubtitle}>Bewerte deine Connections</Text>
                  </View>
                  <View style={styles.headerIcons}>
                    <TouchableOpacity 
                      style={styles.iconButton}
                      onPress={() => navigation.navigate('Reminders')}
                    >
                      <Ionicons name="notifications-outline" size={24} color="#000" />
                    </TouchableOpacity>
                    <TouchableOpacity 
                      style={styles.iconButton}
                      onPress={() => setSortModalVisible(true)}
                    >
                      <Ionicons name="options-outline" size={24} color="#000" />
                      {sortOption !== 'newest' && (
                        <View style={styles.sortBadge} />
                      )}
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </View>

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

      {/* Sort Overlay */}
      {sortModalVisible && (
        <View style={styles.sortOverlayFullscreen}>
          <Animated.View 
            style={[
              styles.sortOverlayBackdrop,
              { opacity: sortFadeAnim }
            ]}
          >
            <TouchableOpacity 
              style={StyleSheet.absoluteFill}
              activeOpacity={1}
              onPress={() => setSortModalVisible(false)}
            />
          </Animated.View>
          <Animated.View 
            style={[
              styles.sortOverlayContent,
              {
                opacity: sortFadeAnim,
                transform: [{ translateY: sortSlideAnim }]
              }
            ]}
          >
            <TouchableOpacity 
              activeOpacity={1}
              onPress={(e) => e.stopPropagation()}
            >
              <View style={styles.sortContainer}>
                {/* Header mit Zurücksetzen-Button */}
                <View style={styles.sortHeader}>
                  <Text style={styles.sortHeaderTitle}>Sortierung</Text>
                  <TouchableOpacity 
                    onPress={() => setSortOption('newest')}
                    disabled={sortOption === 'newest'}
                    style={styles.resetButton}
                  >
                    <Text style={[
                      styles.resetButtonText,
                      sortOption === 'newest' && styles.resetButtonTextDisabled
                    ]}>
                      Zurücksetzen
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* Sort Options */}
                <View style={styles.sortOptions}>
                  {sortOptions.map((option) => (
                    <TouchableOpacity
                      key={option.key}
                      style={[
                        styles.sortOption,
                        sortOption === option.key && styles.sortOptionActive
                      ]}
                      onPress={() => {
                        setSortOption(option.key);
                        setSortModalVisible(false);
                      }}
                    >
                      <View style={styles.sortOptionLeft}>
                        <Ionicons 
                          name={option.icon} 
                          size={20} 
                          color={sortOption === option.key ? '#000' : '#333'} 
                        />
                        <Text 
                          style={[
                            styles.sortOptionText,
                            sortOption === option.key && styles.sortOptionTextActive
                          ]}
                        >
                          {option.label}
                        </Text>
                      </View>
                      {sortOption === option.key && (
                        <Ionicons name="checkmark-circle" size={20} color="#000" />
                      )}
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </TouchableOpacity>
          </Animated.View>
        </View>
      )}
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
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  stickyHeader: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 16,
    backgroundColor: '#F8F9FA',
    zIndex: 100,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  headerLeft: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '900',
    color: '#000',
    letterSpacing: -0.5,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#666',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 4,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  sortBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#3B82F6',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 100,
  },
  cardWrapper: {
    marginBottom: 16,
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
  // Sort Overlay Styles
  sortOverlayFullscreen: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
  },
  sortOverlayBackdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  sortOverlayContent: {
    position: 'absolute',
    top: 200,
    left: 20,
    right: 20,
  },
  sortContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 32,
    padding: 18,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 10,
  },
  sortHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  sortHeaderTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#000',
    letterSpacing: -0.5,
  },
  resetButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  resetButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  resetButtonTextDisabled: {
    color: '#CCCCCC',
  },
  sortOptions: {
    gap: 8,
    marginBottom: 4,
  },
  sortOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.08)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 2,
    elevation: 1,
  },
  sortOptionActive: {
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
    borderWidth: 1.5,
    borderColor: 'rgba(0, 0, 0, 0.3)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
  },
  sortOptionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  sortOptionText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333333',
  },
  sortOptionTextActive: {
    color: '#000000',
    fontWeight: '700',
  },
});

