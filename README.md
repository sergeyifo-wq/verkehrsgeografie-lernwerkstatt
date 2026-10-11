# Verkehrsgeografie Lernwerkstatt

Interaktive Lernplattform zur **Wirtschafts- und Verkehrsgeografie** (Semester 1) – auf Basis des Lernbuchs nach dem Skriptum von Prof. (FH) Mag. Dr. Andreas Breinbauer (FH des BFI Wien, Oktober 2026).

**Live:** https://sergeyifo-wq.github.io/verkehrsgeografie-lernwerkstatt/

## Inhalt

- **Lernen:** alle 6 Kapitel als „Liniennetz“ mit Abschnitten als Stationen, markiert nach den Schwerpunkten des Professors (Schwerpunkt / Überblick / Klausur sicher), mit Definitionen, Merke-Boxen, Beispielen, Aktualitäts-Check, Zusammenfassung und Kontrollfragen samt Lösungen
- **Erklärfilme:** 15 animierte Filme (≈ 100 Szenen) mit Sprachausgabe, Untertiteln, Tempo- und Stimmenwahl – u. a. eigene Filme zu Belt and Road, Irland und Globalisierung/2008-09
- **Schaubilder & Karten:** über 40 neu gezeichnete Abbildungen, Karten zu Seerouten, Suez vs. Kap, Neuer Seidenstraße, Landbrücken, Mittlerem Korridor, Blauer Banane, Donau
- **Prüfung:** 36 offene Fragen (kein Multiple Choice) – Klausursimulation mit Timer (60/75/90 min), Übungsmodus, die 5 sicheren Klausurfragen; Bewertung über Erwartungshorizont, automatische Vorauswahl erkannter Punkte, Musterantworten in ganzen Sätzen, Notenschätzung, Hinweis bei Stichpunkten statt Sätzen
- **Glossar:** 230 Begriffe, im Lerntext antippbar
- **Lernkarten:** Karteikasten nach Leitner (Begriffe und Kontrollfragen)
- **Labor:** Christaller (K = 3/4/7), Hägerstrand-Simulation, Demografischer Übergang, Rechner Suez vs. Kap
- **Klausur-Kompass:** Schwerpunkte, Antwort-Rezept, 7-Tage-Lernplan, Zeitleiste
- Suche (Strg + K), Hell/Dunkel, Fortschritt und Klausurtermin-Countdown

## Technik

Reines HTML/CSS/JavaScript ohne Build-Schritt. Karten mit d3-geo und world-atlas (Natural Earth) vom CDN. Fortschritt, Antworten und Lernkarten-Stände werden nur im `localStorage` des Browsers gespeichert.

| Datei | Inhalt |
| --- | --- |
| `index.html`, `css/style.css` | Seite und Design |
| `js/app.js` | Router, Ansichten, Prüfungsmodus, Glossar, Lernkarten, Suche |
| `js/player.js` | Film-Player (Szenen, Untertitel, Web Speech API) |
| `js/films.js` | Drehbücher der Erklärfilme |
| `js/viz.js`, `js/figs.js` | Diagramm- und Kartenbaukasten, alle Schaubilder |
| `js/lab.js` | Interaktive Modelle |
| `data/k1.js` … `data/k6.js` | Kapitelinhalte |
| `data/glossar.js`, `data/fragen.js` | Glossar und Fragenpool |

Lokal starten: im Ordner `python -m http.server` und `http://localhost:8000` öffnen.

## Hinweis

Private Lernhilfe; ersetzt weder Vorlesung noch Foliensatz. Ergänzungen über das Skriptum hinaus (z. B. Motive der BRI, Hintergrund der Finanzkrise 2008) sind im Text als solche gekennzeichnet.
