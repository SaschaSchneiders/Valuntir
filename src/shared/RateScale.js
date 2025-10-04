import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

/**
 * RateScale - Horizontaler Farbverlaufs-Streifen für Erfolgsquote
 * Heat-Map Style: Rot (schlecht) → Gelb → Grün (gut)
 * 
 * @param {number} rate - Erfolgsquote in Prozent (0-100)
 * @param {string} size - Größe: 'small', 'medium', 'large' (default: 'medium')
 * @param {boolean} showLabel - Label anzeigen (default: true)
 */
export default function RateScale({ rate = 0, size = 'medium', showLabel = true }) {
  // Sicherstellen, dass rate zwischen 0 und 100 liegt
  const normalizedRate = Math.min(Math.max(rate, 0), 100);
  
  // Größen-Konfiguration
  const sizeConfig = {
    small: {
      barHeight: 32,
      rateSize: 16,
      labelSize: 10,
      boxWidth: 60,
      boxPadding: 12,
    },
    medium: {
      barHeight: 48,
      rateSize: 22,
      labelSize: 12,
      boxWidth: 70,
      boxPadding: 14,
    },
    large: {
      barHeight: 64,
      rateSize: 28,
      labelSize: 14,
      boxWidth: 85,
      boxPadding: 16,
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
              {/* Bubble mit 3D-Glanz */}
              <View
                style={[
                  styles.bubble,
                  {
                    backgroundColor: currentColor,
                    width: config.barHeight * 1.5,
                    height: config.barHeight * 1.0,
                  }
                ]}
              >
                {/* Glanz-Overlay für Bubble-Effekt */}
                <View style={styles.bubbleShine} />
                
                {/* Innerer Glanz-Gradient */}
                <LinearGradient
                  colors={[
                    'rgba(255, 255, 255, 0.5)',
                    'rgba(255, 255, 255, 0.2)',
                    'rgba(255, 255, 255, 0)',
                    'rgba(0, 0, 0, 0.1)'
                  ]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.bubbleGradient}
                />
                
                <Text style={[styles.bubbleText, { fontSize: config.rateSize }]}>
                  {normalizedRate}%
                </Text>
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
  label: {
    color: '#666666',
    fontWeight: '600',
    marginBottom: 12,
    letterSpacing: -0.2,
  },
  scaleWrapper: {
    width: '100%',
    position: 'relative',
    paddingTop: 20,
    paddingBottom: 28,
  },
  barContainer: {
    width: '100%',
    position: 'relative',
  },
  gradientBar: {
    width: '100%',
    borderRadius: 16,
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
    borderRadius: 16,
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
    borderRadius: 100, // Oval/Abgerundet
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 12,
    borderWidth: 4,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    position: 'relative',
    overflow: 'hidden',
  },
  bubbleShine: {
    position: 'absolute',
    top: '15%',
    left: '20%',
    width: '35%',
    height: '35%',
    borderRadius: 1000,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    shadowColor: 'rgba(255, 255, 255, 0.8)',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 8,
  },
  bubbleGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 1000,
  },
  bubbleText: {
    color: '#FFFFFF',
    fontWeight: '900',
    letterSpacing: -1,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
    zIndex: 2,
  },
});

