import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Animated,
  Vibration,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import RateScale from './RateScale';
import GradientSlider from './GradientSlider';
import PrimaryButton from './PrimaryButton';

export default function ConnectionRating({ visible, connection, onClose, onSubmit }) {
  // Schritt-Steuerung (1, 2, 'reward', 3)
  const [currentStep, setCurrentStep] = useState(1);
  
  // Flag ob Kernbereiche übersprungen wurden
  const [skippedCoreRatings, setSkippedCoreRatings] = useState(false);
  
  // Kommentar-Overlay State
  const [isCommentFocused, setIsCommentFocused] = useState(false);
  
  // Animation values für Kommentar-Overlay
  const commentFadeAnim = useRef(new Animated.Value(0)).current;
  const commentSlideAnim = useRef(new Animated.Value(50)).current;
  
  // Thank You Animation
  const [showThankYou, setShowThankYou] = useState(false);
  const thankYouOpacity = useRef(new Animated.Value(0)).current;
  const thankYouScale = useRef(new Animated.Value(0)).current;
  
  // Bewertungen für die 4 Kernbereiche (1-10) - Schritt 3
  const [communication, setCommunication] = useState(5);
  const [pricePerformance, setPricePerformance] = useState(5);
  const [deliveryQuality, setDeliveryQuality] = useState(5);
  const [reliability, setReliability] = useState(5);
  
  // Bounce-Animationen für Slider in Schritt 3
  const sliderBounceAnim1 = useRef(new Animated.Value(0)).current;
  const sliderBounceAnim2 = useRef(new Animated.Value(0)).current;
  const sliderBounceAnim3 = useRef(new Animated.Value(0)).current;
  const sliderBounceAnim4 = useRef(new Animated.Value(0)).current;
  const [sliderAnimationsStarted, setSliderAnimationsStarted] = useState(false);
  
  // Drei Erfolgs-Fragen (0-100%) - Schritt 1
  const [resultSatisfaction, setResultSatisfaction] = useState(50); // Zufriedenheit mit Ergebnis
  const [wouldWorkAgain, setWouldWorkAgain] = useState(50); // Würdest du wieder arbeiten?
  const [processSatisfaction, setProcessSatisfaction] = useState(50); // Zufriedenheit mit Ablauf
  
  // Optionaler Freitext - Schritt 2
  const [comment, setComment] = useState('');
  
  // Erfolgsscore berechnen (Durchschnitt der drei Fragen)
  const successScore = Math.round((resultSatisfaction + wouldWorkAgain + processSatisfaction) / 3);

  // Prüfen ob alle Fragen beantwortet wurden (nicht mehr bei 50%)
  const allQuestionsAnswered = resultSatisfaction !== 50 && wouldWorkAgain !== 50 && processSatisfaction !== 50;

  // Prüfen ob alle Slider bewegt wurden (nicht mehr bei 5)
  const allSlidersAnswered = communication !== 5 && pricePerformance !== 5 && deliveryQuality !== 5 && reliability !== 5;

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

  // Animation für Kommentar-Overlay
  useEffect(() => {
    if (isCommentFocused) {
      commentFadeAnim.setValue(0);
      commentSlideAnim.setValue(50);
      
      Animated.parallel([
        Animated.timing(commentFadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(commentSlideAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(commentFadeAnim, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(commentSlideAnim, {
          toValue: 50,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isCommentFocused, commentFadeAnim, commentSlideAnim]);

  // Bounce-Animation für Slider in Schritt 3 - nur beim ersten Betreten
  useEffect(() => {
    if (currentStep === 3 && !sliderAnimationsStarted) {
      setSliderAnimationsStarted(true);
      
      // Animation für jeden Slider starten
      const startBounce = (animValue) => {
        animValue.setValue(0);
        const bounceSequence = Animated.sequence([
          Animated.timing(animValue, { toValue: 5, duration: 400, useNativeDriver: true }),
          Animated.timing(animValue, { toValue: 0, duration: 300, useNativeDriver: true }),
          Animated.delay(800),
        ]);
        Animated.loop(bounceSequence, { iterations: 2 }).start();
      };
      
      startBounce(sliderBounceAnim1);
      startBounce(sliderBounceAnim2);
      startBounce(sliderBounceAnim3);
      startBounce(sliderBounceAnim4);
    }
  }, [currentStep, sliderAnimationsStarted, sliderBounceAnim1, sliderBounceAnim2, sliderBounceAnim3, sliderBounceAnim4]);
  
  // Stoppe individuelle Slider-Animationen wenn bewegt
  useEffect(() => {
    if (communication !== 5) sliderBounceAnim1.setValue(0);
  }, [communication, sliderBounceAnim1]);
  
  useEffect(() => {
    if (pricePerformance !== 5) sliderBounceAnim2.setValue(0);
  }, [pricePerformance, sliderBounceAnim2]);
  
  useEffect(() => {
    if (deliveryQuality !== 5) sliderBounceAnim3.setValue(0);
  }, [deliveryQuality, sliderBounceAnim3]);
  
  useEffect(() => {
    if (reliability !== 5) sliderBounceAnim4.setValue(0);
  }, [reliability, sliderBounceAnim4]);

  const handleSubmit = () => {
    const rating = {
      connectionId: connection?.id,
      // Drei Hauptfragen
      resultSatisfaction,
      wouldWorkAgain,
      processSatisfaction,
      successScore,
      comment: comment.trim(),
      // Nur Kernbereiche einschließen wenn nicht übersprungen
      ...(skippedCoreRatings ? {} : {
        communication,
        pricePerformance,
        deliveryQuality,
        reliability,
      }),
      timestamp: new Date().toISOString(),
    };
    
    // Modal sofort schließen und Form resetten
    onSubmit(rating);
    resetForm();
    onClose();
    
    // Zeige Thank You Animation NACH dem Schließen
    setTimeout(() => {
      setShowThankYou(true);
      thankYouOpacity.setValue(0);
      thankYouScale.setValue(0);
      
      // Haptic Feedback
      if (Platform.OS === 'ios') {
        Vibration.vibrate([0, 50]); // Success vibration
      } else {
        Vibration.vibrate(50);
      }
      
      Animated.parallel([
        // Fade in
        Animated.timing(thankYouOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        // Bounce in (elastic)
        Animated.spring(thankYouScale, {
          toValue: 1,
          friction: 6,
          tension: 40,
          useNativeDriver: true,
        }),
      ]).start(() => {
        // Nach 1 Sekunde ausblenden
        setTimeout(() => {
          Animated.timing(thankYouOpacity, {
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
          }).start(() => {
            setShowThankYou(false);
          });
        }, 1000);
      });
    }, 100);
  };

  const resetForm = () => {
    setCurrentStep(1);
    setSkippedCoreRatings(false);
    setCommunication(5);
    setPricePerformance(5);
    setDeliveryQuality(5);
    setReliability(5);
    setResultSatisfaction(50);
    setWouldWorkAgain(50);
    setProcessSatisfaction(50);
    setComment('');
    setSliderAnimationsStarted(false);
    // showThankYou nicht hier zurücksetzen - wird nach Animation automatisch zurückgesetzt
  };

  const handleClose = () => {
    resetForm();
    setShowThankYou(false);
    thankYouOpacity.setValue(0);
    onClose();
  };

  const handleNext = () => {
    if (currentStep === 1) {
      setCurrentStep(2);
    } else if (currentStep === 2) {
      setCurrentStep('reward');
    } else if (currentStep === 'reward') {
      setCurrentStep(3);
    }
  };

  const handleBack = () => {
    if (currentStep === 2) {
      setCurrentStep(1);
    } else if (currentStep === 'reward') {
      setCurrentStep(2);
    } else if (currentStep === 3) {
      setCurrentStep('reward');
    }
  };

  const handleFinishWithoutCoreRatings = () => {
    setSkippedCoreRatings(true);
    
    const rating = {
      connectionId: connection?.id,
      resultSatisfaction,
      wouldWorkAgain,
      processSatisfaction,
      successScore,
      comment: comment.trim(),
      timestamp: new Date().toISOString(),
    };
    
    // Modal sofort schließen und Form resetten
    onSubmit(rating);
    resetForm();
    onClose();
    
    // Zeige Thank You Animation NACH dem Schließen
    setTimeout(() => {
      setShowThankYou(true);
      thankYouOpacity.setValue(0);
      
      Animated.sequence([
        Animated.timing(thankYouOpacity, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.delay(800),
        Animated.timing(thankYouOpacity, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setShowThankYou(false);
      });
    }, 100);
  };

  return (
    <>
      <Modal visible={visible} transparent animationType="fade" onRequestClose={handleClose}>
        <BlurView intensity={20} tint="dark" style={styles.modalOverlay}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.modalContainer}
          >
          <View style={styles.modalContent}>
            {/* Header */}
            {currentStep !== 'reward' ? (
              <View style={styles.header}>
                <View style={styles.headerTop}>
                  <Text style={styles.title}>
                    {currentStep === 3 ? 'Kernbereiche bewerten' : `Schritt ${currentStep} von 2`}
                  </Text>
                  <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
                    <Ionicons name="close" size={28} color="#666" />
                  </TouchableOpacity>
                </View>
                <Text style={styles.subtitle}>{connection?.company}</Text>
                <Text style={styles.category}>{connection?.category}</Text>
              </View>
            ) : (
              <View style={styles.rewardHeaderMinimal}>
                <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
                  <Ionicons name="close" size={28} color="#666" />
                </TouchableOpacity>
              </View>
            )}

            {/* Step 1: Drei Erfolgs-Fragen */}
            {currentStep === 1 && (
              <View style={styles.stepContent}>
                {/* Frage 1: Zufriedenheit mit Ergebnis */}
                <View style={styles.questionContainer}>
                  <Text style={styles.questionTitle}>Wie zufrieden warst du mit dem Ergebnis?</Text>
                  <RateScale
                    rate={resultSatisfaction}
                    size="medium"
                    showLabel={false}
                    interactive={true}
                    onValueChange={setResultSatisfaction}
                  />
                </View>

                {/* Frage 2: Würdest du wieder arbeiten? */}
                <View style={styles.questionContainer}>
                  <Text style={styles.questionTitle}>Würdest du wieder mit diesem Anbieter arbeiten?</Text>
                  <RateScale
                    rate={wouldWorkAgain}
                    size="medium"
                    showLabel={false}
                    interactive={true}
                    onValueChange={setWouldWorkAgain}
                  />
                </View>

                {/* Frage 3: Zufriedenheit mit Ablauf */}
                <View style={styles.questionContainer}>
                  <Text style={styles.questionTitle}>Wie zufrieden warst du mit dem Ablauf insgesamt?</Text>
                  <RateScale
                    rate={processSatisfaction}
                    size="medium"
                    showLabel={false}
                    interactive={true}
                    onValueChange={setProcessSatisfaction}
                  />
                </View>
              </View>
            )}

            {/* Step 2: Erfolgsscore & Kommentar */}
            {currentStep === 2 && (
              <View style={styles.stepContent}>
                <Text style={styles.sectionTitle}>Erfolgsscore</Text>
                <Text style={styles.overallHint}>
                  Berechnet aus deinen drei Bewertungen
                </Text>
                
                {/* RateScale */}
                <View style={styles.scoreRateScale}>
                  <RateScale
                    rate={successScore}
                    size="medium"
                    showLabel={false}
                  />
                </View>

                {/* Kommentarfeld */}
                <View style={styles.commentSection}>
                  <Text style={styles.commentSectionTitle}>
                    Beschreibe die Connection <Text style={styles.optionalTag}>(optional)</Text>
                  </Text>
                  
                  <View style={styles.inspirationBox}>
                    <Text style={styles.inspirationText}>
                      💡 z.B. Projektdetails, besondere Stärken, Verbesserungspotenzial, ROI
                    </Text>
                  </View>
                  
                  <TouchableOpacity 
                    style={styles.commentInputTouchable}
                    activeOpacity={1}
                    onPress={() => setIsCommentFocused(true)}
                  >
                    <Text style={[
                      styles.commentInputPlaceholder,
                      comment && styles.commentInputText
                    ]}>
                      {comment || 'Was andere über diese Connection wissen sollten...'}
                    </Text>
                  </TouchableOpacity>
                  <Text style={styles.charCount}>{comment.length}/200</Text>
                </View>
              </View>
            )}

            {/* Reward Screen */}
            {currentStep === 'reward' && (
              <View style={styles.rewardContent}>
                {/* Checkmark Icon */}
                <View style={styles.rewardIconContainer}>
                  <View style={styles.rewardIconCircle}>
                    <Ionicons name="checkmark" size={56} color="#4CAF50" />
                  </View>
                </View>

                {/* Headline */}
                <Text style={styles.rewardHeadline}>Geschafft!</Text>

                {/* Subline */}
                <Text style={styles.rewardSubline}>
                  Damit bringst du mehr Wahrheit in die Wirtschaft.
                </Text>

                {/* Frage */}
                <View style={styles.rewardQuestion}>
                  <Text style={styles.rewardQuestionText}>
                    Möchtest du noch etwas ergänzen für mehr Transparenz?
                  </Text>
                </View>

                {/* Buttons */}
                <View style={styles.rewardButtons}>
                  <PrimaryButton
                    title="Nein, fertig"
                    variant="secondary"
                    onPress={handleFinishWithoutCoreRatings}
                    flex={1}
                  />
                  <PrimaryButton
                    title="Ja, gerne"
                    icon="arrow-forward"
                    onPress={handleNext}
                    flex={1}
                  />
                </View>
              </View>
            )}

            {/* Step 3: 4 Kernbereiche */}
            {currentStep === 3 && (
              <View style={styles.stepContent}>
                {categories.map((cat, index) => {
                  const bounceAnims = [sliderBounceAnim1, sliderBounceAnim2, sliderBounceAnim3, sliderBounceAnim4];
                  const bounceAnim = bounceAnims[index];
                  
                  return (
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
                      <GradientSlider
                        value={cat.value}
                        onValueChange={cat.setValue}
                        minimumValue={1}
                        maximumValue={10}
                        bounceAnim={bounceAnim}
                      />
                    </View>
                  );
                })}
              </View>
            )}

            {/* Footer mit Buttons */}
            {currentStep !== 'reward' && (
              <View style={styles.footer}>
                {currentStep === 1 ? (
                  <PrimaryButton
                    title="Weiter"
                    icon="arrow-forward"
                    onPress={handleNext}
                    disabled={!allQuestionsAnswered}
                  />
                ) : currentStep === 2 ? (
                  <View style={styles.footerRow}>
                    <PrimaryButton
                      title="Zurück"
                      variant="secondary"
                      onPress={handleBack}
                      flex={1}
                    />
                    <PrimaryButton
                      title="Abschließen"
                      icon="checkmark"
                      onPress={handleNext}
                      flex={2}
                    />
                  </View>
                ) : (
                  <View style={styles.footerRow}>
                    <PrimaryButton
                      title="Abbrechen"
                      variant="secondary"
                      onPress={handleClose}
                    />
                    <PrimaryButton
                      title="Absenden"
                      icon="checkmark"
                      onPress={handleSubmit}
                      disabled={!allSlidersAnswered}
                      flex={1}
                    />
                  </View>
                )}
              </View>
            )}
          </View>
        </KeyboardAvoidingView>
      </BlurView>

      {/* Kommentar Overlay */}
      {isCommentFocused && (
        <View style={styles.commentOverlayFullscreen}>
          <Animated.View 
            style={[
              styles.commentOverlayBackdrop,
              { opacity: commentFadeAnim }
            ]}
          >
            <TouchableOpacity 
              style={StyleSheet.absoluteFill}
              activeOpacity={1}
              onPress={() => setIsCommentFocused(false)}
            />
          </Animated.View>
          <Animated.View 
            style={[
              styles.commentOverlayContent,
              {
                opacity: commentFadeAnim,
                transform: [{ translateY: commentSlideAnim }]
              }
            ]}
          >
            {/* Header */}
            <View style={styles.commentOverlayHeader}>
              <View>
                <Text style={styles.commentOverlayTitle}>Beschreibe die Connection</Text>
                <Text style={styles.commentOverlaySubtitle}>Was andere wissen sollten</Text>
              </View>
              <View style={styles.commentScoreBadge}>
                <Text style={styles.commentScoreText}>{successScore}%</Text>
              </View>
            </View>

            {/* Inspirations-Hint */}
            <View style={styles.commentOverlayInspiration}>
              <Text style={styles.commentOverlayInspirationText}>
                💡 z.B. Projektdetails, besondere Stärken, Verbesserungspotenzial, ROI
              </Text>
            </View>

            {/* TextInput */}
            <TextInput
              style={styles.commentOverlayInput}
              value={comment}
              onChangeText={setComment}
              placeholder="Beschreibe deine Erfahrung..."
              placeholderTextColor="#999"
              multiline
              maxLength={200}
              textAlignVertical="top"
              autoFocus={true}
              returnKeyType="done"
              blurOnSubmit={true}
              onSubmitEditing={() => {
                setIsCommentFocused(false);
              }}
              onBlur={() => {
                setTimeout(() => setIsCommentFocused(false), 100);
              }}
            />
            <Text style={styles.commentOverlayCharCount}>{comment.length}/200</Text>
          </Animated.View>
        </View>
      )}
      </Modal>

      {/* Thank You Animation - außerhalb des Modals */}
      {showThankYou && (
        <View style={styles.thankYouContainer}>
          <Animated.View 
            style={[
              styles.checkmarkCircle,
              { 
                opacity: thankYouOpacity,
                transform: [{ scale: thankYouScale }]
              }
            ]}
          >
            <Ionicons name="checkmark" size={64} color="#10B981" />
          </Animated.View>
        </View>
      )}
    </>
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
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
    minHeight: 500,
  },
  header: {
    padding: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  rewardHeaderMinimal: {
    padding: 20,
    paddingBottom: 0,
    alignItems: 'flex-end',
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
    paddingVertical: 12,
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
  overallHint: {
    fontSize: 12,
    color: '#999',
    marginBottom: 16,
    fontStyle: 'italic',
  },
  questionContainer: {
    marginBottom: 24,
  },
  questionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#000',
    marginBottom: 16,
  },
  scoreRateScale: {
    marginTop: 0,
    marginBottom: 20,
  },
  commentSection: {
    marginTop: 4,
  },
  commentSectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#000',
    marginBottom: 12,
  },
  optionalTag: {
    fontSize: 13,
    fontWeight: '400',
    color: '#999',
  },
  inspirationBox: {
    backgroundColor: '#E3F2FD',
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#90CAF9',
  },
  inspirationText: {
    fontSize: 12,
    color: '#1565C0',
    lineHeight: 18,
  },
  commentInputTouchable: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    minHeight: 100,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
    justifyContent: 'flex-start',
  },
  commentInputPlaceholder: {
    fontSize: 14,
    color: '#999',
    lineHeight: 20,
  },
  commentInputText: {
    color: '#000',
  },
  charCount: {
    fontSize: 11,
    color: '#999',
    marginTop: 6,
    textAlign: 'right',
  },
  // Kommentar Overlay Styles
  commentOverlayFullscreen: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 3000,
  },
  commentOverlayBackdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  commentOverlayContent: {
    position: 'absolute',
    top: 140,
    left: 20,
    right: 20,
  },
  commentOverlayHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  commentOverlayTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  commentOverlaySubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  commentScoreBadge: {
    backgroundColor: '#000',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  commentScoreText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFF',
  },
  commentOverlayInspiration: {
    backgroundColor: 'rgba(66, 165, 245, 0.15)',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(66, 165, 245, 0.3)',
  },
  commentOverlayInspirationText: {
    fontSize: 12,
    color: '#90CAF9',
    lineHeight: 18,
  },
  commentOverlayInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    fontSize: 16,
    color: '#000',
    minHeight: 150,
    textAlignVertical: 'top',
    borderWidth: 2,
    borderColor: '#000',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.3,
    shadowRadius: 30,
    elevation: 20,
  },
  commentOverlayCharCount: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    marginTop: 8,
    textAlign: 'right',
  },
  // Reward Screen Styles
  rewardContent: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 20,
    alignItems: 'center',
  },
  rewardIconContainer: {
    marginBottom: 20,
  },
  rewardIconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 6,
  },
  rewardHeadline: {
    fontSize: 28,
    fontWeight: '800',
    color: '#000',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  rewardSubline: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 22,
    paddingHorizontal: 10,
  },
  rewardQuestion: {
    backgroundColor: '#F8F9FA',
    borderRadius: 16,
    padding: 18,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  rewardQuestionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    textAlign: 'center',
    lineHeight: 20,
  },
  rewardButtons: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
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
  // Thank You Animation Styles
  thankYouContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10000,
    pointerEvents: 'none',
    backgroundColor: 'transparent',
  },
  checkmarkCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(16, 185, 129, 0.12)',
    borderWidth: 2,
    borderColor: 'rgba(16, 185, 129, 0.35)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 8,
  },
});

