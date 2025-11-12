import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import FallbackCoverImage from './FallbackCoverImage';
import ProfileImageFallback from './ProfileImageFallback';

export default function ProfileCard({
  isPublicView,
  onToggleChange,
  onSettingsPress,
  companyName,
  branch,
  coverImage = null, // URL zum Titelbild (optional)
  showControls = true, // Toggle und Settings Button anzeigen
}) {
  return (
    <View style={styles.profileCard}>
      {/* Titelbild - immer angezeigt (mit Fallback wenn nicht gesetzt) */}
      <View style={styles.coverImageContainer}>
        {coverImage ? (
          <ImageBackground
            source={{ uri: coverImage }}
            style={styles.coverImage}
            imageStyle={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
          >
            <LinearGradient
              colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.3)']}
              style={styles.coverOverlay}
            />
          </ImageBackground>
        ) : (
          <FallbackCoverImage />
        )}
      </View>

      {/* Toggle - Absolut positioniert - nur wenn showControls true */}
      {showControls && (
        <View style={styles.toggleContainer}>
          <Switch
            value={isPublicView}
            onValueChange={onToggleChange}
            trackColor={{ false: '#D1D5DB', true: '#000000' }}
            thumbColor="#FFFFFF"
            style={{ transform: [{ scale: 0.85 }] }}
          />
          <Text style={styles.toggleLabel}>
            {isPublicView ? 'Öffentlich' : 'Anbieter'}
          </Text>
        </View>
      )}

      {/* Settings Button - Absolut positioniert - nur wenn showControls true */}
      {showControls && (
        <TouchableOpacity 
          style={styles.settingsButton}
          onPress={onSettingsPress}
        >
          <Ionicons name="settings-outline" size={28} color="#666" />
        </TouchableOpacity>
      )}

      {/* Avatar - überlappt Titelbild immer */}
      <View style={[styles.avatarContainer, styles.avatarContainerWithCover]}>
        <ProfileImageFallback size={100} iconSize={48} variant="profile" />
      </View>

      <Text style={styles.companyName}>{companyName}</Text>
      <View style={styles.branchBadge}>
        <Ionicons name="briefcase-outline" size={14} color="#666" />
        <Text style={styles.branchText}>{branch}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  profileCard: {
    alignItems: 'center',
    paddingVertical: 20,
    position: 'relative',
  },
  coverImageContainer: {
    position: 'absolute',
    top: -20, // Negatives Margin um das Screen-Padding zu kompensieren
    left: -20,
    right: -20,
    height: 140, // Erhöht von 80px auf 140px
    overflow: 'hidden',
  },
  coverImage: {
    width: '100%',
    height: '100%',
  },
  coverOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  toggleContainer: {
    position: 'absolute',
    top: 12,
    left: -8, // Angepasst für negative Margins
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'rgba(245, 245, 245, 0.95)',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 8,
    zIndex: 10,
  },
  toggleLabel: {
    fontSize: 10,
    color: '#666',
    marginTop: 2,
    fontWeight: '600',
  },
  settingsButton: {
    position: 'absolute',
    top: 12,
    right: -8, // Angepasst für negative Margins
    backgroundColor: 'rgba(245, 245, 245, 0.95)',
    borderRadius: 22,
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  avatarContainer: {
    marginBottom: 12,
  },
  avatarContainerWithCover: {
    marginTop: 50, // Avatar überlappt das Titelbild zur Hälfte
  },
  companyName: {
    fontSize: 22,
    fontWeight: '800',
    color: '#000',
    textAlign: 'center',
    marginBottom: 8,
  },
  branchBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 24,
    gap: 6,
  },
  branchText: {
    fontSize: 13,
    color: '#666',
    fontWeight: '500',
  },
});

