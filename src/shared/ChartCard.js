import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Svg, { Path, Line, Text as SvgText } from 'react-native-svg';

/**
 * ChartCard - Wiederverwendbare Chart-Kachel mit Zeitraum-Auswahl
 * 
 * @param {object} timeframeData - Objekt mit Zeiträumen und ihren Daten
 * @param {string} title - Titel der Card (default: 'Verlauf & Statistiken')
 * @param {string} defaultTimeframe - Standard-Zeitraum (default: '6months')
 */
export default function ChartCard({ 
  timeframeData = {},
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

      {/* Custom SVG Chart - Volle Kontrolle */}
      <View style={styles.chartArea}>
        {(() => {
          const currentData = timeframeData[selectedTimeframe] || { data: [82, 85, 83, 87, 89, 87], labels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6'] };
          const data = currentData.data;
          const xLabels = currentData.labels || [];
          
          const width = screenWidth - 48;
          const height = 220;
          const padding = { top: 30, right: 0, bottom: 40, left: 32 };
          const chartWidth = width - padding.left - padding.right;
          const chartHeight = height - padding.top - padding.bottom;
          
          // Skalierung
          const minY = Math.min(...data) - 2;
          const maxY = Math.max(...data) + 2;
          const yScale = (value) => {
            return chartHeight - ((value - minY) / (maxY - minY)) * chartHeight;
          };
          const xScale = (index) => {
            return (index / (data.length - 1)) * chartWidth;
          };
          
          // Smooth Bezier Curve erstellen - ELEGANT & MODERN
          const pathData = (() => {
            if (data.length === 0) return '';
            
            const points = data.map((value, index) => ({
              x: xScale(index),
              y: yScale(value)
            }));
            
            if (points.length === 1) return `M ${points[0].x} ${points[0].y}`;
            
            let path = `M ${points[0].x} ${points[0].y}`;
            
            for (let i = 0; i < points.length - 1; i++) {
              const current = points[i];
              const next = points[i + 1];
              
              // Control points für smooth curve
              const xMid = (current.x + next.x) / 2;
              const yMid = (current.y + next.y) / 2;
              const cpX1 = (xMid + current.x) / 2;
              const cpX2 = (xMid + next.x) / 2;
              
              path += ` Q ${cpX1} ${current.y}, ${xMid} ${yMid}`;
              path += ` Q ${cpX2} ${next.y}, ${next.x} ${next.y}`;
            }
            
            return path;
          })();
          
          // Grid Lines
          const gridLines = [0, 0.25, 0.5, 0.75, 1].map((percent) => {
            const y = chartHeight * percent;
            return { y, value: Math.round(maxY - (maxY - minY) * percent) };
          });
          
          // X-Achsen Labels - intelligente Auswahl je nach Datenmenge
          const xLabelsToShow = [];
          xLabels.forEach((label, i) => {
            let shouldShow = false;
            if (data.length <= 7) shouldShow = true; // Alle anzeigen
            else if (data.length <= 14) shouldShow = i % 2 === 0; // Jeden 2. bei 14 Tagen
            else if (data.length <= 30) shouldShow = i % 5 === 0 || i === data.length - 1; // Jeden 5. bei 30 Tagen
            else if (data.length <= 90) shouldShow = i % 15 === 0 || i === data.length - 1; // Jeden 15. bei 90 Tagen
            else if (data.length <= 182) shouldShow = i % 30 === 0 || i === data.length - 1; // Jeden Monat bei 6 Monaten
            else if (data.length <= 365) shouldShow = i % 60 === 0 || i === data.length - 1; // Alle 2 Monate bei 1 Jahr
            else shouldShow = i % 365 === 0 || i === data.length - 1; // Jährlich bei Max
            
            if (shouldShow) {
              xLabelsToShow.push({ label, index: i });
            }
          });
          
          return (
            <Svg width={width} height={height}>
              {/* Grid Lines */}
              {gridLines.map((line, i) => (
                <Line
                  key={i}
                  x1={padding.left}
                  y1={padding.top + line.y}
                  x2={padding.left + chartWidth}
                  y2={padding.top + line.y}
                  stroke="rgba(0, 0, 0, 0.05)"
                  strokeWidth="1"
                />
              ))}
              
              {/* Y-Axis Labels - AUSSEN links */}
              {gridLines.map((line, i) => (
                <SvgText
                  key={i}
                  x={padding.left - 8}
                  y={padding.top + line.y + 4}
                  fontSize="11"
                  fill="#999999"
                  textAnchor="end"
                  fontWeight="500"
                >
                  {line.value}
                </SvgText>
              ))}
              
              {/* X-Axis Labels */}
              {xLabelsToShow.map(({ label, index }) => (
                <SvgText
                  key={index}
                  x={padding.left + xScale(index)}
                  y={height - padding.bottom + 20}
                  fontSize="10"
                  fill="#999999"
                  textAnchor="middle"
                  fontWeight="500"
                >
                  {label}
                </SvgText>
              ))}
              
              {/* Smooth Bezier Line - ELEGANT */}
              <Path
                d={pathData}
                stroke="#000000"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                transform={`translate(${padding.left}, ${padding.top})`}
              />
            </Svg>
          );
        })()}
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  successCard: {
    marginBottom: 24,
  },
  successHeader: {
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#000000',
    marginBottom: 12,
    letterSpacing: -0.5,
  },
  timeframePills: {
    flexDirection: 'row',
    gap: 8,
  },
  pill: {
    flex: 1,
    paddingHorizontal: 6,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.08)',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 2,
    elevation: 1,
  },
  pillActive: {
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
    borderWidth: 1.5,
    borderColor: 'rgba(0, 0, 0, 0.3)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
  },
  pillText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666666',
  },
  pillTextActive: {
    color: '#000000',
    fontWeight: '700',
  },
  chartArea: {
    marginBottom: 0,
  },
  statsRow: {
    flexDirection: 'row',
    marginBottom: 12,
    gap: 12,
  },
  miniStat: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    borderRadius: 20,
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

