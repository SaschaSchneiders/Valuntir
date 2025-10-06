import React, { useState } from 'react';
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
import RateScale from './RateScale';

export default function ConnectionRating({ visible, connection, onClose, onSubmit }) {
  // Schritt-Steuerung (1, 2 oder 3)
  const [currentStep, setCurrentStep] = useState(1);
  
  // Bewertungen für die 4 Kernbereiche (1-10) - Schritt 1
  const [communication, setCommunication] = useState(5);
  const [pricePerformance, setPricePerformance] = useState(5);
  const [deliveryQuality, setDeliveryQuality] = useState(5);
  const [reliability, setReliability] = useState(5);
  
  // Zwei Erfolgs-Fragen (0-100%) - Schritt 2
  const [goalAchieved, setGoalAchieved] = useState(50); // Ziel erreicht?
  const [worthIt, setWorthIt] = useState(50); // Hat sich gelohnt?
  
  // Optionaler Freitext - Schritt 3
  const [comment, setComment] = useState('');
  
  // Erfolgsscore berechnen (Durchschnitt der beiden Fragen)
  const successScore = Math.round((goalAchieved + worthIt) / 2);

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

  const handleSubmit = () => {
    const rating = {
      connectionId: connection?.id,
      communication,
      pricePerformance,
      deliveryQuality,
      reliability,
      goalAchieved,
      worthIt,
      successScore,
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
    setGoalAchieved(50);
    setWorthIt(50);
    setComment('');
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
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
                  Schritt {currentStep} von 3
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
                        <Ionicons name={cat.icon} size={20} color="#000" />
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

            {/* Step 2: Zwei Erfolgs-Fragen */}
            {currentStep === 2 && (
              <View style={styles.stepContent}>
                {/* Frage 1: Ziel erreicht? */}
                <View style={styles.questionContainer}>
                  <Text style={styles.questionTitle}>Wurde das Ziel des Projekts erreicht?</Text>
                  <RateScale
                    rate={goalAchieved}
                    size="medium"
                    showLabel={false}
                  />
                  <Slider
                    style={styles.controlSlider}
                    minimumValue={0}
                    maximumValue={100}
                    step={1}
                    value={goalAchieved}
                    onValueChange={setGoalAchieved}
                    minimumTrackTintColor="#000000"
                    maximumTrackTintColor="#E0E0E0"
                    thumbTintColor="#000000"
                  />
                </View>

                {/* Frage 2: Hat sich gelohnt? */}
                <View style={styles.questionContainer}>
                  <Text style={styles.questionTitle}>Hat sich das Projekt für dich gelohnt?</Text>
                  <RateScale
                    rate={worthIt}
                    size="medium"
                    showLabel={false}
                  />
                  <Slider
                    style={styles.controlSlider}
                    minimumValue={0}
                    maximumValue={100}
                    step={1}
                    value={worthIt}
                    onValueChange={setWorthIt}
                    minimumTrackTintColor="#000000"
                    maximumTrackTintColor="#E0E0E0"
                    thumbTintColor="#000000"
                  />
                </View>
              </View>
            )}

            {/* Step 3: Erfolgsscore & Kommentar */}
            {currentStep === 3 && (
              <View style={styles.stepContent}>
                <Text style={styles.sectionTitle}>Erfolgsscore</Text>
                <Text style={styles.overallHint}>
                  Berechnet aus deinen Angaben zum Projekterfolg
                </Text>
                
                {/* RateScale */}
                <View style={styles.scoreRateScale}>
                  <RateScale
                    rate={successScore}
                    size="medium"
                    showLabel={false}
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
                    maxLength={200}
                  />
                  <Text style={styles.charCount}>{comment.length}/200</Text>
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
              ) : currentStep === 2 ? (
                <View style={styles.footerRow}>
                  <TouchableOpacity style={styles.backButton} onPress={handleBack}>
                    <Ionicons name="arrow-back" size={20} color="#000" />
                    <Text style={styles.backButtonText}>Zurück</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.nextButtonInRow} onPress={handleNext}>
                    <Text style={styles.nextButtonText}>Weiter</Text>
                    <Ionicons name="arrow-forward" size={20} color="#FFF" />
                  </TouchableOpacity>
                </View>
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
    maxHeight: '80%',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
  header: {
    padding: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
    letterSpacing: -0.3,
  },
  closeButton: {
    padding: 2,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    marginBottom: 2,
  },
  category: {
    fontSize: 13,
    color: '#666',
  },
  stepContent: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#000',
    marginBottom: 12,
  },
  ratingItem: {
    marginBottom: 16,
  },
  ratingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ratingIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  ratingInfo: {
    flex: 1,
  },
  ratingTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#000',
    marginBottom: 1,
  },
  ratingDescription: {
    fontSize: 11,
    color: '#666',
  },
  ratingValue: {
    alignItems: 'flex-end',
    minWidth: 45,
  },
  ratingNumber: {
    fontSize: 15,
    fontWeight: '700',
    color: '#000',
  },
  slider: {
    width: '100%',
    height: 32,
  },
  overallHint: {
    fontSize: 12,
    color: '#999',
    marginBottom: 16,
    fontStyle: 'italic',
  },
  questionContainer: {
    marginBottom: 32,
  },
  questionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#000',
    marginBottom: 16,
  },
  controlSlider: {
    width: '100%',
    height: 40,
    marginTop: -10,
  },
  scoreRateScale: {
    marginTop: 0,
    marginBottom: 20,
  },
  commentSection: {
    marginTop: 4,
  },
  commentHint: {
    fontSize: 12,
    color: '#666',
    marginBottom: 10,
  },
  commentInput: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 14,
    fontSize: 14,
    color: '#000',
    minHeight: 90,
    textAlignVertical: 'top',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  charCount: {
    fontSize: 11,
    color: '#999',
    marginTop: 6,
    textAlign: 'right',
  },
  footer: {
    padding: 20,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  footerRow: {
    flexDirection: 'row',
    gap: 12,
  },
  nextButton: {
    backgroundColor: '#000000',
    borderRadius: 14,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  nextButtonInRow: {
    flex: 2,
    backgroundColor: '#000000',
    borderRadius: 14,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  backButton: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    borderRadius: 14,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  backButtonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '700',
  },
  submitButton: {
    flex: 2,
    backgroundColor: '#000000',
    borderRadius: 14,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});

