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

export default function ReminderScreen({ navigation }) {
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Mock-Daten für Erinnerungen
  const reminders = [
    {
      id: 1,
      company: 'Steuerberater Schmidt',
      category: 'Steuerberatung',
      amount: 1950,
      reminderDate: new Date('2024-10-08'),
      originalDate: new Date('2024-10-01'),
      daysUntilReminder: 2,
    },
    {
      id: 2,
      company: 'Marketing Agentur XYZ',
      category: 'Marketing',
      amount: 8500,
      reminderDate: new Date('2024-10-20'),
      originalDate: new Date('2024-09-28'),
      daysUntilReminder: 14,
    },
    {
      id: 3,
      company: 'IT-Consulting Pro',
      category: 'IT-Beratung',
      amount: 3200,
      reminderDate: new Date('2024-11-15'),
      originalDate: new Date('2024-09-15'),
      daysUntilReminder: 40,
    },
    {
      id: 4,
      company: 'Rechtsanwalt Müller',
      category: 'Rechtsberatung',
      amount: 2400,
      reminderDate: new Date('2024-12-20'),
      originalDate: new Date('2024-08-20'),
      daysUntilReminder: 75,
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
    switch (filter) {
      case 'week':
        return reminders.filter(r => r.daysUntilReminder <= 7);
      case 'month':
        return reminders.filter(r => r.daysUntilReminder <= 30);
      case '90days':
        return reminders.filter(r => r.daysUntilReminder <= 90);
      case 'older':
        return reminders.filter(r => r.daysUntilReminder > 90);
      default:
        return reminders;
    }
  };

  const filteredReminders = filterReminders(reminders, selectedFilter);

  const formatAmount = (amount) => {
    const formatted = amount.toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return `${formatted} €`;
  };

  const formatReminderDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}.${month}.${year}`;
  };

  const getDaysText = (days) => {
    if (days === 0) return 'heute';
    if (days === 1) return 'morgen';
    if (days < 7) return `in ${days} Tagen`;
    if (days < 30) return `in ${Math.floor(days / 7)} Wochen`;
    if (days < 90) return `in ${Math.floor(days / 30)} Monaten`;
    return `in ${Math.floor(days / 30)} Monaten`;
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
                  <View key={reminder.id} style={styles.reminderCard}>
                    <View style={styles.reminderHeader}>
                      <View style={styles.reminderIcon}>
                        <Ionicons name="time-outline" size={22} color="#000" />
                      </View>
                      <View style={styles.reminderInfo}>
                        <Text style={styles.reminderCompany}>
                          {reminder.company}
                        </Text>
                        <Text style={styles.reminderCategory}>
                          {reminder.category}
                        </Text>
                      </View>
                      <View style={styles.reminderBadge}>
                        <Text style={styles.reminderBadgeText}>
                          {getDaysText(reminder.daysUntilReminder)}
                        </Text>
                      </View>
                    </View>

                    <View style={styles.reminderDetails}>
                      <View style={styles.reminderAmount}>
                        <Text style={styles.reminderAmountLabel}>Betrag</Text>
                        <Text style={styles.reminderAmountValue}>
                          {formatAmount(reminder.amount)}
                        </Text>
                      </View>
                      <View style={styles.reminderDate}>
                        <Text style={styles.reminderDateLabel}>Erinnerung am</Text>
                        <Text style={styles.reminderDateValue}>
                          {formatReminderDate(reminder.reminderDate)}
                        </Text>
                      </View>
                    </View>
                  </View>
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
    paddingBottom: 100,
  },
  remindersList: {
    gap: 12,
  },
  reminderCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  reminderHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  reminderIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#FFF9E6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  reminderInfo: {
    flex: 1,
  },
  reminderCompany: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 4,
  },
  reminderCategory: {
    fontSize: 13,
    color: '#666666',
  },
  reminderBadge: {
    backgroundColor: '#FFF9E6',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FFE8A3',
  },
  reminderBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#D97706',
  },
  reminderDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingTop: 12,
    borderTopWidth: 1,
    borderColor: '#F0F0F0',
  },
  reminderAmount: {
    flex: 1,
  },
  reminderAmountLabel: {
    fontSize: 11,
    color: '#999999',
    marginBottom: 4,
  },
  reminderAmountValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000000',
  },
  reminderDate: {
    alignItems: 'flex-end',
  },
  reminderDateLabel: {
    fontSize: 11,
    color: '#999999',
    marginBottom: 4,
  },
  reminderDateValue: {
    fontSize: 14,
    color: '#666666',
    fontWeight: '600',
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

