import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ConnectionCard({ connection, onPress }) {
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
          <Ionicons name="business" size={24} color="#000" />
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
          <Ionicons name="checkmark-circle" size={24} color="#22C55E" />
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
        <TouchableOpacity style={styles.rateButton} onPress={onPress}>
          <Text style={styles.rateButtonText}>Jetzt bewerten</Text>
          <Ionicons name="arrow-forward" size={16} color="#FFF" />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  connectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  connectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  connectionIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  connectionInfo: {
    flex: 1,
  },
  connectionCompany: {
    fontSize: 17,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 4,
  },
  connectionCategory: {
    fontSize: 14,
    color: '#666666',
  },
  connectionDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#F0F0F0',
    marginBottom: 16,
  },
  connectionAmount: {
    flex: 1,
  },
  connectionAmountLabel: {
    fontSize: 12,
    color: '#999999',
    marginBottom: 4,
  },
  connectionAmountValue: {
    fontSize: 20,
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
  rateButton: {
    backgroundColor: '#000000',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 20,
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
});

