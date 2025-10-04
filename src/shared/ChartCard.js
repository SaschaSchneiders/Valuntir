import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';

/**
 * ChartCard - Wiederverwendbare Chart-Kachel mit Zeitraum-Auswahl
 * 
 * @param {object} timeframeData - Objekt mit Zeiträumen und ihren Daten
 * @param {array} stats - Array mit Statistiken [{value, label}, ...]
 * @param {string} title - Titel der Card (default: 'Verlauf & Statistiken')
 * @param {string} defaultTimeframe - Standard-Zeitraum (default: '6months')
 */
export default function ChartCard({ 
  timeframeData = {},
  stats = [],
  title = 'Verlauf & Statistiken',
  defaultTimeframe = '6months'
}) {
  const [selectedTimeframe, setSelectedTimeframe] = useState(defaultTimeframe);
  
  const screenWidth = Dimensions.get('window').width;

  // Zeitraum-Tabs dynamisch aus timeframeData generieren
  const timeframeTabs = [
    { key: '14days', label: '14T' },
    { key: '30days', label: '30T' },
    { key: '90days', label: '90T' },
    { key: '6months', label: '6M' },
    { key: 'year', label: '1J' },
    { key: 'max', label: 'Max' },
  ];

  return (
    <View style={styles.successCard}>
      {/* Header mit Titel und Tabs */}
      <View style={styles.successHeader}>
        <Text style={styles.cardTitle}>{title}</Text>
        
        {/* Kompakte Tab-Pills */}
        <View style={styles.timeframePills}>
          {timeframeTabs.map((tab) => (
            <TouchableOpacity
              key={tab.key}
              style={[
                styles.pill,
                selectedTimeframe === tab.key && styles.pillActive
              ]}
              onPress={() => setSelectedTimeframe(tab.key)}
            >
              <Text
                style={[
                  styles.pillText,
                  selectedTimeframe === tab.key && styles.pillTextActive
                ]}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Clean Line Chart */}
      <View style={styles.chartArea}>
        <LineChart
          data={{
            labels: timeframeData[selectedTimeframe]?.labels || [],
            datasets: [{
              data: timeframeData[selectedTimeframe]?.data || [0]
            }]
          }}
          width={screenWidth - 80}
          height={160}
          chartConfig={{
            backgroundColor: '#FFFFFF',
            backgroundGradientFrom: '#FFFFFF',
            backgroundGradientTo: '#FFFFFF',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(153, 153, 153, ${opacity})`,
            strokeWidth: 2.5,
            propsForBackgroundLines: {
              stroke: 'rgba(0, 0, 0, 0.05)'
            }
          }}
          bezier
          style={styles.chart}
          withDots={false}
          withInnerLines={true}
          withOuterLines={false}
          withVerticalLines={false}
          withHorizontalLines={true}
          withVerticalLabels={false}
          withShadow={false}
        />
      </View>

      {/* Stats Grid - Dynamisch aus props */}
      {stats.length > 0 && (
        <View style={styles.statsRow}>
          {stats.map((stat, index) => (
            <View key={index} style={styles.miniStat}>
              <Text style={styles.miniStatNumber}>{stat.value}</Text>
              <Text style={styles.miniStatLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  successCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.08,
    shadowRadius: 40,
    elevation: 16,
  },
  successHeader: {
    marginBottom: 24,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#000000',
    marginBottom: 16,
    letterSpacing: -0.5,
  },
  timeframePills: {
    flexDirection: 'row',
    gap: 8,
  },
  pill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
  },
  pillActive: {
    backgroundColor: '#000000',
  },
  pillText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#999999',
  },
  pillTextActive: {
    color: '#FFFFFF',
  },
  chartArea: {
    marginHorizontal: -16,
    marginBottom: 24,
  },
  chart: {
    marginVertical: 8,
  },
  statsRow: {
    flexDirection: 'row',
    marginBottom: 12,
    gap: 12,
  },
  miniStat: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
  },
  miniStatNumber: {
    fontSize: 32,
    fontWeight: '800',
    color: '#000000',
    marginBottom: 4,
    letterSpacing: -1,
  },
  miniStatLabel: {
    fontSize: 12,
    color: '#666666',
    fontWeight: '500',
    textAlign: 'center',
  },
});

