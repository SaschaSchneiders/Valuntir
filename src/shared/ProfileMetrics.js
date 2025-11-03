import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileMetrics({
  profileViews = 0,
  profileViewsChange = '+0%',
  profileInteractions = 0,
  interactionsChange = '+0%',
  totalLeads = 0,
  whatsappClicks = 0,
  calendarClicks = 0,
  websiteClicks = 0,
  phoneClicks = 0,
}) {
  return (
    <View style={styles.container}>
      <View style={styles.metricsRow}>
        {/* Profilaufrufe */}
        <View style={styles.metricColumn}>
          <View style={styles.metricHeader}>
            <Text style={styles.metricTitle}>Profilaufrufe</Text>
            <View style={styles.metricChange}>
              <Text style={styles.metricChangeText}>{profileViewsChange}</Text>
            </View>
          </View>
          <Text style={styles.metricNumber}>{profileViews}</Text>
          <Text style={styles.metricSubtitle}>Gesamt</Text>
        </View>

        {/* Divider */}
        <View style={styles.metricDivider} />

        {/* Interaktionen */}
        <View style={styles.metricColumn}>
          <View style={styles.metricHeader}>
            <Text style={styles.metricTitle}>Interaktionen</Text>
            <View style={styles.metricChange}>
              <Text style={styles.metricChangeText}>{interactionsChange}</Text>
            </View>
          </View>
          <Text style={styles.metricNumber}>{profileInteractions}</Text>
          <Text style={styles.metricSubtitle}>Gesamt</Text>
        </View>
      </View>

      {/* Lead-Tracking Section */}
      <View style={styles.horizontalDivider} />
      
      <View style={styles.leadsSection}>
        <View style={styles.leadsHeader}>
          <Text style={styles.leadsTitle}>Kontaktanfragen (Leads)</Text>
          <View style={styles.totalLeadsBadge}>
            <Text style={styles.totalLeadsNumber}>{totalLeads}</Text>
          </View>
        </View>

        <View style={styles.leadsBreakdown}>
          {whatsappClicks > 0 && (
            <View style={styles.leadItem}>
              <Ionicons name="logo-whatsapp" size={16} color="#25D366" />
              <Text style={styles.leadItemText}>{whatsappClicks}</Text>
            </View>
          )}
          
          {calendarClicks > 0 && (
            <View style={styles.leadItem}>
              <Ionicons name="calendar" size={16} color="#4285F4" />
              <Text style={styles.leadItemText}>{calendarClicks}</Text>
            </View>
          )}
          
          {websiteClicks > 0 && (
            <View style={styles.leadItem}>
              <Ionicons name="globe" size={16} color="#666666" />
              <Text style={styles.leadItemText}>{websiteClicks}</Text>
            </View>
          )}
          
          {phoneClicks > 0 && (
            <View style={styles.leadItem}>
              <Ionicons name="call" size={16} color="#000000" />
              <Text style={styles.leadItemText}>{phoneClicks}</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.06)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.08,
    shadowRadius: 32,
    elevation: 12,
  },
  metricsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metricColumn: {
    flex: 1,
  },
  metricDivider: {
    width: 1,
    height: 80,
    backgroundColor: '#E5E5E5',
    marginHorizontal: 20,
  },
  metricHeader: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginBottom: 12,
    gap: 8,
  },
  metricTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#666666',
    letterSpacing: -0.2,
  },
  metricChange: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  metricChangeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#000000',
  },
  metricNumber: {
    fontSize: 38,
    fontWeight: '900',
    color: '#000000',
    marginBottom: 4,
    letterSpacing: -1,
  },
  metricSubtitle: {
    fontSize: 13,
    color: '#999999',
    fontWeight: '500',
  },
  horizontalDivider: {
    height: 1,
    backgroundColor: '#E5E5E5',
    marginVertical: 20,
  },
  leadsSection: {
    alignItems: 'center',
  },
  leadsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    gap: 12,
  },
  leadsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666666',
  },
  totalLeadsBadge: {
    backgroundColor: '#000000',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
    minWidth: 40,
    alignItems: 'center',
  },
  totalLeadsNumber: {
    fontSize: 16,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: -0.5,
  },
  leadsBreakdown: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 12,
  },
  leadItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    gap: 6,
  },
  leadItemText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#000000',
  },
});
