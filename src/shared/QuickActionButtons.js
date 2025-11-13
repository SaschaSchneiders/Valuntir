import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function QuickActionButtons({ websiteUrl, onWebsitePress, onSharePress }) {
  return (
    <View style={styles.container}>
      {websiteUrl && (
        <TouchableOpacity 
          style={styles.button} 
          onPress={onWebsitePress || (() => console.log('Open Website:', websiteUrl))}
        >
          <Ionicons name="globe-outline" size={20} color="#000" />
          <Text style={styles.buttonText}>Webseite</Text>
        </TouchableOpacity>
      )}
      
      {/* Share Button */}
      <TouchableOpacity 
        style={styles.button}
        onPress={onSharePress || (() => console.log('Share Profile'))}
      >
        <Ionicons name="share-outline" size={20} color="#000" />
        <Text style={styles.buttonText}>Teilen</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 24,
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: '#FFFFFF',
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000',
  },
});
