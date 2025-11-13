Es existieren bereits automatisch erstellte Profile aus der Vergangenheit (weil wir sie bei Transaktionen generiert haben) und diese müssen später rückwirkend verschmolzen werden – sauber, eindeutig und ohne Chaos.

Das ist ein ganz anderer Prozess und der muss sauber designt sein, sonst zerstört man die Datenlogik.

Hier ist jetzt der korrekte, vollständige Schritt-für-Schritt-Prozess für das Zusammenführen bereits bestehender Anbieterprofile:

⸻

🔁 Schritt-für-Schritt-Prozess: Mehrere IBAN‑Profile zu EINEM Anbieterprofil zusammenführen

Ausgangslage
	•	Für „Metallbauer Schmidt“ existieren z. B. 3 Profile:
	1.	Profil A – IBAN 1 – 8 Bewertungen
	2.	Profil B – IBAN 2 – 3 Bewertungen
	3.	Profil C – IBAN 3 – 1 Bewertung

Das Business-Mitglied will nun alle zu einem einzigen offiziellen Profil zusammenführen.

⸻

✅ 1. Business-Nutzer wählt sein „Hauptprofil“ aus

Das ist das Profil, das er „übernehmen“ will (inkl. Verifizierung + Business-Plan).

Dieses Profil wird zum Master-Profil.

⸻

✅ 2. Nutzer startet „weitere IBANs zusammenführen“

Er klickt auf:
„Weitere Konten / IBANs zu meinem Unternehmen hinzufügen“

Dann beginnt er IBAN für IBAN den Verifizierungsprozess (Open Banking).

⸻

✅ 3. Das System erkennt: Diese IBAN gehört zu einem EXISTIERENDEN Profil

Beispiel:
Der Nutzer verifiziert IBAN 2 → Das System sieht:

✔ „IBAN 2 gehört zu Profil B.“
→ Jetzt wird ein Merging‑Prozess gestartet.

Wichtig:
Wir dürfen NIEMALS IBANs einfach „nur hinzufügen“, wenn sie bereits ein eigenes Anbieterprofil haben.
Sonst doppelte Datensätze → Chaos.

⸻

✅ 4. System führt folgende Logik aus

Sobald IBAN 2 erfolgreich verifiziert wurde (= legitimer Eigentümer):

Das System führt automatisch aus:

a) Alle Bewertungen von Profil B → wandern zu Profil A

inkl.:
	•	Erfolgsfragen‑Scores
	•	Zeitreihen
	•	Volumen
	•	Kommentare
	•	Berechnete Erfolgsquote
	•	Historische Entwicklung

b) Profil B wird markiert als „verschmolzen“

Nicht gelöscht – aber:
	•	nicht mehr öffentlich auffindbar
	•	nur als „System-Merge-Eintrag“ archiviert
	•	dient als Audit-Trail (Compliance)

c) IBAN 2 wird nun dauerhaft mit Profil A verknüpft

⸻

✅ 5. Der Nutzer wiederholt das für IBAN 3 / Profil C

Ablauf identisch.
Damit entsteht aus 3 Profilen ein einziges konsistentes Profil.

⸻

🔒 6. System verhindert Missbrauch

Folgende Mechanismen sind Pflicht:

Sicherheitschecks:
	•	Nur derjenige, der per Open Banking Zugriff auf die IBAN hat, darf mergen
	•	Eine IBAN darf nur EINEM Master-Profil gehören
	•	Der Merging-Prozess ist irreversibel (nur Admin kann rückgängig machen)
	•	Keine Bewertungen gehen verloren
	•	Keine doppelte Zählung

⸻

🎯 Ergebnis nach dem Merge

Metallbauer Schmidt sieht nur noch EIN Profil:
	•	alle 12 Bewertungen
	•	zusammengeführte Erfolgsquote
	•	richtiger zeitlicher Verlauf
	•	nur EIN öffentlicher Anbieterauftritt
	•	alle IBANs sauber verknüpft

Öffentlich sichtbar:
	•	Profil A
	•	B & C existieren nicht mehr sichtbar in der Plattform
	•	Suchindex wird aktualisiert
	•	Google-Index (falls öffentlich) ebenfalls bereinigt

⸻

🧠 Warum ist dieser Prozess perfekt?

Weil er:
	1.	vollautomatisch ist (kein Support, kein Flaschenhals)
	2.	100% sicher ist (Open Banking beweist Eigentümerschaft)
	3.	Datenintegrität garantiert (keine Duplikate, keine Fehler)
	4.	Anbieter nicht verwirrt
	5.	Nutzern maximale Transparenz gibt
	6.	Skalierbar für Millionen Anbieter ist