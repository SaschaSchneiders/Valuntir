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
import FilterPills from '../shared/FilterPills';
import DesktopLayout from '../components/DesktopLayout';
import { useResponsive } from '../utils/responsive';

export default function ReminderScreen({ navigation }) {
  const { isDesktop } = useResponsive();
  const [selectedFilter, setSelectedFilter] = useState('newest');

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

  const sortTabs = [
    { key: 'newest', label: 'Neueste' },
    { key: 'highest', label: 'Höchste' },
    { key: 'lowest', label: 'Niedrigste' },
    { key: 'oldest', label: 'Älteste' },
  ];

  const sortReminders = (reminders, sort) => {
    const sorted = [...reminders];
    switch (sort) {
      case 'newest':
        return sorted.sort((a, b) => a.date - b.date); // Nächste zuerst
      case 'highest':
        return sorted.sort((a, b) => b.amount - a.amount);
      case 'lowest':
        return sorted.sort((a, b) => a.amount - b.amount);
      case 'oldest':
        return sorted.sort((a, b) => b.date - a.date); // Späteste zuerst
      default:
        return sorted;
    }
  };

  const sortedReminders = sortReminders(reminders, selectedFilter);

  const handleRateConnection = (connection) => {
    // Navigiere zum Rating oder öffne Modal
    console.log('Rate connection:', connection);
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
          <View style={styles.screenContainer}>
            {/* Sticky Header */}
            {!isDesktop && (
              <LinearGradient
                colors={['rgba(248, 249, 250, 1)', 'rgba(248, 249, 250, 0.95)', 'rgba(248, 249, 250, 0.7)', 'rgba(248, 249, 250, 0)']}
                locations={[0, 0.4, 0.7, 1]}
                style={styles.stickyHeader}
              >
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
                </View>
                <FilterPills 
                  tabs={sortTabs}
                  selectedFilter={selectedFilter}
                  onFilterChange={setSelectedFilter}
                />
              </LinearGradient>
            )}
            
            {isDesktop && (
              <View style={styles.stickyHeader}>
                <Text style={styles.headerTitle}>Erinnerungen</Text>
              </View>
            )}

            {/* Scrollable Content */}
            <ScrollView
              style={styles.scrollView}
              contentContainerStyle={styles.content}
              showsVerticalScrollIndicator={false}
            >
              {sortedReminders.length === 0 ? (
                <View style={styles.emptyState}>
                  <Ionicons name="notifications-off-outline" size={64} color="#999" />
                  <Text style={styles.emptyStateText}>Keine Erinnerungen gefunden</Text>
                </View>
              ) : (
                sortedReminders.map((reminder) => (
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
  screenContainer: {
    flex: 1,
    overflow: 'visible',
  },
  stickyHeader: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 20,
    zIndex: 100,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
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

