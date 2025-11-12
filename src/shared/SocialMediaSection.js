import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function SocialMediaSection({ 
  linkedin,
  instagram,
  onLinkedInPress,
  onInstagramPress
}) {
  const hasSocial = linkedin || instagram;

  if (!hasSocial) return null;

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>SOCIAL MEDIA</Text>
      
      <View style={styles.socialRow}>
        {linkedin && (
          <TouchableOpacity 
            style={styles.socialButton}
            onPress={onLinkedInPress || (() => console.log('LinkedIn:', linkedin))}
          >
            <Ionicons name="logo-linkedin" size={28} color="#0A66C2" />
          </TouchableOpacity>
        )}
        
        {instagram && (
          <TouchableOpacity 
            style={styles.socialButton}
            onPress={onInstagramPress || (() => console.log('Instagram:', instagram))}
          >
            <Ionicons name="logo-instagram" size={28} color="#E4405F" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#000',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  socialRow: {
    flexDirection: 'row',
    gap: 12,
  },
  socialButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});

