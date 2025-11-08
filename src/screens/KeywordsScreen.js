import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export default function KeywordsScreen({ navigation }) {
  const [keywords, setKeywords] = useState([
    'Unternehmensberatung',
    'Strategieentwicklung',
    'Change Management',
  ]);
  const [currentInput, setCurrentInput] = useState('');

  const handleAddKeyword = () => {
    const trimmed = currentInput.trim();
    if (trimmed && keywords.length < 10) {
      setKeywords([...keywords, trimmed]);
      setCurrentInput('');
    }
  };

  const handleRemoveKeyword = (index) => {
    const newKeywords = keywords.filter((_, i) => i !== index);
    setKeywords(newKeywords);
  };

  const handleSave = () => {
    // TODO: Backend API Call
    console.log('Keywords speichern:', keywords);
    navigation.goBack();
  };

  const remainingSlots = 10 - keywords.length;

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#F8F9FA', '#FFFFFF', '#F8F9FA']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        <SafeAreaView style={styles.safeArea} edges={['top']}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="arrow-back" size={24} color="#000" />
            </TouchableOpacity>
            <Text style={styles.title}>Such-Keywords</Text>
            <View style={styles.placeholder} />
          </View>

          <ScrollView 
            style={styles.content}
            contentContainerStyle={styles.contentContainer}
            showsVerticalScrollIndicator={false}
          >
            {/* Info Box */}
            <View style={styles.infoBox}>
              <Ionicons name="search" size={24} color="#3B82F6" />
              <Text style={styles.infoText}>
                Füge relevante Suchbegriffe hinzu, damit potenzielle Kunden dich leichter finden. 
                Verwende Begriffe, die deine Leistungen und Expertise beschreiben.
              </Text>
            </View>

            {/* Counter */}
            <View style={styles.counterContainer}>
              <Text style={styles.counterText}>
                {keywords.length} / 10 Keywords
              </Text>
              {remainingSlots > 0 && (
                <Text style={styles.remainingText}>
                  (noch {remainingSlots} {remainingSlots === 1 ? 'Platz' : 'Plätze'} frei)
                </Text>
              )}
            </View>

            {/* Keywords Display */}
            {keywords.length > 0 && (
              <View style={styles.keywordsContainer}>
                {keywords.map((keyword, index) => (
                  <View key={index} style={styles.keywordChip}>
                    <Text style={styles.keywordText}>{keyword}</Text>
                    <TouchableOpacity 
                      onPress={() => handleRemoveKeyword(index)}
                      style={styles.removeChipButton}
                    >
                      <Ionicons name="close" size={18} color="#666" />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            )}

            {/* Add Keyword */}
            {keywords.length < 10 && (
              <View style={styles.addSection}>
                <Text style={styles.sectionTitle}>Neues Keyword hinzufügen</Text>
                
                <View style={styles.inputRow}>
                  <TextInput
                    style={styles.input}
                    placeholder="z.B. Digitalisierung"
                    value={currentInput}
                    onChangeText={setCurrentInput}
                    maxLength={30}
                    returnKeyType="done"
                    onSubmitEditing={handleAddKeyword}
                  />
                  <TouchableOpacity 
                    style={[
                      styles.addButton,
                      !currentInput.trim() && styles.addButtonDisabled
                    ]}
                    onPress={handleAddKeyword}
                    disabled={!currentInput.trim()}
                  >
                    <Ionicons name="add" size={24} color="#FFFFFF" />
                  </TouchableOpacity>
                </View>
                
                {currentInput.length > 0 && (
                  <Text style={styles.charCount}>
                    {currentInput.length} / 30 Zeichen
                  </Text>
                )}
              </View>
            )}

            {/* Beispiele */}
            <View style={styles.examplesSection}>
              <View style={styles.examplesHeader}>
                <Ionicons name="bulb-outline" size={20} color="#F59E0B" />
                <Text style={styles.examplesTitle}>Beispiele für gute Keywords:</Text>
              </View>
              <View style={styles.examplesList}>
                <View style={styles.exampleCategory}>
                  <Text style={styles.exampleCategoryTitle}>Beratungsfelder:</Text>
                  <Text style={styles.exampleText}>
                    Strategieberatung, IT-Beratung, HR-Beratung, Finanzberatung
                  </Text>
                </View>
                <View style={styles.exampleCategory}>
                  <Text style={styles.exampleCategoryTitle}>Spezialisierungen:</Text>
                  <Text style={styles.exampleText}>
                    Digitale Transformation, Prozessoptimierung, Change Management
                  </Text>
                </View>
                <View style={styles.exampleCategory}>
                  <Text style={styles.exampleCategoryTitle}>Branchen:</Text>
                  <Text style={styles.exampleText}>
                    Automotive, Healthcare, E-Commerce, FinTech
                  </Text>
                </View>
              </View>
            </View>

            {/* Tipps */}
            <View style={styles.tipsSection}>
              <Text style={styles.tipsTitle}>Tipps:</Text>
              <Text style={styles.tipText}>✓ Verwende präzise und spezifische Begriffe</Text>
              <Text style={styles.tipText}>✓ Denke an Synonyme und verwandte Begriffe</Text>
              <Text style={styles.tipText}>✓ Fokussiere dich auf deine Kernkompetenzen</Text>
              <Text style={styles.tipText}>✗ Vermeide zu allgemeine Begriffe wie "Beratung"</Text>
            </View>
          </ScrollView>

          {/* Save Button */}
          <View style={styles.saveButtonContainer}>
            <TouchableOpacity 
              style={styles.saveButton}
              onPress={handleSave}
            >
              <Text style={styles.saveButtonText}>Speichern</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  backButton: {
    padding: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 100,
  },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    borderRadius: 16,
    padding: 16,
    gap: 12,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.2)',
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    color: '#1E40AF',
    lineHeight: 20,
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 24,
  },
  counterText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
  },
  remainingText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  keywordsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 32,
  },
  keywordChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingVertical: 8,
    paddingLeft: 16,
    paddingRight: 10,
    gap: 8,
    borderWidth: 1.5,
    borderColor: '#000',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  keywordText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  removeChipButton: {
    padding: 2,
  },
  addSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    marginBottom: 12,
  },
  inputRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 8,
  },
  input: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    fontSize: 15,
    fontWeight: '500',
    color: '#000',
    borderWidth: 1.5,
    borderColor: '#E5E5E5',
  },
  addButton: {
    width: 52,
    height: 52,
    backgroundColor: '#000000',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  addButtonDisabled: {
    backgroundColor: '#CCCCCC',
  },
  charCount: {
    fontSize: 12,
    fontWeight: '500',
    color: '#999',
    textAlign: 'right',
  },
  examplesSection: {
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.2)',
    marginBottom: 20,
  },
  examplesHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  examplesTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#92400E',
  },
  examplesList: {
    gap: 12,
  },
  exampleCategory: {
    gap: 4,
  },
  exampleCategoryTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#92400E',
  },
  exampleText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#92400E',
    lineHeight: 18,
  },
  tipsSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  tipsTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#000',
    marginBottom: 12,
  },
  tipText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
    lineHeight: 22,
    marginBottom: 4,
  },
  saveButtonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  saveButton: {
    backgroundColor: '#10B981',
    borderRadius: 16,
    padding: 18,
    alignItems: 'center',
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  saveButtonText: {
    fontSize: 17,
    fontWeight: '800',
    color: '#FFFFFF',
  },
});

