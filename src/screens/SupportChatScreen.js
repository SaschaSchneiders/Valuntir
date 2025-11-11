import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

// FAQ Datenbank mit Antworten
const FAQ_DATABASE = {
  'Was ist Valuntir?': 'Valuntir ist die erste Plattform für echte Erfolgsquoten. Hier kannst du sehen, wie erfolgreich Anbieter wirklich sind – basierend auf verifizierten Geschäftsbeziehungen, nicht auf Fake-Bewertungen.',
  'Wie unterscheidet sich Valuntir von anderen Bewertungsplattformen?': 'Im Gegensatz zu klassischen Bewertungsplattformen basieren unsere Erfolgsquoten auf 100% verifizierten Geschäftsbeziehungen mit echten Zahlungen. Keine Fake-Reviews, keine gekauften Bewertungen.',
  'Ist Valuntir kostenlos?': 'Ja! Die Free-Version ist komplett kostenlos. Du kannst Anbieter bewerten, Erfolgsquoten sehen und dein Profil nutzen. Für erweiterte Features wie das First Mover Programm brauchst du ein Pro-Abo.',
  'Wer kann Bewertungen abgeben?': 'Jeder, der eine verifizierte Geschäftsbeziehung zu einem Anbieter hat. Das kann ein einmaliger Auftrag oder eine dauerhafte Zusammenarbeit sein. Die Verifizierung erfolgt automatisch über unsere Bankintegration.',
  'Wie funktioniert die Verifizierung?': 'Wenn du einen Anbieter bewertest, verbindest du dein Bankkonto per Open Banking (read-only). Wir prüfen automatisch, ob eine echte Zahlung stattgefunden hat. Nur dann wird die Bewertung gezählt.',
  'Was kostet das Pro-Abo?': 'Das Pro-Abo kostet 4,90 € pro Monat und schaltet alle Premium-Features frei: First Mover Programm, erweiterte Analysen, unbegrenzte Suchfilter und vieles mehr.',
  'Wie funktioniert das First Mover Programm?': 'Sei der Erste, der einen Anbieter bewertet. Wenn dieser sein Profil später aktiviert, erhältst du 10% seines monatlichen Abo-Preises – automatisch und unbegrenzt, solange beide Accounts aktiv sind.',
};

// Schnellfragen für Quick Replies
const QUICK_QUESTIONS = [
  'Was ist Valuntir?',
  'Wie unterscheidet sich Valuntir von anderen Bewertungsplattformen?',
  'Ist Valuntir kostenlos?',
  'Wie funktioniert die Verifizierung?',
];

export default function SupportChatScreen({ navigation }) {
  const [messages, setMessages] = useState([
    {
      id: '1',
      text: 'Hallo! 👋 Ich bin dein Valuntir Support-Assistent. Wie kann ich dir helfen?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [showQuickReplies, setShowQuickReplies] = useState(true);
  const [isConnectedToSupport, setIsConnectedToSupport] = useState(false);
  const scrollViewRef = useRef(null);

  useEffect(() => {
    // Scroll to bottom when new message is added
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, [messages]);

  const handleSendMessage = (text) => {
    if (!text.trim()) return;

    // Add user message
    const userMessage = {
      id: Date.now().toString(),
      text: text,
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setShowQuickReplies(false);

    // Simulate bot thinking
    setTimeout(() => {
      handleBotResponse(text);
    }, 800);
  };

  const handleBotResponse = (userText) => {
    let botResponse = '';

    // Check if question matches FAQ
    const matchedFAQ = Object.keys(FAQ_DATABASE).find(
      (question) =>
        question.toLowerCase() === userText.toLowerCase() ||
        userText.toLowerCase().includes(question.toLowerCase().split(' ')[0])
    );

    if (matchedFAQ) {
      botResponse = FAQ_DATABASE[matchedFAQ];
    } else if (isConnectedToSupport) {
      // If connected to support, show pending message
      botResponse =
        'Deine Nachricht wurde an unser Support-Team weitergeleitet. Du bekommst hier eine Antwort, sobald ein Mitarbeiter verfügbar ist.';
    } else {
      // Default response if no match
      botResponse =
        'Entschuldigung, ich konnte keine passende Antwort finden. Möchtest du mit unserem echten Support-Team sprechen?';
    }

    const botMessage = {
      id: Date.now().toString(),
      text: botResponse,
      sender: isConnectedToSupport ? 'support' : 'bot',
      timestamp: new Date(),
      showSupportButton: !isConnectedToSupport && !matchedFAQ,
    };

    setMessages((prev) => [...prev, botMessage]);
  };

  const handleQuickReply = (question) => {
    handleSendMessage(question);
  };

  const handleConnectToSupport = () => {
    setIsConnectedToSupport(true);
    
    const supportMessage = {
      id: Date.now().toString(),
      text: 'Du bist jetzt mit dem Valuntir Support-Team verbunden. Ein Mitarbeiter wird dir so schnell wie möglich antworten.',
      sender: 'system',
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, supportMessage]);
  };

  const renderMessage = (message) => {
    const isUser = message.sender === 'user';
    const isSupport = message.sender === 'support';
    const isSystem = message.sender === 'system';

    return (
      <View
        key={message.id}
        style={[
          styles.messageContainer,
          isUser ? styles.userMessageContainer : styles.botMessageContainer,
        ]}
      >
        <View style={styles.messageRow}>
          {!isUser && !isSystem && (
            <View style={styles.avatarContainer}>
              <LinearGradient
                colors={isSupport ? ['#10B981', '#059669'] : ['#3B82F6', '#2563EB']}
                style={styles.avatar}
              >
                <Ionicons
                  name={isSupport ? 'person' : 'sparkles'}
                  size={16}
                  color="#FFFFFF"
                />
              </LinearGradient>
            </View>
          )}

          <View
            style={[
              styles.messageBubble,
              isUser && styles.userBubble,
              isSystem && styles.systemBubble,
              !isUser && !isSystem && styles.botBubble,
            ]}
          >
            {isSupport && (
              <Text style={styles.supportLabel}>Support-Team</Text>
            )}
            <Text
              style={[
                styles.messageText,
                isUser && styles.userMessageText,
                isSystem && styles.systemMessageText,
              ]}
            >
              {message.text}
            </Text>
          </View>
        </View>

        {message.showSupportButton && (
          <TouchableOpacity
            style={styles.supportButton}
            onPress={handleConnectToSupport}
          >
            <Ionicons name="headset" size={16} color="#3B82F6" />
            <Text style={styles.supportButtonText}>
              Mit echtem Support schreiben
            </Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

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
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="chevron-back" size={28} color="#000" />
            </TouchableOpacity>
            <View style={styles.headerCenter}>
              <Text style={styles.headerTitle}>Support & FAQ</Text>
              <Text style={styles.headerSubtitle}>
                {isConnectedToSupport ? 'Mit Support verbunden' : 'KI-Assistent'}
              </Text>
            </View>
            <View style={styles.headerSpacer} />
          </View>

          <KeyboardAvoidingView
            style={styles.keyboardAvoid}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
          >
            {/* Messages */}
            <ScrollView
              ref={scrollViewRef}
              style={styles.messagesContainer}
              contentContainerStyle={styles.messagesContent}
              showsVerticalScrollIndicator={false}
            >
              {/* Intro Hint */}
              <View style={styles.introHint}>
                <Text style={styles.introHintText}>
                  Stell deine Frage oder wähle eine der häufigen Fragen unten.
                </Text>
              </View>

              {/* Messages */}
              {messages.map(renderMessage)}

              {/* Quick Replies */}
              {showQuickReplies && (
                <View style={styles.quickRepliesContainer}>
                  <Text style={styles.quickRepliesTitle}>Häufige Fragen:</Text>
                  {QUICK_QUESTIONS.map((question, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.quickReplyButton}
                      onPress={() => handleQuickReply(question)}
                    >
                      <Text style={styles.quickReplyText}>{question}</Text>
                      <Ionicons name="chevron-forward" size={16} color="#3B82F6" />
                    </TouchableOpacity>
                  ))}
                </View>
              )}

              <View style={{ height: 20 }} />
            </ScrollView>

            {/* Input */}
            <View style={styles.inputContainer}>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  placeholder="Deine Frage..."
                  placeholderTextColor="#999"
                  value={inputText}
                  onChangeText={setInputText}
                  multiline
                  maxLength={500}
                />
                <TouchableOpacity
                  style={[
                    styles.sendButton,
                    !inputText.trim() && styles.sendButtonDisabled,
                  ]}
                  onPress={() => handleSendMessage(inputText)}
                  disabled={!inputText.trim()}
                >
                  <Ionicons
                    name="send"
                    size={20}
                    color={inputText.trim() ? '#FFFFFF' : '#CCC'}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
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
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  backButton: {
    padding: 4,
    width: 36,
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#000',
  },
  headerSubtitle: {
    fontSize: 12,
    fontWeight: '500',
    color: '#10B981',
    marginTop: 2,
  },
  headerSpacer: {
    width: 36,
  },
  keyboardAvoid: {
    flex: 1,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: 20,
  },
  introHint: {
    backgroundColor: 'rgba(59, 130, 246, 0.08)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.15)',
  },
  introHintText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#3B82F6',
    textAlign: 'center',
    lineHeight: 20,
  },
  messageContainer: {
    marginBottom: 16,
  },
  userMessageContainer: {
    alignItems: 'flex-end',
  },
  botMessageContainer: {
    alignItems: 'flex-start',
  },
  messageRow: {
    flexDirection: 'row',
    gap: 8,
  },
  avatarContainer: {
    marginTop: 4,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageBubble: {
    maxWidth: '75%',
    borderRadius: 20,
    padding: 14,
  },
  userBubble: {
    backgroundColor: '#3B82F6',
    borderBottomRightRadius: 4,
  },
  botBubble: {
    backgroundColor: '#F5F5F5',
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  systemBubble: {
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.2)',
    alignSelf: 'center',
    maxWidth: '85%',
  },
  supportLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#10B981',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  messageText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#333',
    lineHeight: 22,
  },
  userMessageText: {
    color: '#FFFFFF',
  },
  systemMessageText: {
    color: '#10B981',
    textAlign: 'center',
  },
  supportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 16,
    gap: 8,
    marginTop: 8,
    marginLeft: 40,
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.2)',
  },
  supportButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#3B82F6',
  },
  quickRepliesContainer: {
    marginTop: 8,
  },
  quickRepliesTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#666',
    marginBottom: 12,
  },
  quickReplyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  quickReplyText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    lineHeight: 20,
  },
  inputContainer: {
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: '#F5F5F5',
    borderRadius: 24,
    paddingLeft: 16,
    paddingRight: 4,
    paddingVertical: 4,
    gap: 8,
  },
  input: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
    color: '#000',
    maxHeight: 100,
    paddingVertical: 8,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#3B82F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: '#E5E5E5',
  },
});

