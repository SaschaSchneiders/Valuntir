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
  location,
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

      {/* Share Button - unter Titelbild, rechts */}
      <TouchableOpacity 
        style={styles.shareButton}
        onPress={() => {
          // TODO: Share Funktionalität implementieren
          console.log('Share Profile');
        }}
      >
        <Ionicons name="share-outline" size={20} color="#666" />
      </TouchableOpacity>

      {/* Content Container */}
      <View style={styles.contentContainer}>
        {/* Avatar - links positioniert, überlappt Titelbild */}
        <View style={styles.avatarWrapper}>
          <ProfileImageFallback size={100} iconSize={48} variant="profile" />
        </View>

        {/* Firmeninfo - ganz linksbündig */}
        <View style={styles.companyInfo}>
          <Text style={styles.companyName}>{companyName}</Text>
          
          <View style={styles.badgeRow}>
            <View style={styles.branchBadge}>
              <Ionicons name="briefcase-outline" size={14} color="#666" />
              <Text style={styles.branchText}>{branch}</Text>
            </View>
            {location && (
              <View style={styles.locationBadge}>
                <Ionicons name="location-outline" size={14} color="#666" />
                <Text style={styles.locationText}>{location}</Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  profileCard: {
    paddingVertical: 20,
    position: 'relative',
  },
  coverImageContainer: {
    position: 'absolute',
    top: -20,
    left: -20,
    right: -20,
    height: 140,
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
    left: -8,
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
    right: -8,
    backgroundColor: 'rgba(245, 245, 245, 0.95)',
    borderRadius: 22,
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  shareButton: {
    position: 'absolute',
    top: 140,
    right: 4,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.08)',
    zIndex: 5,
  },
  contentContainer: {
    marginTop: 50,
    paddingLeft: 0,
    alignItems: 'flex-start',
  },
  avatarWrapper: {
    marginBottom: 12,
    marginLeft: 20,
  },
  companyInfo: {
    alignItems: 'flex-start',
    paddingLeft: 0,
  },
  companyName: {
    fontSize: 22,
    fontWeight: '800',
    color: '#000',
    textAlign: 'left',
    marginBottom: 6,
  },
  badgeRow: {
    flexDirection: 'row',
    gap: 8,
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
  locationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 24,
    gap: 6,
  },
  locationText: {
    fontSize: 13,
    color: '#666',
    fontWeight: '500',
  },
});

