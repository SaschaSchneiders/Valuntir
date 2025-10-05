import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Slider from '@react-native-community/slider';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import ProviderCard from '../shared/ProviderCard';

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [locationQuery, setLocationQuery] = useState('');
  const [radius, setRadius] = useState(50); // in km
  const [showFilters, setShowFilters] = useState(false);
  const [isLocationFocused, setIsLocationFocused] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // Animation values for Search Overlay
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  // Animation values for Filter Modal
  const filterFadeAnim = useRef(new Animated.Value(0)).current;
  const filterSlideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    if (isSearchFocused) {
      // Reset to initial state first
      fadeAnim.setValue(0);
      slideAnim.setValue(50);
      
      // Faster animation to match keyboard
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 50,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isSearchFocused, fadeAnim, slideAnim]);

  useEffect(() => {
    if (showFilters) {
      // Reset to initial state first
      filterFadeAnim.setValue(0);
      filterSlideAnim.setValue(50);
      
      // Then animate in
      Animated.parallel([
        Animated.timing(filterFadeAnim, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.spring(filterSlideAnim, {
          toValue: 0,
          tension: 40,
          friction: 8,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(filterFadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(filterSlideAnim, {
          toValue: 50,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [showFilters, filterFadeAnim, filterSlideAnim]);

  // Mock-Daten für Anbieter
  const providers = [
    {
      id: 1,
      name: 'Steuerberater Schmidt',
      username: '@steuerberater_schmidt',
      category: 'Steuerberatung',
      location: 'Hamburg',
      successRate: 93,
      reviewCount: 24,
      hasActivePlan: true,
    },
    {
      id: 2,
      name: 'Marketing Agentur XYZ',
      username: '@marketing_xyz',
      category: 'Marketing',
      location: 'Berlin',
      successRate: 87,
      reviewCount: 31,
      hasActivePlan: true,
    },
    {
      id: 3,
      name: 'IT-Consulting Pro',
      username: '@it_consulting_pro',
      category: 'IT-Beratung',
      location: 'München',
      successRate: 91,
      reviewCount: 18,
      hasActivePlan: true,
    },
    {
      id: 4,
      name: 'Rechtsanwalt Müller',
      username: '@ra_mueller',
      category: 'Rechtsberatung',
      location: 'Frankfurt',
      successRate: null,
      reviewCount: 12,
      hasActivePlan: false,
    },
    {
      id: 5,
      name: 'Design Studio Alpha',
      username: '@design_alpha',
      category: 'Design',
      location: 'Köln',
      successRate: 95,
      reviewCount: 42,
      hasActivePlan: true,
    },
  ];

  const categories = [
    { key: 'all', label: 'Alle' },
    { key: 'steuerberatung', label: 'Steuer' },
    { key: 'marketing', label: 'Marketing' },
    { key: 'it', label: 'IT' },
    { key: 'recht', label: 'Recht' },
    { key: 'design', label: 'Design' },
  ];

  const popularSearches = [
    { id: 1, icon: 'trending-up', text: 'Steuern sparen', category: 'steuerberatung' },
    { id: 2, icon: 'cash-outline', text: 'Fixkosten senken', category: 'all' },
    { id: 3, icon: 'airplane-outline', text: 'Auswandern', category: 'recht' },
    { id: 4, icon: 'business-outline', text: 'Unternehmen verkaufen', category: 'recht' },
    { id: 5, icon: 'megaphone-outline', text: 'Online Marketing', category: 'marketing' },
  ];

  const filterProviders = () => {
    let filtered = providers;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => 
        p.category.toLowerCase().includes(selectedCategory.toLowerCase())
      );
    }

    if (locationQuery.trim()) {
      filtered = filtered.filter(p =>
        p.location.toLowerCase().includes(locationQuery.toLowerCase())
      );
    }

    if (searchQuery.trim()) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  };

  const filteredProviders = filterProviders();

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#F8F9FA', '#FFFFFF', '#F8F9FA']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <SafeAreaView style={styles.safeArea} edges={['top']}>
          <ScrollView contentContainerStyle={styles.content}>
            <View style={styles.header}>
              <Text style={styles.title}>Anbieter Suchen</Text>
              <Text style={styles.subtitle}>Finde vertrauenswürdige Partner</Text>
            </View>

            {/* Suchfeld + Filter in einer Zeile */}
            <View style={styles.searchFilterRow}>
              {/* Suchfeld */}
              <TouchableOpacity 
                style={styles.searchContainer}
                activeOpacity={1}
                onPress={() => setIsSearchFocused(true)}
              >
                <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
                <View style={styles.searchInput}>
                  <Text style={[
                    styles.searchPlaceholder,
                    searchQuery && styles.searchPlaceholderActive
                  ]}>
                    {searchQuery || 'Wonach suchst du?'}
                  </Text>
                </View>
                {searchQuery.length > 0 && (
                  <TouchableOpacity onPress={() => setSearchQuery('')}>
                    <Ionicons name="close-circle" size={20} color="#999" />
                  </TouchableOpacity>
                )}
              </TouchableOpacity>

              {/* Filter Toggle Button */}
              <TouchableOpacity 
                style={styles.filterToggle}
                onPress={() => setShowFilters(!showFilters)}
              >
                <Ionicons 
                  name={showFilters ? "options" : "options-outline"} 
                  size={22} 
                  color="#000" 
                />
                {(locationQuery || selectedCategory !== 'all') && (
                  <View style={styles.filterBadge} />
                )}
              </TouchableOpacity>
            </View>

            {/* Anbieter Liste */}
            <View style={styles.providersList}>
              {filteredProviders.length === 0 ? (
                <View style={styles.emptyState}>
                  <Ionicons name="search-outline" size={64} color="#999" />
                  <Text style={styles.emptyStateText}>
                    {searchQuery ? 'Keine Anbieter gefunden' : 'Starte deine Suche'}
                  </Text>
                </View>
              ) : (
                filteredProviders.map((provider) => (
                  <ProviderCard key={provider.id} provider={provider} />
                ))
              )}
            </View>

            {/* Info Box */}
            <View style={styles.infoBox}>
              <Ionicons name="information-circle" size={20} color="#666" />
              <Text style={styles.infoText}>
                Erfolgsquoten sind nur für Anbieter mit aktivem Valuntir-Abo sichtbar.
              </Text>
            </View>
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>

      {/* Search Overlay */}
      {isSearchFocused && (
        <View style={styles.searchOverlayFullscreen}>
          <Animated.View 
            style={[
              styles.searchOverlayBackdrop,
              { opacity: fadeAnim }
            ]}
          >
            <TouchableOpacity 
              style={StyleSheet.absoluteFill}
              activeOpacity={1}
              onPress={() => {
                setIsSearchFocused(false);
              }}
            />
          </Animated.View>
          <Animated.View 
            style={[
              styles.searchOverlayContent,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }]
              }
            ]}
          >
            {/* Prominentes Suchfeld */}
            <View style={styles.searchOverlayInputContainer}>
              <Ionicons name="search" size={22} color="#000" style={styles.searchIcon} />
              <TextInput
                style={styles.searchOverlayInput}
                placeholder="Wonach suchst du?"
                placeholderTextColor="#999"
                value={searchQuery}
                onChangeText={setSearchQuery}
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="done"
                autoFocus={true}
                onBlur={() => {
                  // Verzögerung damit Klicks auf Suchen noch funktionieren
                  setTimeout(() => setIsSearchFocused(false), 100);
                }}
              />
              {searchQuery.length > 0 && (
                <TouchableOpacity onPress={() => setSearchQuery('')}>
                  <Ionicons name="close-circle" size={22} color="#999" />
                </TouchableOpacity>
              )}
            </View>

            {/* Häufig gesucht - Kompakt ohne Container */}
            <View style={styles.popularSearchesSection}>
              <Text style={styles.popularSearchesTitle}>Häufig gesucht</Text>
              <ScrollView 
                style={styles.popularSearchesList}
                showsVerticalScrollIndicator={false}
              >
                {popularSearches.map((search) => (
                  <TouchableOpacity
                    key={search.id}
                    style={styles.popularSearchItem}
                    onPress={() => {
                      setSearchQuery(search.text);
                      setSelectedCategory(search.category);
                    }}
                  >
                    <Ionicons name="trending-up" size={16} color="rgba(255, 255, 255, 0.8)" style={styles.popularSearchIcon} />
                    <Text style={styles.popularSearchText}>{search.text}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </Animated.View>
        </View>
      )}

      {/* Filter Overlay */}
      {showFilters && (
        <View style={styles.filterOverlayFullscreen}>
          <Animated.View 
            style={[
              styles.filterOverlayBackdrop,
              { opacity: filterFadeAnim }
            ]}
          >
            <TouchableOpacity 
              style={StyleSheet.absoluteFill}
              activeOpacity={1}
              onPress={() => setShowFilters(false)}
            />
          </Animated.View>
          <Animated.View 
            style={[
              styles.filterOverlayContent,
              {
                opacity: filterFadeAnim,
                transform: [{ translateY: filterSlideAnim }]
              }
            ]}
          >
            <TouchableOpacity 
              activeOpacity={1}
              onPress={(e) => e.stopPropagation()}
            >
              <View style={styles.filtersContainer}>
              {/* Header mit Zurücksetzen-Button */}
              <View style={styles.filterHeader}>
                <Text style={styles.filterHeaderTitle}>Filter</Text>
                <TouchableOpacity 
                  onPress={() => {
                    setLocationQuery('');
                    setSelectedCategory('all');
                    setRadius(50);
                  }}
                  disabled={!(locationQuery || selectedCategory !== 'all')}
                  style={styles.resetButton}
                >
                  <Text style={[
                    styles.resetButtonText,
                    !(locationQuery || selectedCategory !== 'all') && styles.resetButtonTextDisabled
                  ]}>
                    Zurücksetzen
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Standort-Filter */}
              <View style={styles.filterSection}>
              <Text style={styles.filterSectionTitle}>Standort</Text>
              <View style={styles.locationInputContainer}>
                <Ionicons name="location-outline" size={20} color="#999" style={styles.locationIcon} />
                <TextInput
                  style={styles.locationInput}
                  placeholder="Stadt oder PLZ..."
                  placeholderTextColor="#999"
                  value={locationQuery}
                  onChangeText={setLocationQuery}
                  onFocus={() => setIsLocationFocused(true)}
                  onBlur={() => setIsLocationFocused(false)}
                  autoCapitalize="none"
                  autoCorrect={false}
                  returnKeyType="done"
                />
                {locationQuery.length > 0 && (
                  <TouchableOpacity onPress={() => setLocationQuery('')}>
                    <Ionicons name="close-circle" size={20} color="#999" />
                  </TouchableOpacity>
                )}
              </View>

              {/* Radius Slider */}
              {(locationQuery.length > 0 || isLocationFocused) && (
                <View style={styles.radiusContainer}>
                  <View style={styles.radiusHeader}>
                    <Text style={styles.radiusLabel}>Umkreis</Text>
                    <Text style={styles.radiusValue}>{radius} km</Text>
                  </View>
                  <Slider
                    style={styles.slider}
                    minimumValue={5}
                    maximumValue={200}
                    step={5}
                    value={radius}
                    onValueChange={setRadius}
                    minimumTrackTintColor="#000000"
                    maximumTrackTintColor="#E5E5E5"
                    thumbTintColor="#000000"
                  />
                  <View style={styles.radiusMarkers}>
                    <Text style={styles.radiusMarker}>5 km</Text>
                    <Text style={styles.radiusMarker}>200 km</Text>
                  </View>
                </View>
              )}
            </View>

            {/* Kategorie Filter */}
            <View style={[styles.filterSection, { marginBottom: 0 }]}>
              <Text style={styles.filterSectionTitle}>Branche</Text>
              <View style={styles.categoryContainer}>
                {categories.map((cat) => (
                  <TouchableOpacity
                    key={cat.key}
                    style={[
                      styles.categoryTab,
                      selectedCategory === cat.key && styles.categoryTabActive
                    ]}
                    onPress={() => setSelectedCategory(cat.key)}
                  >
                    <Text
                      style={[
                        styles.categoryTabText,
                        selectedCategory === cat.key && styles.categoryTabTextActive
                      ]}
                    >
                      {cat.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Apply Button */}
            <TouchableOpacity 
              style={styles.applyButton}
              onPress={() => setShowFilters(false)}
            >
              <Text style={styles.applyButtonText}>
                Anzeigen ({filteredProviders.length})
              </Text>
            </TouchableOpacity>
            </View>
            </TouchableOpacity>
          </Animated.View>
        </View>
      )}
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
    padding: 20,
  },
  header: {
    marginBottom: 24,
    paddingTop: 8,
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
  searchFilterRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.06)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
  },
  searchPlaceholder: {
    fontSize: 16,
    color: '#999',
    fontWeight: '500',
  },
  searchPlaceholderActive: {
    color: '#000',
  },
  filterToggle: {
    width: 56,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.06)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  filterBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
  },
  searchOverlayFullscreen: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 2000,
  },
  searchOverlayBackdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  searchOverlayContent: {
    position: 'absolute',
    top: 180,
    left: 20,
    right: 20,
  },
  searchOverlayInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderWidth: 2,
    borderColor: '#000000',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.25,
    shadowRadius: 30,
    elevation: 20,
  },
  searchOverlayInput: {
    flex: 1,
    fontSize: 18,
    color: '#000',
    fontWeight: '500',
    letterSpacing: -0.3,
  },
  popularSearchesSection: {
    marginTop: 24,
    flex: 1,
  },
  popularSearchesTitle: {
    fontSize: 10,
    fontWeight: '700',
    color: 'rgba(255, 255, 255, 0.5)',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    marginBottom: 14,
  },
  popularSearchesList: {
    maxHeight: 280,
  },
  popularSearchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    marginBottom: 2,
  },
  popularSearchIcon: {
    marginRight: 10,
  },
  popularSearchText: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
    letterSpacing: -0.2,
  },
  filterOverlayFullscreen: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
  },
  filterOverlayBackdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  filterOverlayContent: {
    position: 'absolute',
    top: 200,
    left: 20,
    right: 20,
  },
  filtersContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 10,
  },
  filterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  filterHeaderTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#000',
    letterSpacing: -0.5,
  },
  resetButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  resetButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  resetButtonTextDisabled: {
    color: '#CCCCCC',
  },
  filterSection: {
    marginBottom: 20,
  },
  filterSectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    marginBottom: 12,
  },
  locationInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.06)',
  },
  locationIcon: {
    marginRight: 10,
  },
  locationInput: {
    flex: 1,
    fontSize: 15,
    color: '#000',
    fontWeight: '500',
  },
  radiusContainer: {
    marginTop: 16,
    backgroundColor: '#FAFAFA',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.05)',
  },
  radiusHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  radiusLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  radiusValue: {
    fontSize: 16,
    fontWeight: '800',
    color: '#000',
  },
  slider: {
    width: '100%',
    height: 40,
  },
  radiusMarkers: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: -8,
  },
  radiusMarker: {
    fontSize: 11,
    color: '#999',
    fontWeight: '500',
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryTab: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.06)',
  },
  categoryTabActive: {
    backgroundColor: '#000000',
    borderColor: '#000000',
  },
  categoryTabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666666',
  },
  categoryTabTextActive: {
    color: '#FFFFFF',
  },
  applyButton: {
    backgroundColor: '#000000',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  applyButtonText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -0.3,
  },
  providersList: {
    gap: 16,
    marginBottom: 24,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#999999',
    fontWeight: '500',
    marginTop: 16,
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 16,
    padding: 16,
    gap: 12,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.06)',
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    color: '#666666',
    fontWeight: '500',
    lineHeight: 18,
  },
});
