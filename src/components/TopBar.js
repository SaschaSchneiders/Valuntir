import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useHover } from '../utils/responsive';

const IconButton = ({ icon, badge, onPress }) => {
  const [isHovered, hoverProps] = useHover();

  return (
    <TouchableOpacity
      style={[styles.iconButton, isHovered && styles.iconButtonHovered]}
      onPress={onPress}
      {...hoverProps}
    >
      <Ionicons name={icon} size={22} color={isHovered ? '#000' : '#666'} />
      {badge && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{badge}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default function TopBar({ title, subtitle, showSearch = false, navigation }) {
  const [isHovered, hoverProps] = useHover();

  return (
    <View style={styles.topBar}>
      {/* Left: Title */}
      <View style={styles.left}>
        <Text style={styles.title}>{title}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>

      {/* Center: Search (optional) */}
      {showSearch && (
        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={18} color="#999" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Anbieter suchen..."
            placeholderTextColor="#999"
          />
        </View>
      )}

      {/* Right: Actions */}
      <View style={styles.right}>
        <IconButton icon="notifications-outline" badge="3" onPress={() => {}} />
        <TouchableOpacity
          style={[styles.profileButton, isHovered && styles.profileButtonHovered]}
          onPress={() => navigation?.navigate('Profile')}
          {...hoverProps}
        >
          <View style={styles.avatar}>
            <Ionicons name="person" size={18} color="#666" />
          </View>
          <Text style={styles.profileName}>Max M.</Text>
          <Ionicons name="chevron-down" size={16} color="#666" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  topBar: {
    height: 72,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 32,
    gap: 24,
    ...(Platform.OS === 'web' && {
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }),
  },
  left: {
    flex: 0,
    minWidth: 200,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
  },
  subtitle: {
    fontSize: 13,
    fontWeight: '500',
    color: '#666',
    marginTop: 2,
  },
  searchContainer: {
    flex: 1,
    maxWidth: 400,
    height: 44,
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    gap: 10,
  },
  searchIcon: {
    opacity: 0.6,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#000',
    outlineStyle: 'none',
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  iconButtonHovered: {
    backgroundColor: '#F8F8F8',
  },
  badge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#FF3B30',
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFF',
  },
  profileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  profileButtonHovered: {
    backgroundColor: '#F8F8F8',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
});

