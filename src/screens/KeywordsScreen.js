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
    'Steuerberater',
    'Jahresabschluss',
    'Steuern sparen',
  ]);
  const [currentInput, setCurrentInput] = useState('');
  const inputRef = React.useRef(null);

  const handleAddKeyword = () => {
    const trimmed = currentInput.trim();
    if (trimmed && keywords.length < 10) {
      setKeywords([...keywords, trimmed]);
      setCurrentInput('');
      // Focus bleibt auf dem Input, damit die Tastatur offen bleibt
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
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
        colors={['#F8F9FA', '#FFFFFF']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        <SafeAreaView style={styles.safeArea} edges={['top']}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity 
              style={styles.cancelButton}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.cancelButtonText}>Abbrechen</Text>
            </TouchableOpacity>
                <Text style={styles.title}>Keywords</Text>
            <TouchableOpacity 
              style={styles.saveTextButton}
              onPress={handleSave}
            >
              <Text style={styles.saveTextButtonText}>Speichern</Text>
            </TouchableOpacity>
          </View>

          <ScrollView 
            style={styles.content}
            contentContainerStyle={styles.contentContainer}
            showsVerticalScrollIndicator={false}
          >
              {/* Info Badge - Dezent */}
              <View style={styles.infoBadge}>
                <Ionicons name="information-circle-outline" size={16} color="#999" />
                <Text style={styles.infoBadgeText}>
                  Füge relevante Suchbegriffe hinzu, damit potenzielle Kunden dich leichter finden.
                  Verwende Begriffe, die deine Leistungen und Expertise beschreiben.
                </Text>
              </View>

            {/* Counter */}
            <Text style={styles.counterText}>
              {keywords.length} / 10 Keywords {remainingSlots > 0 && `(noch ${remainingSlots} frei)`}
            </Text>

            {/* Tag Input - Keywords innerhalb des Textfelds */}
            <View style={styles.tagInputContainer}>
              <View style={styles.tagsWrapper}>
                {/* Keywords als Chips im Input */}
                {keywords.map((keyword, index) => (
                  <View key={index} style={styles.tagChip}>
                    <Text style={styles.tagChipText}>{keyword}</Text>
                    <TouchableOpacity 
                      onPress={() => handleRemoveKeyword(index)}
                      style={styles.removeTagButton}
                    >
                      <Ionicons name="close" size={16} color="#3B82F6" />
                    </TouchableOpacity>
                  </View>
                ))}
                
                {/* Textfeld für neue Keywords */}
                {keywords.length < 10 && (
                  <TextInput
                    ref={inputRef}
                    style={styles.tagInput}
                    placeholder={keywords.length === 0 ? "z.B. Digitalisierung..." : ""}
                    placeholderTextColor="#999"
                    value={currentInput}
                    onChangeText={setCurrentInput}
                    maxLength={30}
                    returnKeyType="done"
                    onSubmitEditing={handleAddKeyword}
                    blurOnSubmit={false}
                    multiline={false}
                  />
                )}
              </View>
              <Text style={styles.inputHint}>Drücke Enter, um das Keyword hinzuzufügen</Text>
            </View>

            {/* Beispiele */}
            <View style={styles.examplesSection}>
              <Text style={styles.examplesTitle}>So baust du deine Keywords auf</Text>
              <Text style={styles.exampleIntro}>
                Kombiniere deine Berufsbezeichnung mit konkreten Leistungen und Spezialisierungen:
              </Text>
              
              <Text style={styles.exampleText}>
                <Text style={styles.exampleBold}>Steuerberater:</Text> Steuern sparen, Umstrukturierung, Familienstiftung, Betriebsprüfung, Nachfolgeplanung
              </Text>
              <Text style={styles.exampleText}>
                <Text style={styles.exampleBold}>Elektroinstallateur:</Text> Photovoltaik, Wallbox, Smart Home, E-Check, Hausanschluss
              </Text>
              <Text style={styles.exampleText}>
                <Text style={styles.exampleBold}>Schreinerei:</Text> Maßmöbel, Einbauküchen, Treppen, Türen, Restaurierung
              </Text>
              <Text style={styles.exampleText}>
                <Text style={styles.exampleBold}>Marketing Agentur:</Text> Social Media, Content Marketing, SEO, Google Ads, Branding
              </Text>
              <Text style={styles.exampleText}>
                <Text style={styles.exampleBold}>Anwalt:</Text> Arbeitsrecht, Vertragsrecht, Abfindung, Kündigungsschutz, Betriebsrat
              </Text>
            </View>
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
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
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    position: 'relative',
  },
  cancelButton: {
    position: 'absolute',
    left: 16,
    padding: 4,
    zIndex: 10,
  },
  cancelButtonText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#007AFF',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
    textAlign: 'center',
  },
  saveTextButton: {
    position: 'absolute',
    right: 16,
    padding: 4,
    zIndex: 10,
  },
  saveTextButtonText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#007AFF',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  infoBadge: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  infoBadgeText: {
    flex: 1,
    fontSize: 13,
    fontWeight: '500',
    color: '#666',
    lineHeight: 18,
  },
  counterText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  tagInputContainer: {
    marginBottom: 24,
  },
  tagsWrapper: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    minHeight: 56,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  tagChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(59, 130, 246, 0.15)',
    borderRadius: 12,
    paddingVertical: 4,
    paddingLeft: 10,
    paddingRight: 6,
    gap: 4,
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.3)',
  },
  tagChipText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E40AF',
  },
  removeTagButton: {
    padding: 2,
  },
  tagInput: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
    color: '#000',
    minWidth: 120,
    paddingVertical: 4,
  },
  inputHint: {
    fontSize: 12,
    fontWeight: '500',
    color: '#999',
    marginTop: 8,
    textAlign: 'center',
  },
  examplesSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  examplesTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#000',
    marginBottom: 12,
  },
  exampleIntro: {
    fontSize: 13,
    fontWeight: '500',
    color: '#666',
    lineHeight: 20,
    marginBottom: 20,
  },
  exampleText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
    lineHeight: 22,
    marginBottom: 12,
  },
  exampleBold: {
    fontWeight: '700',
    color: '#000',
  },
});

