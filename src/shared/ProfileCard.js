import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileCard({
  isPublicView,
  onToggleChange,
  onSettingsPress,
  companyName,
  branch,
}) {
  return (
    <View style={styles.profileCard}>
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

      <View style={styles.avatarContainer}>
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
  toggleContainer: {
    position: 'absolute',
    top: 12,
    left: 12,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
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
    right: 12,
    backgroundColor: '#F5F5F5',
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
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
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

