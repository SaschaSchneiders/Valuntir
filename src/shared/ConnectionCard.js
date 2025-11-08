import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export default function ConnectionCard({ connection, onPress, onSetReminder, isReminderMode = false }) {
  const [showReminderModal, setShowReminderModal] = useState(false);

  const reminderOptions = [
    { label: 'In 1 Woche', days: 7 },
    { label: 'In 2 Wochen', days: 14 },
    { label: 'In 1 Monat', days: 30 },
    { label: 'In 3 Monaten', days: 90 },
    { label: 'In 6 Monaten', days: 180 },
  ];

  const handleSetReminder = (days) => {
    if (onSetReminder) {
      onSetReminder(connection.id, days);
    }
    setShowReminderModal(false);
  };

  // Hilfsfunktion für Datumsformatierung
  const formatDate = (date) => {
    const now = new Date();
    const connectionDate = new Date(date);
    const diffTime = isReminderMode ? connectionDate - now : now - connectionDate;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (isReminderMode) {
      // Zukunftsorientiert für Erinnerungen
      if (diffDays === 0) return 'heute';
      if (diffDays === 1) return 'morgen';
      if (diffDays < 7) return `in ${diffDays} Tagen`;
      if (diffDays < 30) return `in ${Math.floor(diffDays / 7)} Wochen`;
      if (diffDays < 90) return `in ${Math.floor(diffDays / 30)} Monaten`;
      return `in ${Math.floor(diffDays / 30)} Monaten`;
    } else {
      // Vergangenheitsorientiert für normale Connections
      if (diffDays === 0) return 'heute';
      if (diffDays === 1) return 'gestern';
      if (diffDays < 30) return `vor ${diffDays} Tagen`;
      if (diffDays < 365) return `vor ${Math.floor(diffDays / 30)} Monaten`;
      return `vor ${Math.floor(diffDays / 365)} Jahren`;
    }
  };

  // Hilfsfunktion für Betragsformatierung
  const formatAmount = (amount) => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
    }).format(amount);
  };

  return (
    <View style={styles.connectionCard}>
      <View style={styles.connectionHeader}>
        <View style={styles.connectionIcon}>
          <Ionicons name="business" size={22} color="#000" />
        </View>
        <View style={styles.connectionInfo}>
          <Text style={styles.connectionCompany}>
            {connection.company}
          </Text>
          <Text style={styles.connectionCategory}>
            {connection.category}
          </Text>
        </View>
        {connection.status === 'rated' && (
          <Ionicons name="checkmark-circle" size={22} color="#22C55E" />
        )}
      </View>

      <View style={styles.connectionDetails}>
        <View style={styles.connectionAmount}>
          <Text style={styles.connectionAmountLabel}>Betrag</Text>
          <Text style={styles.connectionAmountValue}>
            {formatAmount(connection.amount)}
          </Text>
        </View>
        <View style={styles.connectionDate}>
          <Text style={styles.connectionDateLabel}>
            {formatDate(connection.date)}
          </Text>
        </View>
      </View>

      {connection.status === 'pending' && (
        <View style={styles.actionRow}>
          <View style={styles.rateButtonContainer}>
            <LinearGradient
              colors={['#3A3A3A', '#0F0F0F', '#3A3A3A']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0.8 }}
              style={styles.rateButtonGradient}
            >
              <TouchableOpacity style={styles.rateButton} onPress={onPress} activeOpacity={0.85}>
                <Text style={styles.rateButtonText}>Jetzt bewerten</Text>
                <Ionicons name="arrow-forward" size={16} color="#FFF" />
              </TouchableOpacity>
            </LinearGradient>
          </View>
          
          <TouchableOpacity 
            style={styles.reminderButton}
            onPress={() => setShowReminderModal(true)}
          >
            <Ionicons name="notifications-outline" size={22} color="#666" />
          </TouchableOpacity>
        </View>
      )}
      
      {connection.status === 'reminder' && (
        <View style={styles.actionRow}>
          <View style={styles.rateButtonContainer}>
            <LinearGradient
              colors={['#3A3A3A', '#0F0F0F', '#3A3A3A']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0.8 }}
              style={styles.rateButtonGradient}
            >
              <TouchableOpacity style={styles.rateButton} onPress={onPress} activeOpacity={0.85}>
                <Text style={styles.rateButtonText}>Jetzt bewerten</Text>
                <Ionicons name="arrow-forward" size={16} color="#FFF" />
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </View>
      )}

      {/* Reminder Modal */}
      <Modal
        visible={showReminderModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowReminderModal(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowReminderModal(false)}
        >
          <TouchableOpacity 
            activeOpacity={1}
            onPress={(e) => e.stopPropagation()}
          >
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Erinnerung setzen</Text>
              <Text style={styles.modalSubtitle}>Wann möchtest du bewerten?</Text>
            
            {reminderOptions.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={styles.reminderOption}
                onPress={() => handleSetReminder(option.days)}
              >
                <Ionicons name="time-outline" size={20} color="#666" />
                <Text style={styles.reminderOptionText}>{option.label}</Text>
              </TouchableOpacity>
            ))}
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  connectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.08)',
  },
  connectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  connectionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(248, 249, 250, 0.95)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.06)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  connectionInfo: {
    flex: 1,
  },
  connectionCompany: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 4,
  },
  connectionCategory: {
    fontSize: 13,
    color: '#666666',
  },
  connectionDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.04)',
    marginBottom: 12,
  },
  connectionAmount: {
    flex: 1,
  },
  connectionAmountLabel: {
    fontSize: 11,
    color: '#999999',
    marginBottom: 4,
  },
  connectionAmountValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000000',
  },
  connectionDate: {
    alignItems: 'flex-end',
  },
  connectionDateLabel: {
    fontSize: 13,
    color: '#666666',
    fontWeight: '500',
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  rateButtonContainer: {
    flex: 1,
    borderRadius: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
  },
  rateButtonGradient: {
    borderRadius: 32,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  rateButton: {
    paddingVertical: 12,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  rateButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  reminderButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.08)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    width: '100%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 10,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.05)',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
    marginBottom: 8,
  },
  modalSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  reminderOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 16,
    backgroundColor: '#F8F9FA',
    marginBottom: 10,
    gap: 12,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.04)',
  },
  reminderOptionText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
});

