import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ContactSection({ 
  email, 
  phone, 
  whatsapp
}) {
  const hasContact = email || phone || whatsapp;

  if (!hasContact) return null;

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>KONTAKT</Text>
      
      {email && (
        <View style={styles.contactItem}>
          <Ionicons name="mail-outline" size={20} color="#666" />
          <Text style={styles.contactText}>{email}</Text>
        </View>
      )}
      
      {phone && (
        <View style={styles.contactItem}>
          <Ionicons name="call-outline" size={20} color="#666" />
          <Text style={styles.contactText}>{phone}</Text>
        </View>
      )}
      
      {whatsapp && (
        <View style={styles.contactItem}>
          <Ionicons name="logo-whatsapp" size={20} color="#666" />
          <Text style={styles.contactText}>{whatsapp}</Text>
        </View>
      )}
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
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 8,
  },
  contactText: {
    fontSize: 15,
    color: '#333',
  },
});
