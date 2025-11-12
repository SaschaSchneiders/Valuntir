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
import DesktopLayout from '../components/DesktopLayout';
import { useResponsive } from '../utils/responsive';

export default function ReminderScreen({ navigation }) {
  const { isDesktop } = useResponsive();
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [filterModalVisible, setFilterModalVisible] = useState(false);

  // Animation values for Filter Modal
  const filterFadeAnim = useRef(new Animated.Value(0)).current;
  const filterSlideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    if (filterModalVisible) {
      // Reset to initial state first
      filterFadeAnim.setValue(0);
      filterSlideAnim.setValue(50);
      
      // Then animate in
      Animated.parallel([
        Animated.timing(filterFadeAnim, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.spring(filterSlideAnim, {
          toValue: 0,
          tension: 40,
          friction: 8,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(filterFadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(filterSlideAnim, {
          toValue: 50,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [filterModalVisible, filterFadeAnim, filterSlideAnim]);

  // Mock-Daten für Erinnerungen (basierend auf typischen Reminder-Optionen)
  const today = new Date(); // Aktuelles Datum
  
  const reminders = [
    {
      id: 1,
      company: 'Grafikdesigner Weber',
      category: 'Grafikdesign',
      amount: 2800,
      date: new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000), // In 3 Tagen
      status: 'reminder',
    },
    {
      id: 2,
      company: 'SEO-Agentur Digital',
      category: 'SEO',
      amount: 1500,
      date: new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000), // In 1 Woche
      status: 'reminder',
    },
    {
      id: 3,
      company: 'Steuerberater Schmidt',
      category: 'Steuerberatung',
      amount: 1950,
      date: new Date(today.getTime() + 14 * 24 * 60 * 60 * 1000), // In 2 Wochen
      status: 'reminder',
    },
    {
      id: 4,
      company: 'Marketing Agentur XYZ',
      category: 'Marketing',
      amount: 8500,
      date: new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000), // In 1 Monat
      status: 'reminder',
    },
    {
      id: 5,
      company: 'IT-Consulting Pro',
      category: 'IT-Beratung',
      amount: 3200,
      date: new Date(today.getTime() + 90 * 24 * 60 * 60 * 1000), // In 3 Monaten
      status: 'reminder',
    },
    {
      id: 6,
      company: 'Rechtsanwalt Müller',
      category: 'Rechtsberatung',
      amount: 2400,
      date: new Date(today.getTime() + 180 * 24 * 60 * 60 * 1000), // In 6 Monaten
      status: 'reminder',
    },
  ];

  const filterOptions = [
    { key: 'all', label: 'Alle anzeigen', icon: 'apps-outline' },
    { key: 'week', label: 'Nächste 7 Tage', icon: 'today-outline' },
    { key: 'month', label: 'Nächste 30 Tage', icon: 'calendar-outline' },
    { key: '90days', label: 'Nächste 90 Tage', icon: 'calendar-number-outline' },
    { key: 'older', label: 'Später als 90 Tage', icon: 'time-outline' },
  ];

  const filterReminders = (reminders, filter) => {
    const now = new Date();
    switch (filter) {
      case 'week':
        return reminders.filter(r => {
          const diff = r.date - now;
          const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
          return days <= 7;
        });
      case 'month':
        return reminders.filter(r => {
          const diff = r.date - now;
          const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
          return days <= 30;
        });
      case '90days':
        return reminders.filter(r => {
          const diff = r.date - now;
          const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
          return days <= 90;
        });
      case 'older':
        return reminders.filter(r => {
          const diff = r.date - now;
          const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
          return days > 90;
        });
      default:
        return reminders;
    }
  };

  const filteredReminders = filterReminders(reminders, selectedFilter);

  const handleRateConnection = (connection) => {
    // Navigiere zum Rating oder öffne Modal
    console.log('Rate connection:', connection);
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
          <View style={styles.screenContainer}>
            {/* Sticky Header */}
            <View style={styles.stickyHeader}>
              {/* Header mit Back-Button, Titel und Filter-Icon */}
              {!isDesktop && (
                <View style={styles.headerRow}>
                  <TouchableOpacity 
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                  >
                    <View style={styles.backButtonContainer}>
                      <Ionicons name="chevron-back" size={24} color="#000" />
                    </View>
                  </TouchableOpacity>
                  
                  <Text style={styles.headerTitle}>Erinnerungen</Text>
                  
                  <TouchableOpacity 
                    style={styles.filterButton}
                    onPress={() => setFilterModalVisible(true)}
                  >
                    <Ionicons name="options-outline" size={24} color="#000" />
                    {selectedFilter !== 'all' && (
                      <View style={styles.filterBadge} />
                    )}
                  </TouchableOpacity>
                </View>
              )}
              
              {isDesktop && (
                <Text style={styles.headerTitle}>Erinnerungen</Text>
              )}
            </View>

            {/* Scrollable Content */}
            <ScrollView
              style={styles.scrollView}
              contentContainerStyle={styles.content}
              showsVerticalScrollIndicator={false}
            >
              {filteredReminders.length === 0 ? (
                <View style={styles.emptyState}>
                  <Ionicons name="notifications-off-outline" size={64} color="#999" />
                  <Text style={styles.emptyStateText}>Keine Erinnerungen gefunden</Text>
                </View>
              ) : (
                filteredReminders.map((reminder) => (
                  <View key={reminder.id} style={styles.cardWrapper}>
                    <ConnectionCard
                      connection={reminder}
                      onPress={() => handleRateConnection(reminder)}
                      isReminderMode={true}
                    />
                  </View>
                ))
              )}
            </ScrollView>
          </View>
        </SafeAreaView>
      </LinearGradient>

      {/* Filter Overlay */}
      {filterModalVisible && (
        <View style={styles.filterOverlayFullscreen}>
          <Animated.View 
            style={[
              styles.filterOverlayBackdrop,
              { opacity: filterFadeAnim }
            ]}
          >
            <TouchableOpacity 
              style={StyleSheet.absoluteFill}
              activeOpacity={1}
              onPress={() => setFilterModalVisible(false)}
            />
          </Animated.View>
          <Animated.View 
            style={[
              styles.filterOverlayContent,
              {
                opacity: filterFadeAnim,
                transform: [{ translateY: filterSlideAnim }]
              }
            ]}
          >
            <TouchableOpacity 
              activeOpacity={1}
              onPress={(e) => e.stopPropagation()}
            >
              <View style={styles.filterContainer}>
                {/* Header mit Zurücksetzen-Button */}
                <View style={styles.filterHeader}>
                  <Text style={styles.filterHeaderTitle}>Filter</Text>
                  <TouchableOpacity 
                    onPress={() => setSelectedFilter('all')}
                    disabled={selectedFilter === 'all'}
                    style={styles.resetButton}
                  >
                    <Text style={[
                      styles.resetButtonText,
                      selectedFilter === 'all' && styles.resetButtonTextDisabled
                    ]}>
                      Zurücksetzen
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* Filter Options */}
                <View style={styles.filterOptions}>
                  {filterOptions.map((option) => (
                    <TouchableOpacity
                      key={option.key}
                      style={[
                        styles.filterOption,
                        selectedFilter === option.key && styles.filterOptionActive
                      ]}
                      onPress={() => {
                        setSelectedFilter(option.key);
                        setFilterModalVisible(false);
                      }}
                    >
                      <View style={styles.filterOptionLeft}>
                        <Ionicons 
                          name={option.icon} 
                          size={20} 
                          color={selectedFilter === option.key ? '#000' : '#333'} 
                        />
                        <Text 
                          style={[
                            styles.filterOptionText,
                            selectedFilter === option.key && styles.filterOptionTextActive
                          ]}
                        >
                          {option.label}
                        </Text>
                      </View>
                      {selectedFilter === option.key && (
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
        currentRoute="Reminders"
        title="Erinnerungen"
        subtitle="Deine anstehenden Bewertungen"
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
  screenContainer: {
    flex: 1,
  },
  stickyHeader: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 8,
    backgroundColor: '#F8F9FA',
    zIndex: 100,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
    paddingTop: 8,
    gap: 12,
  },
  backButton: {
  },
  backButtonContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.08)',
  },
  headerTitle: {
    fontSize: 34,
    fontWeight: '800',
    color: '#000000',
    letterSpacing: -0.5,
    flex: 1,
  },
  filterButton: {
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
  filterBadge: {
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
  // Filter Overlay Styles
  filterOverlayFullscreen: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
  },
  filterOverlayBackdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  filterOverlayContent: {
    position: 'absolute',
    top: 200,
    left: 20,
    right: 20,
  },
  filterContainer: {
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
  filterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  filterHeaderTitle: {
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
  filterOptions: {
    gap: 8,
    marginBottom: 4,
  },
  filterOption: {
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
  filterOptionActive: {
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
    borderWidth: 1.5,
    borderColor: 'rgba(0, 0, 0, 0.3)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
  },
  filterOptionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  filterOptionText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333333',
  },
  filterOptionTextActive: {
    color: '#000000',
    fontWeight: '700',
  },
});

