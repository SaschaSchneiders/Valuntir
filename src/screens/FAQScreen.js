import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export default function FAQScreen({ navigation }) {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const faqData = [
    {
      category: 'Allgemein',
      questions: [
        {
          question: 'Was ist Valuntir?',
          answer: 'Valuntir ist die erste transparente Plattform für Geschäftsbeziehungen, die echte Erfolgsquoten statt geschönter Referenzen zeigt. Wir machen es einfach, den richtigen Anbieter für dein Projekt zu finden – basierend auf verifizierten Daten.',
        },
        {
          question: 'Wie unterscheidet sich Valuntir von anderen Bewertungsplattformen?',
          answer: 'Bei uns können nur verifizierte Geschäftspartner bewerten. Jede Bewertung ist nachweisbar und mit echten Projektdaten hinterlegt. Keine gekauften Reviews, keine Fake-Bewertungen – nur messbare Erfolgsquoten.',
        },
        {
          question: 'Ist Valuntir kostenlos?',
          answer: 'Ja! Das Free-Paket ist dauerhaft kostenlos und bietet Zugang zu allen Basisfunktionen. Für erweiterte Features wie detaillierte Analytics oder Premium-Sichtbarkeit gibt es die Pro- und Business-Pakete.',
        },
      ],
    },
    {
      category: 'Bewertungen',
      questions: [
        {
          question: 'Wer kann Bewertungen abgeben?',
          answer: 'Nur verifizierte Geschäftspartner können Bewertungen abgeben. Das bedeutet: Es muss eine nachweisbare Geschäftsbeziehung bestehen. Beide Parteien müssen die Zusammenarbeit bestätigen, bevor eine Bewertung möglich ist.',
        },
        {
          question: 'Wie wird sichergestellt, dass Bewertungen echt sind?',
          answer: 'Jede Bewertung wird automatisch auf Plausibilität geprüft. Zudem müssen beide Parteien die Geschäftsbeziehung bestätigen. Verdächtige Muster werden durch KI erkannt und manuell überprüft.',
        },
        {
          question: 'Kann ich negative Bewertungen löschen lassen?',
          answer: 'Nein, das widerspricht unserem Transparenz-Prinzip. Du kannst jedoch auf jede Bewertung öffentlich antworten und deine Sicht der Dinge darstellen. Bei nachweislich falschen Angaben kannst du eine Prüfung beantragen.',
        },
        {
          question: 'Was ist eine Erfolgsquote?',
          answer: 'Die Erfolgsquote zeigt, wie viele Projekte erfolgreich abgeschlossen wurden im Verhältnis zu allen bewerteten Projekten. Ein erfolgreiches Projekt bedeutet: vereinbarte Ziele wurden erreicht, Budget/Zeit eingehalten, Kunde ist zufrieden.',
        },
      ],
    },
    {
      category: 'Für Anbieter',
      questions: [
        {
          question: 'Wie erstelle ich ein Anbieterprofil?',
          answer: 'Registriere dich mit deinen Unternehmensdaten und durchlaufe den Verifizierungsprozess. Nach erfolgreicher Prüfung kannst du dein Profil mit Keywords, Portfolio und Leistungen ergänzen.',
        },
        {
          question: 'Was kostet ein Anbieterprofil?',
          answer: 'Ein Basisprofil ist kostenlos. Mit Pro und Business erhältst du erweiterte Funktionen wie detaillierte Analytics, höhere Sichtbarkeit in der Suche und Zugang zu Premium-Features.',
        },
        {
          question: 'Wie werde ich verifiziert?',
          answer: 'Wir prüfen deine Unternehmensregistrierung, Gewerbeanmeldung oder Handelsregistereintrag. Der Prozess dauert in der Regel 1-2 Werktage. Du wirst per E-Mail informiert, sobald dein Profil verifiziert ist.',
        },
        {
          question: 'Kann ich wählen, welche Kennzahlen öffentlich sind?',
          answer: 'Ja! Du hast volle Kontrolle über die Sichtbarkeit deiner Daten. Erfolgsquote und Bewertungsanzahl sind immer sichtbar (Transparenz-Prinzip), aber Umsatzvolumen, Stammkundenanteil etc. kannst du ein- oder ausblenden.',
        },
      ],
    },
    {
      category: 'Für Kunden',
      questions: [
        {
          question: 'Wie finde ich den richtigen Anbieter?',
          answer: 'Nutze die Suchfunktion und filtere nach Standort, Keywords, Erfolgsquote und weiteren Kriterien. Vergleiche Profile anhand echter Kennzahlen und kontaktiere passende Anbieter direkt.',
        },
        {
          question: 'Muss ich zahlen, um Anbieter zu kontaktieren?',
          answer: 'Nein, die Suche und Kontaktaufnahme ist komplett kostenlos. Du zahlst nur, wenn du als Anbieter erweiterte Features nutzen möchtest.',
        },
        {
          question: 'Wie kontaktiere ich einen Anbieter?',
          answer: 'Klicke auf das Profil eines Anbieters und nutze das Kontaktformular. Der Anbieter erhält deine Anfrage und kann sich direkt bei dir melden.',
        },
      ],
    },
    {
      category: 'Datenschutz & Sicherheit',
      questions: [
        {
          question: 'Sind meine Daten sicher?',
          answer: 'Ja! Alle Daten werden mit 256-bit SSL-Verschlüsselung übertragen und auf deutschen Servern gespeichert. Wir sind zu 100% DSGVO-konform und verkaufen niemals Daten an Dritte.',
        },
        {
          question: 'Wer kann meine Kontaktdaten sehen?',
          answer: 'Nur du entscheidest, welche Informationen öffentlich sind. E-Mail und Telefonnummer sind standardmäßig nur für verifizierte Anbieter sichtbar, mit denen du Kontakt aufgenommen hast.',
        },
        {
          question: 'Kann ich mein Konto jederzeit löschen?',
          answer: 'Ja, du kannst dein Konto jederzeit in den Einstellungen löschen. Alle deine Daten werden innerhalb von 30 Tagen vollständig gelöscht. Bewertungen, die du abgegeben hast, bleiben aus Transparenzgründen bestehen.',
        },
      ],
    },
    {
      category: 'Abrechnung & Abo',
      questions: [
        {
          question: 'Wie kann ich upgraden?',
          answer: 'Gehe zu "Einstellungen" → "Mein Abo" und wähle das gewünschte Paket. Die Zahlung erfolgt sicher über Stripe. Das Upgrade ist sofort nach Zahlungseingang aktiv.',
        },
        {
          question: 'Kann ich jederzeit kündigen?',
          answer: 'Ja! Es gibt keine Mindestlaufzeit und keine Kündigungsfristen. Du kannst jederzeit in den Einstellungen kündigen. Das Abo läuft bis zum Ende des bezahlten Zeitraums weiter.',
        },
        {
          question: 'Gibt es eine Geld-zurück-Garantie?',
          answer: 'Ja, wir bieten eine 30-Tage-Geld-zurück-Garantie. Wenn du nicht zufrieden bist, erhältst du den vollen Betrag zurück – ohne Wenn und Aber.',
        },
        {
          question: 'Welche Zahlungsmethoden werden akzeptiert?',
          answer: 'Wir akzeptieren alle gängigen Kreditkarten (Visa, Mastercard, Amex), SEPA-Lastschrift und PayPal. Die Zahlung läuft über unseren zertifizierten Partner Stripe.',
        },
      ],
    },
    {
      category: 'Technisches',
      questions: [
        {
          question: 'Gibt es eine Desktop-Version?',
          answer: 'Ja! Valuntir ist als responsive Web-App verfügbar. Du kannst alle Funktionen auch bequem am Desktop nutzen. Eine dedizierte Desktop-App ist in Planung.',
        },
        {
          question: 'Funktioniert Valuntir auch offline?',
          answer: 'Grundlegende Funktionen wie das Ansehen von bereits geladenen Profilen funktionieren offline. Für Suche, Bewertungen und Nachrichten benötigst du eine Internetverbindung.',
        },
        {
          question: 'Ich habe einen Bug gefunden. Wo kann ich ihn melden?',
          answer: 'Vielen Dank! Schreibe uns an support@valuntir.de mit einer Beschreibung des Problems und Screenshots. Wir kümmern uns schnellstmöglich darum.',
        },
      ],
    },
  ];

  const toggleExpand = (categoryIndex, questionIndex) => {
    const key = `${categoryIndex}-${questionIndex}`;
    setExpandedIndex(expandedIndex === key ? null : key);
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
          </View>

          <ScrollView 
            style={styles.content}
            contentContainerStyle={styles.contentContainer}
            showsVerticalScrollIndicator={false}
          >
            {/* Hero */}
            <View style={styles.heroSection}>
              <View style={styles.iconContainer}>
                <Ionicons name="help-circle" size={48} color="#3B82F6" />
              </View>
              <Text style={styles.headline}>Häufige Fragen</Text>
              <Text style={styles.subheadline}>
                Hier findest du Antworten auf die wichtigsten Fragen rund um Valuntir
              </Text>
            </View>

            {/* FAQ Categories */}
            {faqData.map((category, categoryIndex) => (
              <View key={categoryIndex} style={styles.categorySection}>
                <Text style={styles.categoryTitle}>{category.category}</Text>
                
                {category.questions.map((item, questionIndex) => {
                  const key = `${categoryIndex}-${questionIndex}`;
                  const isExpanded = expandedIndex === key;
                  
                  return (
                    <TouchableOpacity
                      key={questionIndex}
                      style={[
                        styles.faqItem,
                        isExpanded && styles.faqItemExpanded,
                      ]}
                      onPress={() => toggleExpand(categoryIndex, questionIndex)}
                      activeOpacity={0.7}
                    >
                      <View style={styles.questionHeader}>
                        <Text style={styles.questionText}>{item.question}</Text>
                        <Ionicons 
                          name={isExpanded ? "chevron-up" : "chevron-down"} 
                          size={22} 
                          color="#666" 
                        />
                      </View>
                      
                      {isExpanded && (
                        <View style={styles.answerContainer}>
                          <Text style={styles.answerText}>{item.answer}</Text>
                        </View>
                      )}
                    </TouchableOpacity>
                  );
                })}
              </View>
            ))}

            {/* Contact CTA */}
            <View style={styles.contactCard}>
              <Ionicons name="chatbubble-ellipses" size={28} color="#3B82F6" />
              <Text style={styles.contactTitle}>Frage nicht dabei?</Text>
              <Text style={styles.contactText}>
                Unser Support-Team hilft dir gerne weiter
              </Text>
              <TouchableOpacity style={styles.contactButton}>
                <Text style={styles.contactButtonText}>Support kontaktieren</Text>
                <Ionicons name="arrow-forward" size={18} color="#3B82F6" />
              </TouchableOpacity>
            </View>

            <View style={{ height: 40 }} />
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
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    padding: 4,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  heroSection: {
    alignItems: 'center',
    marginBottom: 32,
    marginTop: 20,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  headline: {
    fontSize: 28,
    fontWeight: '800',
    color: '#000',
    textAlign: 'center',
    marginBottom: 12,
  },
  subheadline: {
    fontSize: 16,
    fontWeight: '500',
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  categorySection: {
    marginBottom: 24,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
    marginBottom: 16,
    paddingLeft: 4,
  },
  faqItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  faqItemExpanded: {
    borderColor: '#3B82F6',
    shadowColor: '#3B82F6',
    shadowOpacity: 0.1,
  },
  questionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  questionText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    lineHeight: 22,
  },
  answerContainer: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F5F5F5',
  },
  answerText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#666',
    lineHeight: 24,
  },
  contactCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 28,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F0F0F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
    marginTop: 8,
  },
  contactTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  contactText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 20,
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  contactButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#3B82F6',
  },
});

