import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Slider from '@react-native-community/slider';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [locationQuery, setLocationQuery] = useState('');
  const [radius, setRadius] = useState(50); // in km
  const [showFilters, setShowFilters] = useState(false);

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
      successRate: null, // Kein aktives Abo
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

  const filterProviders = () => {
    let filtered = providers;

    // Nach Kategorie filtern
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => 
        p.category.toLowerCase().includes(selectedCategory.toLowerCase())
      );
    }

    // Nach Standort filtern
    if (locationQuery.trim()) {
      filtered = filtered.filter(p =>
        p.location.toLowerCase().includes(locationQuery.toLowerCase())
      );
      // Hinweis: In einer echten App würde hier eine Geocoding-API genutzt werden
      // um echte Distanzberechnungen mit dem Radius durchzuführen
    }

    // Nach Suchbegriff filtern (Name oder Branche)
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

  const getSuccessRateColor = (rate) => {
    if (rate >= 90) return '#22C55E';
    if (rate >= 80) return '#F59E0B';
    if (rate >= 70) return '#EF4444';
    return '#999999';
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#F8F9FA', '#FFFFFF', '#F8F9FA']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <SafeAreaView style={styles.safeArea}>
          <ScrollView contentContainerStyle={styles.content}>
            <View style={styles.header}>
              <Text style={styles.title}>Anbieter Suchen</Text>
              <Text style={styles.subtitle}>Finde vertrauenswürdige Partner</Text>
            </View>

            {/* Suchfeld */}
            <View style={styles.searchContainer}>
              <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
              <TextInput
                style={styles.searchInput}
                placeholder="Name oder Branche..."
                placeholderTextColor="#999"
                value={searchQuery}
                onChangeText={setSearchQuery}
                autoCapitalize="none"
                autoCorrect={false}
              />
              {searchQuery.length > 0 && (
                <TouchableOpacity onPress={() => setSearchQuery('')}>
                  <Ionicons name="close-circle" size={20} color="#999" />
                </TouchableOpacity>
              )}
            </View>

            {/* Filter Toggle Button */}
            <TouchableOpacity 
              style={styles.filterToggle}
              onPress={() => setShowFilters(!showFilters)}
            >
              <View style={styles.filterToggleLeft}>
                <Ionicons 
                  name={showFilters ? "options" : "options-outline"} 
                  size={20} 
                  color="#000" 
                />
                <Text style={styles.filterToggleText}>
                  Filter {locationQuery || selectedCategory !== 'all' ? '●' : ''}
                </Text>
              </View>
              <Ionicons 
                name={showFilters ? "chevron-up" : "chevron-down"} 
                size={20} 
                color="#666" 
              />
            </TouchableOpacity>

            {/* Expandierbare Filter */}
            {showFilters && (
              <View style={styles.filtersContainer}>
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
                      autoCapitalize="none"
                      autoCorrect={false}
                    />
                    {locationQuery.length > 0 && (
                      <TouchableOpacity onPress={() => setLocationQuery('')}>
                        <Ionicons name="close-circle" size={20} color="#999" />
                      </TouchableOpacity>
                    )}
                  </View>

                  {/* Radius Slider */}
                  {locationQuery.length > 0 && (
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
                <View style={styles.filterSection}>
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

                {/* Filter Reset */}
                {(locationQuery || selectedCategory !== 'all') && (
                  <TouchableOpacity 
                    style={styles.resetButton}
                    onPress={() => {
                      setLocationQuery('');
                      setSelectedCategory('all');
                      setRadius(50);
                    }}
                  >
                    <Text style={styles.resetButtonText}>Filter zurücksetzen</Text>
                  </TouchableOpacity>
                )}
              </View>
            )}

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
                  <TouchableOpacity
                    key={provider.id}
                    style={styles.providerCard}
                  >
                    <View style={styles.providerHeader}>
                      <View style={styles.providerIcon}>
                        <Ionicons name="briefcase" size={24} color="#000" />
                      </View>
                      <View style={styles.providerInfo}>
                        <Text style={styles.providerName}>{provider.name}</Text>
                        <Text style={styles.providerUsername}>{provider.username}</Text>
                      </View>
                    </View>

                    <View style={styles.providerDetails}>
                      <View style={styles.providerMeta}>
                        <View style={styles.metaItem}>
                          <Ionicons name="location-outline" size={14} color="#666" />
                          <Text style={styles.metaText}>{provider.location}</Text>
                        </View>
                        <View style={styles.metaItem}>
                          <Ionicons name="pricetag-outline" size={14} color="#666" />
                          <Text style={styles.metaText}>{provider.category}</Text>
                        </View>
                      </View>
                    </View>

                    <View style={styles.providerStats}>
                      <View style={styles.statItem}>
                        <Text style={styles.statLabel}>Bewertungen</Text>
                        <Text style={styles.statValue}>{provider.reviewCount}</Text>
                      </View>
                      
                      <View style={styles.statDivider} />
                      
                      <View style={styles.statItem}>
                        <Text style={styles.statLabel}>Erfolgsquote</Text>
                        {provider.hasActivePlan ? (
                          <Text 
                            style={[
                              styles.statValue, 
                              { color: getSuccessRateColor(provider.successRate) }
                            ]}
                          >
                            {provider.successRate}%
                          </Text>
                        ) : (
                          <View style={styles.lockedBadge}>
                            <Ionicons name="lock-closed" size={12} color="#999" />
                            <Text style={styles.lockedText}>Nicht aktiviert</Text>
                          </View>
                        )}
                      </View>
                    </View>

                    {provider.hasActivePlan && (
                      <TouchableOpacity style={styles.viewProfileButton}>
                        <Text style={styles.viewProfileText}>Profil ansehen</Text>
                        <Ionicons name="arrow-forward" size={16} color="#000" />
                      </TouchableOpacity>
                    )}
                  </TouchableOpacity>
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
    paddingBottom: 100,
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 20,
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
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
  },
  filterToggle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.06)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  filterToggleLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  filterToggleText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000',
  },
  filtersContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.06)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  filterSection: {
    marginBottom: 24,
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
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
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
    borderColor: 'transparent',
  },
  categoryTabActive: {
    backgroundColor: '#000000',
  },
  categoryTabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666666',
  },
  categoryTabTextActive: {
    color: '#FFFFFF',
  },
  resetButton: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  resetButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#666',
  },
  providersList: {
    gap: 16,
    marginBottom: 24,
  },
  providerCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.06)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  providerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  providerIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  providerInfo: {
    flex: 1,
  },
  providerName: {
    fontSize: 17,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 4,
  },
  providerUsername: {
    fontSize: 14,
    color: '#666666',
    fontWeight: '500',
  },
  providerDetails: {
    marginBottom: 16,
  },
  providerMeta: {
    flexDirection: 'row',
    gap: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaText: {
    fontSize: 13,
    color: '#666666',
    fontWeight: '500',
  },
  providerStats: {
    flexDirection: 'row',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    marginBottom: 16,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    backgroundColor: '#F0F0F0',
    marginHorizontal: 12,
  },
  statLabel: {
    fontSize: 12,
    color: '#999999',
    fontWeight: '500',
    marginBottom: 6,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '800',
    color: '#000000',
    letterSpacing: -0.5,
  },
  lockedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  lockedText: {
    fontSize: 10,
    color: '#999999',
    fontWeight: '600',
  },
  viewProfileButton: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  viewProfileText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#000000',
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

