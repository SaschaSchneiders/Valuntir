import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProPlanPromoScreen({ onUpgrade }) {
  const scrollY = useRef(new Animated.Value(0)).current;
  const [isExpanded, setIsExpanded] = useState(false);
  const screenWidth = Dimensions.get('window').width;

  // Animation Trigger: Erst bei 1200px Scroll → Button wird breit (ganz am Ende)
  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { 
      useNativeDriver: false,
      listener: (event) => {
        const offsetY = event.nativeEvent.contentOffset.y;
        setIsExpanded(offsetY > 1200);
      }
    }
  );

  // Animierte Werte für smooth Transition
  const buttonWidth = scrollY.interpolate({
    inputRange: [0, 1200, 1400],
    outputRange: [64, 64, screenWidth - 40], // Rund → Volle Breite minus 20px padding
    extrapolate: 'clamp',
  });

  const buttonBorderRadius = scrollY.interpolate({
    inputRange: [0, 1200, 1400],
    outputRange: [32, 32, 16], // Kreis → abgerundet
    extrapolate: 'clamp',
  });

  const buttonRight = scrollY.interpolate({
    inputRange: [0, 1200, 1400],
    outputRange: [20, 20, 20],
    extrapolate: 'clamp',
  });

  const iconOpacity = scrollY.interpolate({
    inputRange: [0, 1200, 1300, 9999],
    outputRange: [1, 1, 0, 0], // Icon verschwindet
    extrapolate: 'clamp',
  });

  const textOpacity = scrollY.interpolate({
    inputRange: [1200, 1300, 1400, 9999],
    outputRange: [0, 0.5, 1, 1], // Text erscheint und bleibt
    extrapolate: 'clamp',
  });

  const features = [
    {
      icon: 'star',
      title: 'Bewertungen abgeben',
      description: 'Teile deine Erfahrungen und hilf anderen bei der Anbieter-Wahl',
      isPrimary: true,
    },
    {
      icon: 'eye-outline',
      title: 'Unbegrenzt Profile ansehen',
      description: 'Keine Limits mehr – recherchiere so viel du willst',
      isPrimary: true,
    },
    {
      icon: 'remove-circle-outline',
      title: 'Werbefrei',
      description: 'Genieße Valuntir ohne Ablenkungen und Unterbrechungen',
      isPrimary: true,
    },
    {
      icon: 'rocket-outline',
      title: 'First-Mover werden',
      description: 'Sei der Erste, der einen Anbieter bewertet – und profitiere dauerhaft',
      isPrimary: false,
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
          <ScrollView 
            style={styles.scrollView}
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
            onScroll={handleScroll}
            scrollEventThrottle={16}
          >
            {/* Hero Section */}
            <View style={styles.hero}>
              <View style={styles.badge}>
                <Ionicons name="sparkles" size={16} color="#3B82F6" />
                <Text style={styles.badgeText}>Valuntir Pro</Text>
              </View>
              
              <Text style={styles.headline}>
                Bewerte Anbieter.{'\n'}Baue Vertrauen auf.
              </Text>
              
              <Text style={styles.subheadline}>
                Werde aktiver Teil der transparentesten{'\n'}Wirtschafts-Community
              </Text>
            </View>

            {/* Features Grid */}
            <View style={styles.featuresSection}>
              {features.map((feature, index) => (
                <View 
                  key={index} 
                  style={[
                    styles.featureCard,
                    feature.isPrimary && styles.featureCardPrimary
                  ]}
                >
                  <View style={[
                    styles.iconContainer,
                    feature.isPrimary && styles.iconContainerPrimary
                  ]}>
                    <Ionicons 
                      name={feature.icon} 
                      size={24} 
                      color={feature.isPrimary ? '#3B82F6' : '#666666'}
                    />
                  </View>
                  <Text style={styles.featureTitle}>{feature.title}</Text>
                  <Text style={styles.featureDescription}>{feature.description}</Text>
                </View>
              ))}
            </View>

            {/* FirstMover Explanation */}
            <View style={styles.firstMoverSection}>
              <View style={styles.firstMoverHeader}>
                <Ionicons name="trophy" size={24} color="#FFD700" />
                <Text style={styles.firstMoverTitle}>Das First-Mover-Prinzip</Text>
              </View>
              
              <Text style={styles.firstMoverDescription}>
                Bewerte Anbieter als Erster, und erhalte 10% ihres Abo-Preises – dauerhaft. 
                Je mehr First-Mover-Bewertungen, desto höher dein passives Einkommen.
              </Text>

              <View style={styles.exampleBox}>
                <View style={styles.exampleRow}>
                  <Ionicons name="checkmark-circle" size={20} color="#10B981" />
                  <Text style={styles.exampleText}>
                    <Text style={styles.exampleBold}>1 Anbieter</Text> meldet sich an → 
                    <Text style={styles.exampleBold}> 4,90€/Monat</Text>
                  </Text>
                </View>
                
                <View style={styles.milestoneRow}>
                  <View style={styles.milestoneLine} />
                  <View style={styles.milestoneBox}>
                    <Ionicons name="gift" size={16} color="#10B981" />
                    <Text style={styles.milestoneText}>Dein Pro-Abo ist kostenlos</Text>
                  </View>
                  <View style={styles.milestoneLine} />
                </View>

                <View style={styles.scalingSection}>
                  <Text style={styles.scalingHeader}>Und es geht weiter:</Text>
                  
                  <View style={styles.scalingRow}>
                    <Text style={styles.scalingText}>
                      <Text style={styles.scalingBold}>10 Anbieter</Text> → 
                      <Text style={styles.scalingHighlight}> +49€/Monat</Text>
                    </Text>
                  </View>
                  
                  <View style={styles.scalingRow}>
                    <Text style={styles.scalingText}>
                      <Text style={styles.scalingBold}>100 Anbieter</Text> → 
                      <Text style={styles.scalingHighlight}> +490€/Monat</Text>
                    </Text>
                  </View>
                </View>
              </View>

              <Text style={styles.firstMoverFootnote}>
                Unbegrenzt skalierbar – bewerte so viele Anbieter wie du möchtest.
              </Text>
            </View>

            {/* Price Section */}
            <View style={styles.priceSection}>
              <View style={styles.priceBox}>
                <Text style={styles.priceLabel}>Pro-Abo</Text>
                <View style={styles.priceRow}>
                  <Text style={styles.priceAmount}>4,90€</Text>
                  <Text style={styles.pricePeriod}>/Monat</Text>
                </View>
                <Text style={styles.priceDescription}>
                  Jederzeit kündbar. Keine versteckten Kosten.
                </Text>
              </View>
            </View>

            {/* Trust Elements */}
            <View style={styles.trustSection}>
              <View style={styles.trustItem}>
                <Ionicons name="shield-checkmark" size={18} color="#10B981" />
                <Text style={styles.trustText}>Keine Vertragsbindung</Text>
              </View>
              <View style={styles.trustItem}>
                <Ionicons name="card" size={18} color="#10B981" />
                <Text style={styles.trustText}>Sicher verschlüsselt</Text>
              </View>
              <View style={styles.trustItem}>
                <Ionicons name="people" size={18} color="#10B981" />
                <Text style={styles.trustText}>Transparente Community</Text>
              </View>
            </View>

            {/* Bottom Spacer für FAB */}
            <View style={{ height: 180 }} />
          </ScrollView>

          {/* Animated Floating Action Button */}
          <Animated.View
            style={[
              styles.fabContainer,
              {
                width: buttonWidth,
                borderRadius: buttonBorderRadius,
                right: buttonRight,
              },
            ]}
          >
            <TouchableOpacity 
              style={styles.fab}
              onPress={onUpgrade}
              activeOpacity={0.9}
            >
              {/* Icon (sichtbar wenn rund) */}
              <Animated.View style={{ opacity: iconOpacity }}>
                <Ionicons name="sparkles" size={28} color="#FFFFFF" />
              </Animated.View>
              
              {/* Text (sichtbar wenn breit) */}
              <Animated.View 
                style={[
                  styles.fabTextContainer,
                  { 
                    opacity: textOpacity,
                    position: isExpanded ? 'relative' : 'absolute',
                  }
                ]}
              >
                <Ionicons name="sparkles" size={20} color="#FFFFFF" style={{ marginRight: 8 }} />
                <Text style={styles.fabText}>Auf Valuntir Pro upgraden</Text>
              </Animated.View>
            </TouchableOpacity>
          </Animated.View>
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
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
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
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.2)',
  },
  badgeText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#3B82F6',
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
  featuresSection: {
    marginBottom: 48,
    gap: 16,
  },
  featureCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
  },
  featureCardPrimary: {
    borderColor: 'rgba(59, 130, 246, 0.2)',
    backgroundColor: 'rgba(59, 130, 246, 0.02)',
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconContainerPrimary: {
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 8,
    letterSpacing: -0.3,
  },
  featureDescription: {
    fontSize: 15,
    fontWeight: '500',
    color: '#666666',
    lineHeight: 22,
  },
  firstMoverSection: {
    backgroundColor: 'rgba(255, 215, 0, 0.05)',
    borderRadius: 24,
    padding: 24,
    marginBottom: 48,
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.2)',
  },
  firstMoverHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  firstMoverTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000000',
    letterSpacing: -0.3,
  },
  firstMoverDescription: {
    fontSize: 15,
    fontWeight: '500',
    color: '#333333',
    lineHeight: 22,
    marginBottom: 20,
  },
  exampleBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    gap: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  exampleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  exampleText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666666',
    flex: 1,
  },
  exampleBold: {
    fontWeight: '700',
    color: '#000000',
  },
  milestoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12,
    gap: 8,
  },
  milestoneLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#10B981',
    opacity: 0.3,
  },
  milestoneBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  milestoneText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#10B981',
  },
  scalingSection: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  scalingHeader: {
    fontSize: 13,
    fontWeight: '600',
    color: '#666666',
    marginBottom: 8,
    fontStyle: 'italic',
  },
  scalingRow: {
    paddingVertical: 4,
  },
  scalingText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666666',
  },
  scalingBold: {
    fontWeight: '700',
    color: '#333333',
  },
  scalingHighlight: {
    fontWeight: '800',
    color: '#10B981',
  },
  firstMoverFootnote: {
    fontSize: 13,
    fontWeight: '500',
    color: '#999999',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  priceSection: {
    marginBottom: 32,
  },
  priceBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  priceLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666666',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 8,
  },
  priceAmount: {
    fontSize: 48,
    fontWeight: '900',
    color: '#000000',
    letterSpacing: -2,
  },
  pricePeriod: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666666',
    marginLeft: 4,
  },
  priceDescription: {
    fontSize: 13,
    fontWeight: '500',
    color: '#999999',
    textAlign: 'center',
  },
  fabContainer: {
    position: 'absolute',
    bottom: 120,
    height: 64,
    backgroundColor: '#000000',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 999,
    zIndex: 999,
    overflow: 'hidden',
  },
  fab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  fabTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  fabText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: -0.3,
  },
  trustSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 20,
    marginBottom: 24,
  },
  trustItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  trustText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#666666',
  },
});

