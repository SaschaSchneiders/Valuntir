import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = SCREEN_WIDTH * 0.72;
const CARD_HEIGHT = 170;
const CARD_OVERLAP = 60;
const SNAP_DISTANCE = CARD_WIDTH - CARD_OVERLAP;
const SIDE_PADDING = (SCREEN_WIDTH - CARD_WIDTH) / 2;

export default function FreeHomeScreen() {
  const navigation = useNavigation();
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  const quickLinks = [
    {
      icon: 'information-circle',
      title: 'Über Valuntir',
      description: '100% verifizierte Erfolgsquoten für fundierte Entscheidungen',
      screen: 'AboutValuntir',
    },
    {
      icon: 'shield-checkmark',
      title: 'Valuntir Security-System',
      description: 'Bank-Level-Verschlüsselung & vollständiger Betrugsschutz',
      screen: 'TrustAndSafety',
    },
    {
      icon: 'rocket',
      title: 'First Mover Programm',
      description: 'Verdiene passiv durch alltägliche Zahlungen die du sowieso machst',
      screen: 'FirstMoverSystem',
    },
    {
      icon: 'people',
      title: 'Freunde einladen',
      description: 'Teile Valuntir & profitiere gemeinsam mit deinen Freunden',
      screen: 'InviteFriends',
    },
    {
      icon: 'chatbubble-ellipses',
      title: 'Support & FAQ',
      description: 'Schnelle Hilfe per Chat oder häufige Fragen durchstöbern',
      screen: 'SupportChat',
    },
  ];

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#F8F9FA', '#FFFFFF', '#F8F9FA']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        <SafeAreaView style={styles.safeArea} edges={['top']}>
          <View style={styles.content}>
                {/* Hero Section */}
                <View style={styles.hero}>
                  <View style={styles.badge}>
                    <Image 
                      source={require('../../assets/V - transparent.png')} 
                      style={styles.badgeIcon}
                      resizeMode="contain"
                    />
                    <Text style={styles.badgeText}>Valuntir</Text>
                  </View>
                  
                  <Text style={styles.headline}>
                    Die besten Partner{'\n'}aus jeder Branche
                  </Text>

                  <Text style={styles.subheadline}>
                    Valuntirs verifizierte Erfolgsraten zeigen dir{'\n'}schwarz auf weiß, wer wirklich liefert.
                  </Text>
                </View>

                {/* Platform Activity Metrics */}
                <View style={styles.platformMetrics}>
                  <View style={styles.metricsHeader}>
                    <Ionicons name="pulse" size={16} color="#10B981" />
                    <Text style={styles.metricsHeaderText}>Live auf der Plattform</Text>
                  </View>

                  <View style={styles.metricsGrid}>
                    <View style={styles.metricItem}>
                      <Text style={styles.metricNumber}>12.589</Text>
                      <Text style={styles.metricLabel}>Verifizierte Bewertungen</Text>
                      <View style={styles.metricGrowth}>
                        <Ionicons name="trending-up" size={12} color="#10B981" />
                        <Text style={styles.metricGrowthText}>+18% in 30 Tagen</Text>
                      </View>
                    </View>

                    <View style={styles.metricDivider}>
                      <View style={styles.metricDividerLine} />
                    </View>

                    <View style={styles.metricItem}>
                      <Text style={styles.metricNumber}>683.479€</Text>
                      <Text style={styles.metricLabel}>Bewertetes Volumen</Text>
                      <View style={styles.metricGrowth}>
                        <Ionicons name="trending-up" size={12} color="#10B981" />
                        <Text style={styles.metricGrowthText}>+24% in 30 Tagen</Text>
                      </View>
                    </View>
                  </View>

                  <View style={styles.metricsFooter}>
                    <View style={styles.footerItem}>
                      <Ionicons name="checkmark-circle" size={14} color="#3B82F6" />
                      <Text style={styles.footerText}>500+ öffentliche Erfolgsraten</Text>
                    </View>
                  </View>
                </View>

                {/* Quick Links / Features - Simple Carousel */}
                <View style={styles.carouselFullWidth}>
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    decelerationRate="fast"
                    snapToInterval={SNAP_DISTANCE}
                    contentContainerStyle={styles.carouselContent}
                    style={styles.carouselScrollView}
                    bounces={false}
                    scrollEventThrottle={16}
                    onScroll={(event) => {
                      const scrollX = event.nativeEvent.contentOffset.x;
                      const currentIndex = Math.round(scrollX / SNAP_DISTANCE);
                      setActiveCardIndex(currentIndex);
                    }}
                  >
                    {quickLinks.map((item, index) => {
                      const isActive = index === activeCardIndex;
                      const scale = isActive ? 1 : 0.92;
                      return (
                        <View
                          key={index}
                          style={[
                            styles.carouselCardWrapper,
                            { 
                              zIndex: isActive ? 999 : (quickLinks.length - index),
                              transform: [{ scale }]
                            }
                          ]}
                        >
                          <TouchableOpacity
                            style={[
                              styles.carouselCard,
                              !isActive && styles.carouselCardInactive
                            ]}
                            onPress={() => navigation.navigate(item.screen)}
                            activeOpacity={0.9}
                          >
                            <View style={styles.carouselCardTop}>
                              <View style={styles.carouselIconContainer}>
                                <Ionicons 
                                  name={item.icon} 
                                  size={24} 
                                  color="#3B82F6"
                                />
                              </View>
                              <View style={styles.carouselCardArrow}>
                                <Ionicons name="arrow-forward" size={18} color="#3B82F6" />
                              </View>
                            </View>
                            <View style={styles.carouselCardContent}>
                              <Text style={styles.carouselCardTitle}>{item.title}</Text>
                              <Text style={styles.carouselCardDescription} numberOfLines={2}>{item.description}</Text>
                            </View>
                          </TouchableOpacity>
                        </View>
                      );
                    })}
                  </ScrollView>
                </View>
          </View>
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
    flex: 1,
    paddingHorizontal: 20,
  },
  carouselFullWidth: {
    marginHorizontal: -20,
    backgroundColor: 'transparent',
  },
  carouselScrollView: {
    backgroundColor: 'transparent',
    flexGrow: 0,
  },
  hero: {
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 48,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  badgeIcon: {
    width: 16,
    height: 16,
  },
  badgeText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#000000',
  },
  headline: {
    fontSize: 36,
    fontWeight: '900',
    color: '#000000',
    textAlign: 'center',
    marginBottom: 16,
    letterSpacing: -1,
    lineHeight: 42,
  },
  subheadline: {
    fontSize: 16,
    fontWeight: '500',
    color: '#666666',
    textAlign: 'center',
    lineHeight: 24,
  },
  carouselSection: {
    marginBottom: 20,
    backgroundColor: 'transparent',
  },
  carouselTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#000000',
    marginBottom: 20,
    paddingHorizontal: 0,
    letterSpacing: -0.5,
  },
  carouselContent: {
    paddingLeft: SIDE_PADDING,
    paddingRight: SIDE_PADDING + CARD_OVERLAP,
    backgroundColor: 'transparent',
    alignItems: 'flex-start',
  },
  carouselCardWrapper: {
    width: CARD_WIDTH,
    marginRight: -CARD_OVERLAP,
    overflow: 'visible',
    backgroundColor: 'transparent',
  },
  carouselCard: {
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 18,
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.2)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  carouselCardInactive: {
    shadowOpacity: 0,
    elevation: 0,
  },
  carouselCardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 0,
  },
  carouselIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#E0EFFE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  carouselCardContent: {
    flex: 1,
    justifyContent: 'flex-start',
    marginTop: 16,
  },
  carouselCardTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#000000',
    marginBottom: 6,
    letterSpacing: -0.3,
  },
  carouselCardDescription: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666666',
    lineHeight: 20,
    minHeight: 40,
  },
  carouselCardArrow: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  platformMetrics: {
    marginBottom: 40,
  },
  metricsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 24,
  },
  metricsHeaderText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#10B981',
  },
  metricsGrid: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  metricItem: {
    flex: 1,
    alignItems: 'center',
  },
  metricDivider: {
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  metricDividerLine: {
    width: 1,
    height: 60,
    backgroundColor: '#E5E5E5',
  },
  metricNumber: {
    fontSize: 32,
    fontWeight: '900',
    color: '#000000',
    marginBottom: 4,
    letterSpacing: -1,
  },
  metricLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#666666',
    textAlign: 'center',
    marginBottom: 8,
    lineHeight: 18,
  },
  metricGrowth: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  metricGrowthText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#10B981',
  },
  metricsFooter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  footerText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666666',
  },
});
