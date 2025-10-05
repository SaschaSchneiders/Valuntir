import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Mock-Daten für Connections die bewertet werden können
  const connections = [
    {
      id: 1,
      company: 'Steuerberater Schmidt',
      amount: 1950,
      date: new Date('2024-10-01'),
      category: 'Steuerberatung',
      status: 'pending',
    },
    {
      id: 2,
      company: 'Marketing Agentur XYZ',
      amount: 8500,
      date: new Date('2024-09-28'),
      category: 'Marketing',
      status: 'pending',
    },
    {
      id: 3,
      company: 'IT-Consulting Pro',
      amount: 3200,
      date: new Date('2024-09-15'),
      category: 'IT-Beratung',
      status: 'pending',
    },
    {
      id: 4,
      company: 'Rechtsanwalt Müller',
      amount: 2400,
      date: new Date('2024-08-20'),
      category: 'Rechtsberatung',
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

  const formatDate = (date) => {
    const now = new Date();
    const diff = now - date;
    const days = Math.floor(diff / (24 * 60 * 60 * 1000));
    
    if (days === 0) return 'Heute';
    if (days === 1) return 'Gestern';
    if (days < 7) return `vor ${days} Tagen`;
    if (days < 30) return `vor ${Math.floor(days / 7)} Wochen`;
    return `vor ${Math.floor(days / 30)} Monaten`;
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
    }).format(amount);
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#F8F9FA', '#FFFFFF', '#F8F9FA']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <SafeAreaView style={styles.safeArea}>
          <ScrollView contentContainerStyle={styles.content}>
            <View style={styles.header}>
              <Text style={styles.title}>Valuntir</Text>
              <Text style={styles.subtitle}>Bewerte deine Connections</Text>
            </View>

            {/* Filter Tabs */}
            <View style={styles.filterContainer}>
              {filterTabs.map((tab) => (
                <TouchableOpacity
                  key={tab.key}
                  style={[
                    styles.filterTab,
                    selectedFilter === tab.key && styles.filterTabActive
                  ]}
                  onPress={() => setSelectedFilter(tab.key)}
                >
                  <Text
                    style={[
                      styles.filterTabText,
                      selectedFilter === tab.key && styles.filterTabTextActive
                    ]}
                  >
                    {tab.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Connection Liste */}
            <View style={styles.connectionsList}>
              {filteredConnections.length === 0 ? (
                <View style={styles.emptyState}>
                  <Ionicons name="checkmark-circle-outline" size={64} color="#999" />
                  <Text style={styles.emptyStateText}>Keine Connections gefunden</Text>
                </View>
              ) : (
                filteredConnections.map((connection) => (
                  <TouchableOpacity
                    key={connection.id}
                    style={styles.connectionCard}
                  >
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
                      <TouchableOpacity style={styles.rateButton}>
                        <Text style={styles.rateButtonText}>Jetzt bewerten</Text>
                        <Ionicons name="arrow-forward" size={16} color="#FFF" />
                      </TouchableOpacity>
                    )}
                  </TouchableOpacity>
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
  content: {
    padding: 20,
    paddingBottom: 100,
  },
  header: {
    marginBottom: 24,
    paddingTop: 8,
  },
  title: {
    fontSize: 34,
    fontWeight: '800',
    color: '#000000',
    letterSpacing: -0.5,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    fontWeight: '500',
  },
  filterContainer: {
    flexDirection: 'row',
    marginBottom: 24,
    gap: 6,
  },
  filterTab: {
    flex: 1,
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(245, 245, 245, 0.8)',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.05)',
    alignItems: 'center',
  },
  filterTabActive: {
    backgroundColor: '#000000',
    borderColor: '#000000',
  },
  filterTabText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666666',
  },
  filterTabTextActive: {
    color: '#FFFFFF',
  },
  connectionsList: {
    gap: 16,
  },
  connectionCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.06)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  connectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  connectionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
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
    fontWeight: '500',
  },
  connectionDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  connectionAmount: {
    flex: 1,
  },
  connectionAmountLabel: {
    fontSize: 12,
    color: '#999999',
    fontWeight: '500',
    marginBottom: 4,
  },
  connectionAmountValue: {
    fontSize: 20,
    fontWeight: '800',
    color: '#000000',
    letterSpacing: -0.5,
  },
  connectionDate: {
    alignItems: 'flex-end',
  },
  connectionDateLabel: {
    fontSize: 13,
    color: '#666666',
    fontWeight: '600',
  },
  rateButton: {
    backgroundColor: '#000000',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  rateButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
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

