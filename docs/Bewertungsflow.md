
🧭 VALUNTIR – Bewertungsflow (final, warmer Flow)

⸻

1. Einstiegspunkt

Der Bewertungsprozess startet immer dann, wenn eine neue Transaktion erkannt wird, die einem registrierten oder neuen Anbieter zugeordnet werden kann.
In der Transaktionsübersicht erscheint daraufhin ein Eintrag mit dem Button:
→ „Jetzt bewerten“

Von hier aus teilt sich der Flow in zwei logische Pfade:
	•	A) Anbieter existiert bereits → bestehendes Profil
	•	B) Anbieter ist neu → First-Mover-Profil wird erstellt

⸻

2. Fall A – Anbieter wurde bereits bewertet (bestehendes Profil)

Der Nutzer gelangt direkt in den normalen Bewertungsflow.

Schritt 1 – Hauptbewertung (Erfolgsscore-Fragen)

Drei Kernfragen werden gestellt, die gemeinsam den Erfolgsscore bilden:
	1.	Wie zufrieden warst du mit dem Ergebnis?
	2.	Würdest du wieder mit diesem Anbieter arbeiten?
	3.	Wie zufrieden warst du mit dem Ablauf insgesamt?

→ Jede Frage wird auf derselben Skala beantwortet (z. B. 0–100).
→ Der Mittelwert, mit Gewichtung (50 / 35 / 15 %), ergibt den Erfolgsscore der Bewertung.

⸻

Schritt 2 – Kommentar (optional)

Nach der Beantwortung der drei Fragen erhält der Nutzer die Möglichkeit, eine kurze Freitext-Ergänzung abzugeben (max. 200 Zeichen).
	•	Optional, aber Pflicht, wenn der Erfolgsscore unter 35 % liegt.
	•	Zweck: negative Bewertungen müssen kurz begründet werden, um die Datenqualität zu sichern.

⸻

Schritt 3 – Bestätigung / Abschluss-Feedback

Nach der Bewertung erscheint eine kurze, emotionale Abschlussnachricht:

„Geschafft! Damit bringst du mehr Wahrheit in die Wirtschaft.“

Anschließend erhält der Nutzer die Auswahl:
	•	„Ja, gerne“ → führt zum optionalen Soft-Facts-Teil
	•	„Nein, fertig“ → beendet den Bewertungsprozess

⸻

Schritt 4 – Soft-Facts (optional)

Wenn der Nutzer „Ja, gerne“ auswählt, öffnet sich ein weiterer, freiwilliger Schritt.
Hier werden ergänzende Eindrücke zur Zusammenarbeit abgefragt (nicht score-relevant).

Die abgefragten Kriterien richten sich nach der Branche / dem Zieltyp des Anbieters:

Beispiel	Soft-Facts
Handwerk / Dienstleistung	Kommunikation, Preis-Leistung, Qualität der Arbeit, Verlässlichkeit
Gastronomie / Hotellerie / Events	Servicequalität, Preis-Leistung, Qualität des Essens, Freundlichkeit / Ambiente
Beratung / Coaching / Consulting	Verständlichkeit, Nutzen, Zielorientierung, Vertrauen
Ärztlich / Gesundheitlich	Betreuung, Ergebnisqualität, Aufklärung, Nachsorge
Behörden / öffentliche Einrichtungen	Verständlichkeit, Geschwindigkeit, Freundlichkeit, Ergebnisqualität

Diese Werte werden gesondert gespeichert und im Anbieterprofil unter „Bewertungsdetails“ visualisiert.

⸻

Schritt 5 – Abschluss

Nach Abschluss (mit oder ohne Soft-Facts) erscheint eine kurze Bestätigung:

„Danke! Deine Bewertung wurde erfolgreich gespeichert.“

Der Nutzer wird danach automatisch zur App-Startseite bzw. ins Dashboard zurückgeführt.

⸻

3. Fall B – Anbieter wurde noch nie bewertet (First Mover)

Wenn der Anbieter noch kein Profil in der Datenbank hat, wird automatisch der First-Mover-Flow gestartet.

Schritt 1 – Glückwunsch + Zieltyp-Auswahl (gemeinsamer Screen)

Der Nutzer erhält eine positive Rückmeldung:

„Herzlichen Glückwunsch!
Du bist der Erste, der dieses Unternehmen bewertet.
Damit legst du den Grundstein für sein öffentliches Vertrauensprofil.“

Darunter folgt die Aufforderung, den Zieltyp der Zusammenarbeit zu wählen.

Beispiele für Zieltypen:
	1.	Ärztliche / gesundheitliche Behandlung
	2.	Handwerk / handwerkliche Arbeit
	3.	Dienstleistung / Serviceleistung
	4.	Beratung / Coaching / Consulting
	5.	Produktkauf / Handel
	6.	Gastronomie / Hotellerie / Events
	7.	Bildung / Schulung / Training
	8.	Behördlicher / öffentlicher Vorgang
	9.	Sonstiges

Sobald der Nutzer den passenden Zieltyp auswählt und auf „Weiter“ klickt, wird:
	•	automatisch ein neues Anbieterprofil erstellt
	•	die Kategorie gespeichert (wichtig für spätere Soft-Facts)

⸻

Schritt 2 – Hauptbewertung (identisch zu Fall A)

Nach der Zieltyp-Auswahl startet automatisch der gleiche Bewertungsprozess wie bei bestehenden Anbietern:
	1.	Drei Hauptfragen (Ergebnis, Wiederbeauftragung, Ablauf)
	2.	Kommentar (optional, unter 35 % verpflichtend)
	3.	Checkmark / Dankes-Screen
	4.	Soft-Facts (optional)
	5.	Abschluss

⸻

4. Berechnungs- und Logikstruktur
	•	Die Erfolgsscore-Bewertung basiert auf den drei Hauptfragen:
	•	Frage 1 (Ergebnis): 50 % Gewicht
	•	Frage 2 (Wiederbeauftragung): 35 % Gewicht
	•	Frage 3 (Ablauf): 15 % Gewicht
	•	Soft-Facts fließen nicht in den Score ein, sondern dienen der öffentlichen Detailbewertung im Anbieterprofil.
	•	Kommentare sind optional, werden aber verpflichtend bei sehr niedrigen Bewertungen (< 35 %).
	•	Jede Bewertung ist anonym und wird nach Verifizierung (Transaktion ≥ 25 €) freigegeben.

⸻

5. Zusammenfassung der Flow-Struktur

Situation	Schritte	Beschreibung
Bestehender Anbieter	1	Hauptbewertung (3 Fragen)
	2	Kommentar optional / Pflicht unter 35 %
	3	Checkmark + Dankes-Text
	4	Soft-Facts optional
	5	Abschluss
Neuer Anbieter (First Mover)	1	Glückwunsch + Zieltyp-Auswahl (ein Screen)
	2	Hauptbewertung (3 Fragen)
	3	Kommentar optional / Pflicht unter 35 %
	4	Checkmark + Dankes-Text
	5	Soft-Facts optional
	6	Abschluss