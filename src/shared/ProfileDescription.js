import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ProfileDescription({ description }) {
  if (!description) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
    color: '#333',
    fontWeight: '400',
  },
});

