# Vier gewinnt (Connect Four) - React Web App

Dies ist eine Implementierung des Spieleklassikers "Vier gewinnt" mit React. Das Mini-Projekt entstand im Rahmen des Moduls **Webentwicklung (WBE)** an der ZHAW School of Engineering.

**Team:** Myriam Schaad & Colin Dubuis

---

## Dokumentation
Eine **technische Kurzdokumentation** (Funktionsübersicht, Implementierungsdetails und Architektur) ist direkt in der Anwendung hinterlegt über den Button "Link zur Doku".

**[Hier klicken, um direkt die Doku zu öffnen](https://mysasc.github.io/connect4_react/docs/connect4_doc.html)**

---

## Bedienung & Spielregeln

Ziel ist es, als erste Person vier eigene Spielsteine (Rot oder Blau) in eine waagerechte, senkrechte oder diagonale Reihe zu bringen.

### Steuerung
* **Stein setzen:** Klicke einfach in die gewünschte Spalte auf dem Spielfeld. Der Stein fällt dank "Gravity Logic" automatisch auf den tiefsten freien Platz.
* **Statusanzeige:** Links neben dem Spielfeld ist zu sehen, welcher Spieler gerade am Zug ist oder wer gewonnen hat.

### Funktionen der Sidebar
| Button | Beschreibung |
| :--- | :--- |
| **Neues Spiel** | Setzt das Spielfeld komplett zurück und startet eine neue Runde. |
| **Spielzug zurück** | Macht den letzten Zug rückgängig. Nützlich bei Verklickern! |
| **Spiel speichern** | Speichert den aktuellen Spielstand (inkl. Verlauf) lokal im Browser. |
| **Spiel Laden** | Lädt den zuletzt gespeicherten Spielstand wieder. |
| **Link zur Doku** | Öffnet die technische Projektbeschreibung in einem neuen Tab. |

---

## Features & Technologie

Die Anwendung wurde mit **React (v19)** und **Vite** entwickelt.

* **Persistenz:** Dank `localStorage` Integration geht der Spielstand auch beim Schließen des Browsers nicht verloren (via Save/Load).
* **Responsives Design:** Das Layout passt sich automatisch an – von Desktop-Monitoren bis hin zu Smartphones.
* **Animationen:** Flüssige Animationen beim Einwerfen der Steine.
* **Win Detection:** Sofortige Erkennung von Gewinnern in alle vier Richtungen (Horizontal, Vertikal, Diagonal).

---

## Installation & Setup

Um das Projekt lokal auszuführen:

   ```bash
   git clone <REPO_URL_HIER>
   cd connect4-react
   npm install
   npm run dev 
