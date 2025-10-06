import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function ProfileCard({
  isPublicView,
  onToggleChange,
  onSettingsPress,
  companyName,
  branch,
  coverImage = null, // URL zum Titelbild (optional)
}) {
  return (
    <View style={styles.profileCard}>
      {/* Titelbild - nur wenn gesetzt */}
      {coverImage && (
        <View style={styles.coverImageContainer}>
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
        </View>
      )}

      {/* Toggle - Absolut positioniert */}
      <View style={styles.toggleContainer}>
        <Switch
          value={isPublicView}
          onValueChange={onToggleChange}
          trackColor={{ false: '#D1D5DB', true: '#000000' }}
          thumbColor="#FFFFFF"
        />
        <Text style={styles.toggleLabel}>
          {isPublicView ? 'Öffentlich' : 'Anbieter'}
        </Text>
      </View>

      {/* Settings Button - Absolut positioniert */}
      <TouchableOpacity 
        style={styles.settingsButton}
        onPress={onSettingsPress}
      >
        <Ionicons name="settings-outline" size={28} color="#666" />
      </TouchableOpacity>

      {/* Avatar - überlappt Titelbild wenn vorhanden */}
      <View style={[
        styles.avatarContainer,
        coverImage && styles.avatarContainerWithCover
      ]}>
        <View style={styles.avatar}>
          <Ionicons name="business" size={48} color="#FFFFFF" />
        </View>
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
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 8,
    zIndex: 10,
  },
  toggleLabel: {
    fontSize: 11,
    color: '#666',
    marginTop: 4,
    fontWeight: '600',
  },
  settingsButton: {
    position: 'absolute',
    top: 12,
    right: -8, // Angepasst für negative Margins
    backgroundColor: 'rgba(245, 245, 245, 0.95)',
    borderRadius: 12,
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
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFFFFF', // Weißer Ring für Kontrast
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
    borderRadius: 20,
    gap: 6,
  },
  branchText: {
    fontSize: 13,
    color: '#666',
    fontWeight: '500',
  },
});

