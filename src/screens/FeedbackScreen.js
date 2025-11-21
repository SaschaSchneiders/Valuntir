import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
  Alert,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { BlurView } from 'expo-blur';
import PrimaryButton from '../shared/PrimaryButton';

export default function FeedbackScreen() {
  const navigation = useNavigation();
  const [feedbackType, setFeedbackType] = useState(null);
  const [feedbackText, setFeedbackText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isInputModalVisible, setIsInputModalVisible] = useState(false);

  // Animation values for Input Modal
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  const feedbackTypes = [
    { id: 'idea', label: 'Idee', icon: 'bulb-outline' },
    { id: 'praise', label: 'Lob', icon: 'heart-outline' },
    { id: 'criticism', label: 'Kritik', icon: 'thumbs-down-outline' },
    { id: 'bug', label: 'Bug', icon: 'bug-outline' },
    { id: 'other', label: 'Sonstiges', icon: 'chatbubble-outline' },
  ];

  useEffect(() => {
    if (isInputModalVisible) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 50,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isInputModalVisible]);

  const handleSubmit = () => {
    if (!feedbackType) {
      Alert.alert('Fehler', 'Bitte wähle eine Kategorie aus.');
      return;
    }
    if (feedbackText.trim().length === 0) {
      Alert.alert('Fehler', 'Bitte gib dein Feedback ein.');
      return;
    }

    setIsSubmitting(true);

    // Simulierte API-Anfrage
    setTimeout(() => {
      setIsSubmitting(false);
      Alert.alert(
        'Danke!',
        'Dein Feedback wurde erfolgreich gesendet. Wir schätzen deine Meinung sehr!',
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    }, 1500);
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#F8F9FA', '#FFFFFF', '#F8F9FA']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <SafeAreaView style={styles.safeArea} edges={['top']}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="chevron-back" size={28} color="#000" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Feedback geben</Text>
            <View style={styles.headerSpacer} />
          </View>

          <ScrollView 
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.introText}>
              Wir möchten uns stetig verbessern. Teile uns mit, was dir gefällt, was nicht, oder welche Ideen du hast!
            </Text>

            {/* Kategorie-Auswahl - Neues Design */}
            <Text style={styles.sectionTitle}>Worum geht es?</Text>
            <View style={styles.typeGrid}>
              {feedbackTypes.map((type) => (
                <TouchableOpacity
                  key={type.id}
                  style={[
                    styles.typeButton,
                    feedbackType === type.id && styles.typeButtonActive
                  ]}
                  onPress={() => setFeedbackType(type.id)}
                >
                  <View style={[
                    styles.iconContainer,
                    feedbackType === type.id && styles.iconContainerActive
                  ]}>
                    <Ionicons 
                      name={type.icon} 
                      size={20} 
                      color={feedbackType === type.id ? '#10B981' : '#666'} 
                    />
                  </View>
                  <Text style={[
                    styles.typeLabel,
                    feedbackType === type.id && styles.typeLabelActive
                  ]}>
                    {type.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Fake Input Field - Triggers Modal */}
            <Text style={styles.sectionTitle}>Deine Nachricht</Text>
            <TouchableOpacity 
              style={styles.fakeInput}
              onPress={() => setIsInputModalVisible(true)}
              activeOpacity={0.8}
            >
              <Text style={[
                styles.fakeInputText, 
                !feedbackText && styles.placeholderText
              ]}>
                {feedbackText || "Schreibe hier dein Feedback..."}
              </Text>
              <Ionicons name="create-outline" size={20} color="#9CA3AF" />
            </TouchableOpacity>

          </ScrollView>

          {/* Footer Button */}
          <View style={styles.footer}>
            <PrimaryButton
              title={isSubmitting ? 'Wird gesendet...' : 'Feedback senden'}
              onPress={handleSubmit}
              disabled={isSubmitting || !feedbackType || !feedbackText.trim()}
              icon={!isSubmitting ? 'paper-plane-outline' : undefined}
            />
          </View>
        </SafeAreaView>
      </LinearGradient>

      {/* Input Modal Overlay */}
      {isInputModalVisible && (
        <View style={styles.modalOverlayFullscreen}>
          <BlurView intensity={20} tint="dark" style={StyleSheet.absoluteFill}>
            <Animated.View 
              style={[
                styles.modalBackdrop,
                { opacity: fadeAnim }
              ]}
            >
              <TouchableOpacity 
                style={StyleSheet.absoluteFill}
                activeOpacity={1}
                onPress={() => setIsInputModalVisible(false)}
              />
            </Animated.View>
          </BlurView>
          
          <Animated.View 
            style={[
              styles.modalContent,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }]
              }
            ]}
          >
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Dein Feedback</Text>
              <TouchableOpacity onPress={() => setIsInputModalVisible(false)}>
                <Ionicons name="close-circle" size={24} color="#666" />
              </TouchableOpacity>
            </View>
            
            <TextInput
              style={styles.modalInput}
              placeholder="Schreibe hier dein Feedback..."
              placeholderTextColor="#999"
              value={feedbackText}
              onChangeText={setFeedbackText}
              multiline
              textAlignVertical="top"
              autoFocus={true}
              maxLength={1000}
            />
            
            <View style={styles.modalFooter}>
              <Text style={styles.charCount}>{feedbackText.length}/1000</Text>
              <PrimaryButton 
                title="Fertig" 
                onPress={() => setIsInputModalVisible(false)}
                size="compact"
              />
            </View>
          </Animated.View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
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
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  backButton: {
    padding: 4,
    width: 36,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#000',
  },
  headerSpacer: {
    width: 36,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100,
  },
  introText: {
    fontSize: 15,
    color: '#4B5563',
    lineHeight: 22,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 16,
  },
  typeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 40,
  },
  typeButton: {
    width: '48%', // 2 Spalten
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  typeButtonActive: {
    borderColor: '#10B981',
    backgroundColor: '#F0FDF4',
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  iconContainerActive: {
    backgroundColor: '#FFFFFF',
  },
  typeLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4B5563',
  },
  typeLabelActive: {
    color: '#10B981',
    fontWeight: '600',
  },
  fakeInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    padding: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    minHeight: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 2,
  },
  fakeInputText: {
    fontSize: 14,
    color: '#000',
    flex: 1,
    lineHeight: 20,
  },
  placeholderText: {
    color: '#999',
  },
  footer: {
    padding: 20,
    paddingBottom: Platform.OS === 'ios' ? 20 : 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.05)',
    backgroundColor: '#FFFFFF',
  },
  // Modal Styles
  modalOverlayFullscreen: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1000,
    justifyContent: 'flex-start', // Start from top
    paddingTop: Platform.OS === 'ios' ? 120 : 80, // Safe area padding
  },
  modalBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    marginHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  modalInput: {
    fontSize: 16,
    color: '#111827',
    minHeight: 150,
    textAlignVertical: 'top',
    marginBottom: 16,
    lineHeight: 24,
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    paddingTop: 16,
  },
  charCount: {
    fontSize: 13,
    color: '#9CA3AF',
  },
});
