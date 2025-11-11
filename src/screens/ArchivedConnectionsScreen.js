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

export default function ArchivedConnectionsScreen({ navigation }) {
  // Mock-Daten für archivierte Connections (später aus globalem State)
  const today = new Date();
  const [archivedConnections] = useState([
    {
      id: 101,
      company: 'Alte Marketing Firma',
      amount: 3500,
      date: new Date(today.getTime() - 120 * 24 * 60 * 60 * 1000),
      category: 'Marketing',
      status: 'pending',
      archived: true,
      archivedDate: new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000),
    },
    {
      id: 102,
      company: 'Design Studio Alt',
      amount: 2200,
      date: new Date(today.getTime() - 180 * 24 * 60 * 60 * 1000),
      category: 'Webdesign',
      status: 'pending',
      archived: true,
      archivedDate: new Date(today.getTime() - 45 * 24 * 60 * 60 * 1000),
    },
  ]);

  const handleRestoreConnection = (connectionId) => {
    console.log(`Connection ${connectionId} wiederhergestellt`);
    // TODO: Später aus Archiv wiederherstellen
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
    }).format(amount);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#F8F9FA', '#FFFFFF']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        <SafeAreaView style={styles.safeArea} edges={['top']}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="chevron-back" size={28} color="#000" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Archiv</Text>
            <View style={styles.headerSpacer} />
          </View>

          <ScrollView
            style={styles.content}
            contentContainerStyle={styles.contentContainer}
            showsVerticalScrollIndicator={false}
          >
            {/* Info Card */}
            <View style={styles.infoCard}>
              <View style={styles.infoIconContainer}>
                <Ionicons name="information-circle" size={20} color="#3B82F6" />
              </View>
              <Text style={styles.infoText}>
                Archivierte Connections werden nicht mehr in deiner aktiven Liste angezeigt.
                Du kannst sie jederzeit wiederherstellen.
              </Text>
            </View>

            {/* Archived Connections */}
            {archivedConnections.length === 0 ? (
              <View style={styles.emptyState}>
                <Ionicons name="archive-outline" size={64} color="#CCC" />
                <Text style={styles.emptyStateTitle}>Archiv ist leer</Text>
                <Text style={styles.emptyStateText}>
                  Du hast noch keine Connections archiviert
                </Text>
              </View>
            ) : (
              archivedConnections.map((connection) => (
                <View key={connection.id} style={styles.connectionCard}>
                  <View style={styles.connectionHeader}>
                    <View style={styles.connectionIcon}>
                      <Ionicons name="business" size={22} color="#666" />
                    </View>
                    <View style={styles.connectionInfo}>
                      <Text style={styles.connectionCompany}>
                        {connection.company}
                      </Text>
                      <Text style={styles.connectionCategory}>
                        {connection.category}
                      </Text>
                    </View>
                    <View style={styles.archiveBadge}>
                      <Ionicons name="archive" size={14} color="#F97316" />
                    </View>
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
                        Archiviert am
                      </Text>
                      <Text style={styles.connectionDateValue}>
                        {formatDate(connection.archivedDate)}
                      </Text>
                    </View>
                  </View>

                  {/* Restore Button */}
                  <TouchableOpacity
                    style={styles.restoreButton}
                    onPress={() => handleRestoreConnection(connection.id)}
                  >
                    <Ionicons name="arrow-undo" size={18} color="#3B82F6" />
                    <Text style={styles.restoreButtonText}>Wiederherstellen</Text>
                  </TouchableOpacity>
                </View>
              ))
            )}

            <View style={{ height: 40 }} />
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  gradient: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  backButton: {
    padding: 4,
    width: 36,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#000',
  },
  headerSpacer: {
    width: 36,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: 'rgba(59, 130, 246, 0.08)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    gap: 12,
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.15)',
  },
  infoIconContainer: {
    marginTop: 2,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    color: '#3B82F6',
    lineHeight: 20,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    marginTop: 20,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#999',
    textAlign: 'center',
  },
  connectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.06)',
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
  },
  connectionInfo: {
    flex: 1,
  },
  connectionCompany: {
    fontSize: 16,
    fontWeight: '700',
    color: '#666',
    marginBottom: 4,
  },
  connectionCategory: {
    fontSize: 13,
    color: '#999',
  },
  archiveBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(249, 115, 22, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
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
    color: '#666',
  },
  connectionDate: {
    alignItems: 'flex-end',
  },
  connectionDateLabel: {
    fontSize: 11,
    color: '#999',
    marginBottom: 4,
  },
  connectionDateValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#666',
  },
  restoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 20,
    gap: 8,
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.2)',
  },
  restoreButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#3B82F6',
  },
});

