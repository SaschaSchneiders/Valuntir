import React from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function HeaderWithSubtitle({ title, subtitle, scrollY, isSticky = false }) {
  const insets = useSafeAreaInsets();
  if (!isSticky) {
    // Normal header im ScrollView
    return (
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>
    );
  }

  // Sticky header mit Blur on scroll - längerer Fade-In (70px)
  const blurOpacity = scrollY ? scrollY.interpolate({
    inputRange: [0, 70],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  }) : 0;

  return (
    <View style={[styles.stickyContainer, { paddingTop: insets.top }]}>
      <Animated.View style={[styles.blurWrapper, { opacity: blurOpacity }]}>
        <BlurView intensity={80} tint="light" style={styles.blurContainer} />
        {/* Subtiler Gradient am unteren Rand für weicheren Übergang */}
        <LinearGradient
          colors={['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0.4)']}
          style={styles.gradientEdge}
          pointerEvents="none"
        />
      </Animated.View>
      <View style={styles.stickyHeader}>
        <Text style={styles.title}>{title}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    marginBottom: 14,
    paddingTop: 8,
  },
  stickyContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    // paddingTop wird dynamisch gesetzt via useSafeAreaInsets
  },
  blurWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  blurContainer: {
    flex: 1,
  },
  gradientEdge: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 20,
  },
  stickyHeader: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 12,
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
});

