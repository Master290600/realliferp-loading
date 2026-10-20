# Eigene Hintergrundmusik hinzufügen

Beliebig viele MP3-Dateien über **Add file → Upload files** in dieses Repository hochladen: https://github.com/Master290600/realliferp-loading

Dateinamen dürfen frei gewählt werden. Auch Unterordner wie music/ und die Endung .MP3 werden erkannt. Nach jedem Upload erstellt GitHub Actions automatisch eine neue Playlist und veröffentlicht die Website. Warte, bis der Workflow **Publish loading screen and music playlist** erfolgreich ist, und lade den Screen danach neu.

## Wiedergabe

- Zufällige Reihenfolge bei jedem Öffnen; nach dem letzten Titel geht es wieder von vorne los.
- Play/Pause und Lautstärkeregler bleiben erhalten.
- **» / Nächstes Lied** springt weiter. Bei nur einem unterschiedlichen Lied ist der Button deaktiviert.
- Identische Audiodateien unter mehreren Namen zählen als ein Titel. War.mp3 und music.mp3 enthalten aktuell dieselbe Datei.
- Neue oder ersetzte Audiodateien erhalten eine Versionskennung gegen veraltete Browser-Caches.
- Keine manuelle Titelliste und keine GitHub-API-Abfrage durch Spieler nötig.

## Einstellungen in config.js

```js
music: {
  auto: true,
  manifest: "playlist.json",
  src: "music.mp3",
  title: "RealLifeRP Radio",
  volume: 0.25,
  autoplay: true,
  shuffle: true
},
```

Die automatisch erzeugte playlist.json liegt in der veröffentlichten Website, nicht im Quellbranch. src dient als Rückfall, falls die Playlist nicht geladen werden kann. shuffle: false spielt alphabetisch. Für ausschließlich manuelle Titel auto: false setzen und tracks: [{src: "song-a.mp3", title: "Song A"}, {src: "song-b.mp3", title: "Song B"}] verwenden. Musik deaktivieren: auto: false und src: "" ohne tracks.

Im Spiel startet Musik nach GameDetails. Die tatsächliche Lautstärke ist die konfigurierte Lautstärke mal snd_musicvolume des Spielers. Musiklautstärke 0 bleibt stumm. In normalen Browsern kann ein Klick auf Play nötig sein. Manuelles Pausieren wird beibehalten. Bei einer defekten Audiodatei versucht der Player das nächste Lied; der Ladebildschirm läuft weiter.

Die Stadtaufnahmen bleiben unveränderte Originale von rp_evocity_rlrp. Polizist, Mechanikerin, Arzt und Waffenhändler sind separate transparente Figurenebenen.

Veröffentlichung nach dem offiziellen GitHub-Pages-Verfahren: https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages
