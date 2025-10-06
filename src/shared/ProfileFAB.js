import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';

export default function ProfileFAB({ favoriteContact, onPress }) {
  if (!favoriteContact) return null;

  const getIconName = () => {
    switch (favoriteContact) {
      case 'whatsapp':
        return 'logo-whatsapp';
      case 'phone':
        return 'call';
      case 'email':
        return 'mail';
      default:
        return 'mail';
    }
  };

  return (
    <TouchableOpacity 
      style={styles.fab}
      activeOpacity={0.9}
      onPress={onPress}
    >
      <BlurView intensity={30} tint="dark" style={styles.fabBlur}>
        <Ionicons 
          name={getIconName()} 
          size={28} 
          color="#FFFFFF" 
        />
      </BlurView>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    bottom: 112,
    right: 20,
    width: 64,
    height: 64,
    borderRadius: 32,
    overflow: 'hidden',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
    zIndex: 999,
  },
  fabBlur: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 32,
  },
});

