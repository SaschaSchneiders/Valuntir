import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import Slider from '@react-native-community/slider';

export default function ConnectionRating({ visible, connection, onClose, onSubmit }) {
  // Schritt-Steuerung (1 oder 2)
  const [currentStep, setCurrentStep] = useState(1);
  
  // Bewertungen für die 4 Kernbereiche (1-10)
  const [communication, setCommunication] = useState(5);
  const [pricePerformance, setPricePerformance] = useState(5);
  const [deliveryQuality, setDeliveryQuality] = useState(5);
  const [reliability, setReliability] = useState(5);
  
  // Gesamtzufriedenheit (wird berechnet, kann aber angepasst werden)
  const [overallSatisfaction, setOverallSatisfaction] = useState(5);
  const [isOverallCustomized, setIsOverallCustomized] = useState(false);
  
  // Optionaler Freitext
  const [comment, setComment] = useState('');

  // Kategorien-Definitionen
  const categories = [
    {
      id: 'communication',
      icon: 'chatbubble-ellipses-outline',
      title: 'Kommunikation',
      description: 'Klarheit, Erreichbarkeit, Verbindlichkeit',
      value: communication,
      setValue: setCommunication,
    },
    {
      id: 'pricePerformance',
      icon: 'cash-outline',
      title: 'Preis-Leistung',
      description: 'Fairness im Verhältnis von Kosten zu Nutzen',
      value: pricePerformance,
      setValue: setPricePerformance,
    },
    {
      id: 'deliveryQuality',
      icon: 'construct-outline',
      title: 'Lieferqualität / Umsetzung',
      description: 'Ergebnis wie beauftragt und fachgerecht',
      value: deliveryQuality,
      setValue: setDeliveryQuality,
    },
    {
      id: 'reliability',
      icon: 'calendar-outline',
      title: 'Verlässlichkeit',
      description: 'Termine und Zusagen eingehalten',
      value: reliability,
      setValue: setReliability,
    },
  ];

  // Automatische Berechnung der Gesamtzufriedenheit (Durchschnitt)
  useEffect(() => {
    if (!isOverallCustomized) {
      const average = (communication + pricePerformance + deliveryQuality + reliability) / 4;
      setOverallSatisfaction(Math.round(average * 10) / 10);
    }
  }, [communication, pricePerformance, deliveryQuality, reliability, isOverallCustomized]);

  const handleSubmit = () => {
    const rating = {
      connectionId: connection?.id,
      communication,
      pricePerformance,
      deliveryQuality,
      reliability,
      overallSatisfaction,
      comment: comment.trim(),
      timestamp: new Date().toISOString(),
    };
    onSubmit(rating);
    resetForm();
  };

  const resetForm = () => {
    setCurrentStep(1);
    setCommunication(5);
    setPricePerformance(5);
    setDeliveryQuality(5);
    setReliability(5);
    setOverallSatisfaction(5);
    setIsOverallCustomized(false);
    setComment('');
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleNext = () => {
    setCurrentStep(2);
  };

  const handleBack = () => {
    setCurrentStep(1);
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={handleClose}>
      <BlurView intensity={20} tint="dark" style={styles.modalOverlay}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.modalContainer}
        >
          <View style={styles.modalContent}>
            {/* Header */}
            <View style={styles.header}>
              <View style={styles.headerTop}>
                <Text style={styles.title}>
                  {currentStep === 1 ? 'Schritt 1 von 2' : 'Schritt 2 von 2'}
                </Text>
                <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
                  <Ionicons name="close" size={28} color="#666" />
                </TouchableOpacity>
              </View>
              <Text style={styles.subtitle}>{connection?.company}</Text>
              <Text style={styles.category}>{connection?.category}</Text>
            </View>

            {/* Step 1: 4 Kernbereiche */}
            {currentStep === 1 && (
              <View style={styles.stepContent}>
                <Text style={styles.sectionTitle}>Bewerte die 4 Kernbereiche</Text>
                {categories.map((cat) => (
                  <View key={cat.id} style={styles.ratingItem}>
                    <View style={styles.ratingHeader}>
                      <View style={styles.ratingIconContainer}>
                        <Ionicons name={cat.icon} size={22} color="#000" />
                      </View>
                      <View style={styles.ratingInfo}>
                        <Text style={styles.ratingTitle}>{cat.title}</Text>
                        <Text style={styles.ratingDescription}>{cat.description}</Text>
                      </View>
                      <View style={styles.ratingValue}>
                        <Text style={styles.ratingNumber}>{cat.value}/10</Text>
                      </View>
                    </View>
                    <Slider
                      style={styles.slider}
                      minimumValue={1}
                      maximumValue={10}
                      step={1}
                      value={cat.value}
                      onValueChange={cat.setValue}
                      minimumTrackTintColor="#000000"
                      maximumTrackTintColor="#E0E0E0"
                      thumbTintColor="#000000"
                    />
                  </View>
                ))}
              </View>
            )}

            {/* Step 2: Gesamtzufriedenheit & Kommentar */}
            {currentStep === 2 && (
              <View style={styles.stepContent}>
                <Text style={styles.sectionTitle}>Gesamtzufriedenheit</Text>
                <Text style={styles.overallHint}>
                  {isOverallCustomized
                    ? 'Von dir angepasst'
                    : 'Automatisch berechnet (anpassbar)'}
                </Text>
                <View style={styles.overallBox}>
                  <View style={styles.overallHeader}>
                    <Text style={styles.overallNumber}>{overallSatisfaction}/10</Text>
                  </View>
                  <Slider
                    style={styles.slider}
                    minimumValue={1}
                    maximumValue={10}
                    step={0.1}
                    value={overallSatisfaction}
                    onValueChange={(value) => {
                      setOverallSatisfaction(Math.round(value * 10) / 10);
                      setIsOverallCustomized(true);
                    }}
                    minimumTrackTintColor="#000000"
                    maximumTrackTintColor="#E0E0E0"
                    thumbTintColor="#000000"
                  />
                </View>

                <View style={styles.commentSection}>
                  <Text style={styles.sectionTitle}>Kommentar (optional)</Text>
                  <Text style={styles.commentHint}>
                    Z.B. Projekterklärung: "Familienstiftung umgesetzt – steuerlich optimal."
                  </Text>
                  <TextInput
                    style={styles.commentInput}
                    value={comment}
                    onChangeText={setComment}
                    placeholder="Dein Kommentar zum Projekt..."
                    placeholderTextColor="#999"
                    multiline
                    numberOfLines={4}
                    maxLength={500}
                  />
                  <Text style={styles.charCount}>{comment.length}/500</Text>
                </View>
              </View>
            )}

            {/* Footer mit Buttons */}
            <View style={styles.footer}>
              {currentStep === 1 ? (
                <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
                  <Text style={styles.nextButtonText}>Weiter</Text>
                  <Ionicons name="arrow-forward" size={20} color="#FFF" />
                </TouchableOpacity>
              ) : (
                <View style={styles.footerRow}>
                  <TouchableOpacity style={styles.backButton} onPress={handleBack}>
                    <Ionicons name="arrow-back" size={20} color="#000" />
                    <Text style={styles.backButtonText}>Zurück</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                    <Text style={styles.submitButtonText}>Absenden</Text>
                    <Ionicons name="checkmark" size={20} color="#FFF" />
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        </KeyboardAvoidingView>
      </BlurView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  modalContainer: {
    width: '90%',
    maxHeight: '85%',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    overflow: 'hidden',
  },
  header: {
    padding: 24,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#000',
    letterSpacing: -0.5,
  },
  closeButton: {
    padding: 4,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 4,
  },
  category: {
    fontSize: 14,
    color: '#666',
  },
  stepContent: {
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#000',
    marginBottom: 16,
  },
  ratingItem: {
    marginBottom: 20,
  },
  ratingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  ratingIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  ratingInfo: {
    flex: 1,
  },
  ratingTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    marginBottom: 2,
  },
  ratingDescription: {
    fontSize: 12,
    color: '#666',
  },
  ratingValue: {
    alignItems: 'flex-end',
    minWidth: 50,
  },
  ratingNumber: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
  },
  slider: {
    width: '100%',
    height: 40,
  },
  overallHint: {
    fontSize: 13,
    color: '#999',
    marginBottom: 12,
    fontStyle: 'italic',
  },
  overallBox: {
    backgroundColor: '#F8F9FA',
    borderRadius: 16,
    padding: 20,
    borderWidth: 2,
    borderColor: '#000',
    marginBottom: 24,
  },
  overallHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  overallNumber: {
    fontSize: 32,
    fontWeight: '900',
    color: '#000',
  },
  commentSection: {
    marginTop: 8,
  },
  commentHint: {
    fontSize: 13,
    color: '#666',
    marginBottom: 12,
  },
  commentInput: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
    fontSize: 15,
    color: '#000',
    minHeight: 100,
    textAlignVertical: 'top',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  charCount: {
    fontSize: 12,
    color: '#999',
    marginTop: 8,
    textAlign: 'right',
  },
  footer: {
    padding: 24,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  footerRow: {
    flexDirection: 'row',
    gap: 12,
  },
  nextButton: {
    backgroundColor: '#000000',
    borderRadius: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
  },
  backButton: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    borderRadius: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  backButtonText: {
    color: '#000000',
    fontSize: 17,
    fontWeight: '700',
  },
  submitButton: {
    flex: 1,
    backgroundColor: '#000000',
    borderRadius: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
  },
});

