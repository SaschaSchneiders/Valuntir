import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, PanResponder, TouchableWithoutFeedback, Animated } from 'react-native';
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
 * @param {number} totalRatings - Anzahl der Connections für Subtitle (optional)
 * @param {function} onValueChange - Callback wenn der Wert durch Touch geändert wird (optional)
 * @param {boolean} interactive - Ob die Skala interaktiv sein soll (default: false)
 */
export default function RateScale({ 
  rate = 0, 
  size = 'medium', 
  showLabel = true,
  title = null,
  totalRatings = null,
  onValueChange = null,
  interactive = false
}) {
  // Sicherstellen, dass rate zwischen 0 und 100 liegt
  const normalizedRate = Math.min(Math.max(rate, 0), 100);
  
  // Größen-Konfiguration
  const sizeConfig = {
    small: { barHeight: 32, rateSize: 16, labelSize: 10 },
    medium: { barHeight: 48, rateSize: 22, labelSize: 12 },
    large: { barHeight: 64, rateSize: 28, labelSize: 14 }
  };
  
  const config = sizeConfig[size] || sizeConfig.medium;
  const bubbleWidth = config.barHeight * 1.5;
  const bubbleHeight = config.barHeight * 0.9;
  
  // Refs und State
  const [barWidth, setBarWidth] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragValue, setDragValue] = useState(normalizedRate);
  const [hasInteracted, setHasInteracted] = useState(false);
  
  // Bounce-Animation (nur horizontal, startet bei 0)
  const bounceAnim = useRef(new Animated.Value(0)).current;
  
  // Synchronisiere dragValue mit normalizedRate
  useEffect(() => {
    if (!isDragging) {
      setDragValue(normalizedRate);
    }
  }, [normalizedRate, isDragging]);
  
  // Bounce-Animation bei 50% Startposition
  useEffect(() => {
    if (interactive && normalizedRate === 50 && !hasInteracted && !isDragging) {
      bounceAnim.setValue(0);
      
      const bounceSequence = Animated.sequence([
        Animated.timing(bounceAnim, { toValue: 8, duration: 400, useNativeDriver: true }),
        Animated.timing(bounceAnim, { toValue: 0, duration: 300, useNativeDriver: true }),
        Animated.delay(800),
      ]);
      
      Animated.loop(bounceSequence, { iterations: 2 }).start();
    } else {
      bounceAnim.setValue(0);
    }
  }, [interactive, normalizedRate, hasInteracted, isDragging, bounceAnim]);
  
  // Display-Wert und Farbe
  const displayValue = isDragging ? dragValue : normalizedRate;
  const getColorForRate = (rate) => {
    if (rate >= 80) return '#00C853';
    if (rate >= 60) return '#76FF03';
    if (rate >= 40) return '#FFEB3B';
    if (rate >= 20) return '#FF9800';
    return '#FF3D00';
  };
  const currentColor = getColorForRate(displayValue);
  
  // Refs für PanResponder-Zugriff (verhindert Stale Closures)
  const barWidthRef = useRef(0);
  const interactiveRef = useRef(interactive);
  const onValueChangeRef = useRef(onValueChange);

  // State aktualisieren
  useEffect(() => { interactiveRef.current = interactive; }, [interactive]);
  useEffect(() => { onValueChangeRef.current = onValueChange; }, [onValueChange]);

  // Layout-Messung - Nur Breite speichern
  const onBarLayout = (event) => {
    const width = event.nativeEvent.layout.width;
    setBarWidth(width);
    barWidthRef.current = width;
  };
  
  // PanResponder
  const panResponder = useRef(
    PanResponder.create({
      // Sofortiges Greifen der Geste, auch in ScrollViews
      onStartShouldSetPanResponder: () => interactiveRef.current && onValueChangeRef.current !== null,
      onStartShouldSetPanResponderCapture: () => interactiveRef.current && onValueChangeRef.current !== null,
      onMoveShouldSetPanResponder: () => interactiveRef.current && onValueChangeRef.current !== null,
      onMoveShouldSetPanResponderCapture: () => interactiveRef.current && onValueChangeRef.current !== null,
      
      // Verhindern, dass Parent-Views (wie ScrollView) die Geste klauen
      onPanResponderTerminationRequest: () => false,
      
      onPanResponderGrant: (evt) => {
        const width = barWidthRef.current;
        if (!interactiveRef.current || !onValueChangeRef.current || width === 0) return;
        
        setHasInteracted(true);
        setIsDragging(true);
        
        const touchX = evt.nativeEvent.locationX;
        let percentage = Math.round((touchX / width) * 100);
        percentage = Math.min(Math.max(percentage, 0), 100);
        
        setDragValue(percentage);
        onValueChangeRef.current(percentage);
      },
      onPanResponderMove: (evt) => {
        const width = barWidthRef.current;
        if (!interactiveRef.current || !onValueChangeRef.current || width === 0) return;
        
        const touchX = evt.nativeEvent.locationX;
        let percentage = Math.round((touchX / width) * 100);
        percentage = Math.min(Math.max(percentage, 0), 100);
        
        setDragValue(percentage);
        onValueChangeRef.current(percentage);
      },
      onPanResponderRelease: (evt) => {
        setIsDragging(false);
        const width = barWidthRef.current;
        if (interactiveRef.current && onValueChangeRef.current && width > 0) {
           const touchX = evt.nativeEvent.locationX;
           let percentage = Math.round((touchX / width) * 100);
           percentage = Math.min(Math.max(percentage, 0), 100);
           onValueChangeRef.current(percentage);
        }
      },
      onPanResponderTerminate: () => {
        setIsDragging(false);
      },
    })
  ).current;
  
  return (
    <View style={styles.container}>
      {title && (
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title} </Text>
          {totalRatings && (
            <Text style={styles.subtitle}>(aus {totalRatings} Connections)</Text>
          )}
        </View>
      )}
      
      {showLabel && (
        <Text style={[styles.label, { fontSize: config.labelSize }]}>
          Erfolgsquote
        </Text>
      )}
      
      <View style={styles.scaleWrapper}>
        <View 
          style={styles.barContainer}
          onLayout={onBarLayout}
        >
          <LinearGradient
            colors={[
              '#FF3D00', '#FF6E40', '#FF9800', '#FFC107', '#FFEB3B',
              '#CDDC39', '#8BC34A', '#4CAF50', '#2E7D32',
            ]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={[styles.gradientBar, { height: config.barHeight }]}
            >
              <LinearGradient
                colors={['rgba(255, 255, 255, 0.4)', 'rgba(255, 255, 255, 0)', 'rgba(0, 0, 0, 0.1)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={styles.glossOverlay}
              />
            </LinearGradient>
              
            {/* Bubble-Indikator - Außerhalb des GradientBars damit er nicht abgeschnitten wird */}
            <Animated.View
              style={[
                styles.indicatorContainer,
                {
                  left: barWidth > 0 
                    ? (displayValue / 100) * (barWidth - bubbleWidth) 
                    : `${displayValue}%`, // Fallback bis Layout gemessen ist
                  marginLeft: 0, // Kein negativer Margin mehr nötig
                  marginTop: -bubbleHeight / 2,
                  transform: [{ translateX: bounceAnim }],
                }
              ]}
            >
              <View style={[styles.bubble, { width: bubbleWidth, height: bubbleHeight }]}>
                <Svg width="100%" height="100%" style={StyleSheet.absoluteFillObject}>
                  <Defs>
                    <RadialGradient id="bubbleGradient" cx="50%" cy="35%" r="80%" fx="50%" fy="35%">
                      <Stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.4" />
                      <Stop offset="40%" stopColor={currentColor} stopOpacity="1" />
                      <Stop offset="100%" stopColor="#000000" stopOpacity="0.35" />
                    </RadialGradient>
                  </Defs>
                  <Rect width="100%" height="100%" rx="16" ry="16" fill="url(#bubbleGradient)" />
                </Svg>
                
                <View style={styles.bubbleTextContainer}>
                  <Text style={[styles.bubbleText, { fontSize: config.rateSize }]}>
                    {displayValue}%
                  </Text>
                </View>
              </View>
            </Animated.View>
            
            {/* Markierungen */}
            <View style={styles.markersContainer}>
              {[0, 25, 50, 75, 100].map((mark) => (
                <View key={mark} style={styles.marker}>
                  <View style={styles.markerLine} />
                  <Text style={[styles.markerText, { fontSize: config.labelSize }]}>{mark}</Text>
                </View>
              ))}
            </View>

            {/* Touch Overlay - fängt alle Events */}
            {interactive && (
              <View 
                style={styles.touchOverlay}
                {...panResponder.panHandlers}
              />
            )}
          </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: '100%' },
  titleContainer: { flexDirection: 'row', alignItems: 'baseline', marginBottom: 4 },
  title: { fontSize: 20, fontWeight: '700', color: '#000000', letterSpacing: -0.5 },
  subtitle: { fontSize: 14, fontWeight: '400', color: '#999999' },
  label: { color: '#666666', fontWeight: '600', marginBottom: 12, letterSpacing: -0.2 },
  scaleWrapper: { width: '100%', position: 'relative', paddingTop: 4, paddingBottom: 28 },
  barContainer: { width: '100%', position: 'relative' },
  gradientBar: {
    width: '100%',
    borderRadius: 12,
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
  glossOverlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, borderRadius: 12 },
  markersContainer: {
    position: 'absolute',
    bottom: -24,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 2,
  },
  marker: { alignItems: 'center' },
  markerLine: { width: 2, height: 8, backgroundColor: 'rgba(0, 0, 0, 0.15)', marginBottom: 4, borderRadius: 1 },
  markerText: { color: '#999999', fontWeight: '600', fontSize: 11 },
  indicatorContainer: { position: 'absolute', top: '50%', zIndex: 10 },
  bubble: {
    borderRadius: 16,
    overflow: 'hidden',
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
  touchOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 100,
  },
});
