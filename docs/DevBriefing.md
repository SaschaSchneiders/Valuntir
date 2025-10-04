📄 Valuntir – MVP Briefing (für Entwickler)
Top Tier Value - Verified Excellence

🧠 Grundprinzip
	•	Anbieter registrieren sich mit Firmenprofil & wählen ihren Benutzernamen (eindeutig)
	•	Kunden (also Geschäftspartner) bekommen über diesen Benutzernamen eine Einladung zur Bestätigung einer Zusammenarbeit
	•	Sobald der Kunde die Connection bestätigt, kann er anonym Feedback abgeben
	•	Das Feedback fließt in die öffentliche Erfolgsquote des Anbieters ein

⸻

🧱 Hauptrollen

1. Anbieter (registrierter Nutzer)
	•	Hat ein Profil mit:
	•	Firmenname
	•	Standort
	•	Branche
	•	Logo
	•	Benutzername (z. B. @topdach123)
	•	Kann neue Connections eintragen (per Benutzername)
	•	Sieht eigene Erfolgsquote (z. B. 74 % sehr zufrieden)
	•	Hat ein Abo (monatliches Connection-Kontingent)

2. Kunde (anonymer Nutzer)
	•	Muss nichts registrieren
	•	Bekommt nur einen Link (z. B. seprove.com/confirm/topdach123)
	•	Bestätigt die Geschäftsbeziehung
	•	Gibt dann 1× Feedback:
	•	Sehr zufrieden
	•	Zufrieden
	•	Neutral
	•	Unzufrieden

⸻

🔄 Workflow (Connection-Flow)

Anbieter loggt sich ein → klickt „Neue Connection erstellen“  
→ Gibt @Benutzername des Kunden ein  
→ Kunde erhält Link oder bekommt ihn persönlich übermittelt  
→ Kunde klickt Link → bestätigt → gibt Feedback ab  
→ System speichert Bewertung (anonym!)  
→ Erfolgsquote des Anbieters wird aktualisiert


⸻

📱 App Screens (Flutter)

1. Login/Register
	•	E-Mail + Passwort
	•	Benutzername bei Registrierung wählen (muss eindeutig sein)

2. Dashboard
	•	Erfolgsquote (Kreisdiagramm oder Balken)
	•	Anzahl Projekte insgesamt
	•	Button: „Neue Connection anlegen“

3. Neue Connection
	•	Eingabe: @Benutzername des Kunden
	•	Bestätigung: „Anfrage gesendet“

4. Connection-Liste
	•	Tabelle: Projekt-ID, Status (offen / bestätigt / bewertet)
	•	Keine Kundennamen sichtbar

5. Profil-Seite
	•	Firmenname, Branche, Logo, Standort, Benutzername

6. Abo / Paketübersicht
	•	Aktuelles Paket
	•	Verfügbare Connections
	•	Button „Upgrade“ (Stripe / PayPal Integration)

⸻

🌐 Kunden-Flow (als Web-Komponente)

1. Link-Aufruf (valuntir.com/confirm/topdach123)
	•	Text:
„[Anbietername] hat dich eingeladen, die Zusammenarbeit zu bestätigen.“
	•	Button: „Ja, das Projekt hat stattgefunden“

2. Feedback-Seite
	•	Frage: „Wie zufrieden warst du mit dem Ergebnis?“
	•	Optionen:
	•	Sehr zufrieden ✅
	•	Zufrieden 🙂
	•	Neutral 😐
	•	Unzufrieden ❌
	•	Nach Abgabe:
„Vielen Dank. Dein Feedback wurde anonym gespeichert.“

→ Kein Login nötig, keine Rückverfolgung

⸻

🛠️ Tech Stack & Hinweise
	•	Flutter für Anbieter-App (iOS + Android)
	•	Next.js oder Supabase Edge Functions für Web-Komponenten (z. B. Bestätigungs-/Feedbackseite)
	•	Stripe für Abo-Integration
	•	Firebase oder Supabase für Auth + DB
	•	Push Notifications für neue Bewertungen (z. B. via OneSignal)

⸻

🧾 Datenmodell (vereinfacht)

Anbieter
	•	ID
	•	E-Mail
	•	Benutzername (unique)
	•	Firmenname
	•	Branche
	•	Standort
	•	Logo
	•	Abo-Typ
	•	Connections Left

Connection
	•	ID
	•	Anbieter_ID
	•	Kunden_Benutzername
	•	Status: pending / confirmed / rated
	•	Bewertung: 1–4 (optional)

⸻

✅ MVP ist abgeschlossen, wenn:
	•	Anbieter können sich registrieren und einloggen
	•	Sie können Verbindungen per Benutzername anstoßen
	•	Kunden können bestätigen & bewerten
	•	Erfolgsquote wird sichtbar aktualisiert
	•	Es gibt ein Abo-Modell mit monatlichem Connection-Limit
	•	Eine öffentliche Profilseite pro Anbieter zeigt:
	•	Anzahl Projekte
	•	Bewertungsverteilung
	•	Erfolgsquote (als Zahlen & Grafik)

⸻

🔒 Datenschutz / Sicherheit
	•	Keine Klarnamen der Kunden gespeichert
	•	Feedback vollständig anonymisiert
	•	DSGVO-ready durch Pseudonymisierung
	•	Optional: Logging für Missbrauchsverfolgung

