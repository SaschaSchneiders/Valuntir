import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useHover } from '../utils/responsive';

const NavItem = ({ icon, label, active, onPress }) => {
  const [isHovered, hoverProps] = useHover();

  return (
    <TouchableOpacity
      style={[
        styles.navItem,
        active && styles.navItemActive,
        isHovered && styles.navItemHovered,
      ]}
      onPress={onPress}
      {...hoverProps}
    >
      <Ionicons
        name={icon}
        size={22}
        color={active ? '#000' : isHovered ? '#000' : '#666'}
      />
      <Text style={[
        styles.navLabel,
        active && styles.navLabelActive,
        isHovered && styles.navLabelHovered,
      ]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default function Sidebar({ navigation, currentRoute }) {
  const navItems = [
    { icon: 'home-outline', label: 'Home', route: 'Home', isTab: true },
    { icon: 'stats-chart-outline', label: 'Dashboard', route: 'Dashboard', isTab: true },
    { icon: 'search-outline', label: 'Suche', route: 'Search', isTab: true },
    { icon: 'notifications-outline', label: 'Reminder', route: 'Reminders', isTab: false },
    { icon: 'person-outline', label: 'Profil', route: 'Profile', isTab: true },
    { icon: 'settings-outline', label: 'Einstellungen', route: 'Settings', isTab: false },
  ];

  const handleNavigation = (item) => {
    if (item.isTab) {
      // Tab-Screens sind in "Main" verschachtelt
      navigation.navigate('Main', { screen: item.route });
    } else {
      // Stack-Screens direkt navigieren
      navigation.navigate(item.route);
    }
  };

  return (
    <View style={styles.sidebar}>
      {/* Logo/Brand */}
      <View style={styles.brand}>
        <Text style={styles.brandText}>Valuntir</Text>
        <Text style={styles.brandSubtext}>Professional</Text>
      </View>

      {/* Navigation Items */}
      <View style={styles.navList}>
        {navItems.map((item) => (
          <NavItem
            key={item.route}
            icon={item.icon}
            label={item.label}
            active={currentRoute === item.route}
            onPress={() => handleNavigation(item)}
          />
        ))}
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.usageCard}>
          <Text style={styles.usageLabel}>Connections</Text>
          <Text style={styles.usageValue}>23 / 50</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '46%' }]} />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sidebar: {
    width: 240,
    backgroundColor: '#FFFFFF',
    borderRightWidth: 1,
    borderRightColor: '#E5E5E5',
    paddingVertical: 24,
    paddingHorizontal: 16,
    flexDirection: 'column',
    ...(Platform.OS === 'web' && {
      height: '100vh',
      position: 'sticky',
      top: 0,
    }),
  },
  brand: {
    paddingHorizontal: 12,
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    marginBottom: 24,
  },
  brandText: {
    fontSize: 24,
    fontWeight: '800',
    color: '#000',
    letterSpacing: -0.5,
  },
  brandSubtext: {
    fontSize: 12,
    fontWeight: '500',
    color: '#666',
    marginTop: 2,
  },
  navList: {
    flex: 1,
    gap: 4,
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 10,
    gap: 12,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  navItemActive: {
    backgroundColor: '#F5F5F5',
  },
  navItemHovered: {
    backgroundColor: '#FAFAFA',
  },
  navLabel: {
    fontSize: 15,
    fontWeight: '500',
    color: '#666',
  },
  navLabelActive: {
    color: '#000',
    fontWeight: '600',
  },
  navLabelHovered: {
    color: '#000',
  },
  footer: {
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  usageCard: {
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    padding: 12,
  },
  usageLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    marginBottom: 4,
  },
  usageValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
    marginBottom: 8,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#E5E5E5',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#000',
    borderRadius: 3,
  },
});

