import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Defs, RadialGradient, Stop, Rect } from 'react-native-svg';

/**
 * RateScale - Horizontaler Farbverlaufs-Streifen für Erfolgsquote
 * Heat-Map Style: Rot (schlecht) → Gelb → Grün (gut)
 * 
 * @param {number} rate - Erfolgsquote in Prozent (0-100)
 * @param {string} size - Größe: 'small', 'medium', 'large' (default: 'medium')
 * @param {boolean} showLabel - Label anzeigen (default: true)
 * @param {string} title - Titel über der Skala (optional)
 * @param {number} totalRatings - Anzahl der Projekte für Subtitle (optional)
 */
export default function RateScale({ 
  rate = 0, 
  size = 'medium', 
  showLabel = true,
  title = null,
  totalRatings = null
}) {
  // Sicherstellen, dass rate zwischen 0 und 100 liegt
  const normalizedRate = Math.min(Math.max(rate, 0), 100);
  
  // Größen-Konfiguration
  const sizeConfig = {
    small: {
      barHeight: 32,
      rateSize: 16,
      labelSize: 10,
    },
    medium: {
      barHeight: 48,
      rateSize: 22,
      labelSize: 12,
    },
    large: {
      barHeight: 64,
      rateSize: 28,
      labelSize: 14,
    }
  };
  
  const config = sizeConfig[size] || sizeConfig.medium;
  
  // Farbe basierend auf Rate berechnen
  const getColorForRate = (rate) => {
    if (rate >= 80) return '#00C853'; // Grün
    if (rate >= 60) return '#76FF03'; // Hell-Grün
    if (rate >= 40) return '#FFEB3B'; // Gelb
    if (rate >= 20) return '#FF9800'; // Orange
    return '#FF3D00'; // Rot
  };
  
  const currentColor = getColorForRate(normalizedRate);
  
  return (
    <View style={styles.container}>
      {/* Titel und Subtitle - wenn vorhanden */}
      {title && (
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title} </Text>
          {totalRatings && (
            <Text style={styles.subtitle}>(aus {totalRatings} Projekten)</Text>
          )}
        </View>
      )}
      
      {showLabel && (
        <Text style={[styles.label, { fontSize: config.labelSize }]}>
          Erfolgsquote
        </Text>
      )}
      
      <View style={styles.scaleWrapper}>
        {/* Äußerer Container mit Schatten für Tiefe */}
        <View style={styles.barContainer}>
          {/* Gradient-Balken mit Farbverlauf */}
          <LinearGradient
            colors={[
              '#FF3D00', // Rot (0%)
              '#FF6E40', 
              '#FF9800', // Orange (25%)
              '#FFC107',
              '#FFEB3B', // Gelb (50%)
              '#CDDC39',
              '#8BC34A', // Hell-Grün (75%)
              '#4CAF50', // Grün (90%)
              '#2E7D32', // Dunkel-Grün (100%)
            ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[styles.gradientBar, { height: config.barHeight }]}
          >
            {/* Glanz-Overlay für 3D-Effekt */}
            <LinearGradient
              colors={['rgba(255, 255, 255, 0.4)', 'rgba(255, 255, 255, 0)', 'rgba(0, 0, 0, 0.1)']}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={styles.glossOverlay}
            />
            
            {/* Bubble-Indikator - INNERHALB der Skala */}
            <View
              style={[
                styles.indicatorContainer,
                {
                  left: `${normalizedRate}%`,
                }
              ]}
            >
              {/* Echter 3D-Effekt - Radialer Gradient */}
              <View
                style={[
                  styles.bubble,
                  {
                    width: config.barHeight * 1.5,
                    height: config.barHeight * 0.9,
                  }
                ]}
              >
                <Svg
                  width="100%"
                  height="100%"
                  style={StyleSheet.absoluteFillObject}
                >
                  <Defs>
                    <RadialGradient
                      id="bubbleGradient"
                      cx="50%"
                      cy="35%"
                      r="80%"
                      fx="50%"
                      fy="35%"
                    >
                      <Stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.4" />
                      <Stop offset="40%" stopColor={currentColor} stopOpacity="1" />
                      <Stop offset="100%" stopColor="#000000" stopOpacity="0.35" />
                    </RadialGradient>
                  </Defs>
                  <Rect
                    width="100%"
                    height="100%"
                    rx="16"
                    ry="16"
                    fill="url(#bubbleGradient)"
                  />
                </Svg>
                
                <View style={styles.bubbleTextContainer}>
                  <Text style={[styles.bubbleText, { fontSize: config.rateSize }]}>
                    {normalizedRate}%
                  </Text>
                </View>
              </View>
            </View>
          </LinearGradient>
          
          {/* Prozent-Markierungen unter dem Balken */}
          <View style={styles.markersContainer}>
            {[0, 25, 50, 75, 100].map((mark) => (
              <View key={mark} style={styles.marker}>
                <View style={styles.markerLine} />
                <Text style={[styles.markerText, { fontSize: config.labelSize }]}>
                  {mark}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000000',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '400',
    color: '#999999',
  },
  label: {
    color: '#666666',
    fontWeight: '600',
    marginBottom: 12,
    letterSpacing: -0.2,
  },
  scaleWrapper: {
    width: '100%',
    position: 'relative',
    paddingTop: 4,
    paddingBottom: 28,
  },
  barContainer: {
    width: '100%',
    position: 'relative',
  },
  gradientBar: {
    width: '100%',
    borderRadius: 24,
    position: 'relative',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  glossOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 24,
  },
  markersContainer: {
    position: 'absolute',
    bottom: -24,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 2,
  },
  marker: {
    alignItems: 'center',
  },
  markerLine: {
    width: 2,
    height: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
    marginBottom: 4,
    borderRadius: 1,
  },
  markerText: {
    color: '#999999',
    fontWeight: '600',
    fontSize: 11,
  },
  indicatorContainer: {
    position: 'absolute',
    top: '50%',
    alignItems: 'center',
    zIndex: 10,
    transform: [{ translateX: '-50%' }, { translateY: '-50%' }],
  },
  bubble: {
    borderRadius: 24,
    overflow: 'hidden',
    // Eleganter Schwebeffekt
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 6,
  },
  bubbleTextContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  bubbleText: {
    color: '#FFFFFF',
    fontWeight: '800',
    letterSpacing: -0.5,
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
});

