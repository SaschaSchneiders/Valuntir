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
import HeaderWithSubtitle from '../shared/HeaderWithSubtitle';
import FilterPills from '../shared/FilterPills';
import ConnectionCard from '../shared/ConnectionCard';

export default function ReminderScreen({ navigation }) {
  const [selectedFilter, setSelectedFilter] = useState('all');

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

  const filterTabs = [
    { key: 'all', label: 'Alle' },
    { key: 'week', label: '7T' },
    { key: 'month', label: '30T' },
    { key: '90days', label: '90T' },
    { key: 'older', label: 'Älter' },
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
          {/* Zurück-Button */}
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <View style={styles.backButtonContainer}>
              <Ionicons name="chevron-back" size={28} color="#000" />
            </View>
          </TouchableOpacity>

          <ScrollView contentContainerStyle={styles.content}>
            <HeaderWithSubtitle 
              title="Erinnerungen" 
              subtitle="Geplante Bewertungen"
            />

            <FilterPills 
              tabs={filterTabs}
              selectedFilter={selectedFilter}
              onFilterChange={setSelectedFilter}
            />

            {/* Reminder Liste */}
            <View style={styles.remindersList}>
              {filteredReminders.length === 0 ? (
                <View style={styles.emptyState}>
                  <Ionicons name="notifications-off-outline" size={64} color="#999" />
                  <Text style={styles.emptyStateText}>Keine Erinnerungen gefunden</Text>
                </View>
              ) : (
                filteredReminders.map((reminder) => (
                  <ConnectionCard
                    key={reminder.id}
                    connection={reminder}
                    onPress={() => handleRateConnection(reminder)}
                    isReminderMode={true}
                  />
                ))
              )}
            </View>
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
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
  backButton: {
    position: 'absolute',
    top: 60,
    left: 20,
    zIndex: 1000,
  },
  backButtonContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  content: {
    padding: 20,
    paddingTop: 60,
    paddingBottom: 100,
  },
  remindersList: {
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

