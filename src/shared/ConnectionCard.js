import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ConnectionCard({ connection, onPress, onSetReminder }) {
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
    const diffTime = Math.abs(now - connectionDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'heute';
    if (diffDays === 1) return 'gestern';
    if (diffDays < 30) return `vor ${diffDays} Tagen`;
    if (diffDays < 365) return `vor ${Math.floor(diffDays / 30)} Monaten`;
    return `vor ${Math.floor(diffDays / 365)} Jahren`;
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
          <TouchableOpacity style={styles.rateButton} onPress={onPress}>
            <Text style={styles.rateButtonText}>Jetzt bewerten</Text>
            <Ionicons name="arrow-forward" size={16} color="#FFF" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.reminderButton}
            onPress={() => setShowReminderModal(true)}
          >
            <Ionicons name="notifications-outline" size={22} color="#666" />
          </TouchableOpacity>
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
  connectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  connectionIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
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
    borderColor: '#F0F0F0',
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
  rateButton: {
    flex: 1,
    backgroundColor: '#000000',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  rateButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  reminderButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    width: '100%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
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
    borderRadius: 12,
    backgroundColor: '#F8F9FA',
    marginBottom: 10,
    gap: 12,
  },
  reminderOptionText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
});

