# Eigene Hintergrundmusik hinzufügen

1. Dieses Repository öffnen: https://github.com/Master290600/realliferp-loading
2. **Add file → Upload files** auswählen.
3. Eine MP3-Datei mit dem exakten Namen **music.mp3** hochladen (klein geschrieben, direkt im Repository-Stamm neben index.html).
4. **Commit changes** anklicken und die GitHub-Pages-Veröffentlichung abwarten.

Danach ist die Musik für alle Spieler verfügbar. Das Hochladen oder Auswählen einer Datei nur im Browser würde sie nicht für andere Spieler speichern.

## Einstellungen

In config.js:

```js
music: {
  src: "music.mp3",
  title: "Mein Titel",
  volume: 0.25,
  autoplay: true
},
```

Lautstärke: 0 bis 1. `src: ""` deaktiviert Musik. Andere relative Dateipfade und direkte HTTPS-Audiolinks sind möglich. YouTube-/Spotify-Seitenlinks funktionieren nicht als Audiodatei. Kleine MP3-Dateien vermeiden zusätzliche lange Downloads. Es ist noch kein Musiktitel enthalten.

Im Spiel startet die Musik nach GameDetails mit der konfigurierten Lautstärke multipliziert mit snd_musicvolume des Spielers. Ein Spieler mit Musiklautstärke 0 bleibt stumm. Manuelles Pausieren wird respektiert. In normalen Browsern kann Autoplay blockiert sein; dort Play verwenden. Fehlende oder fehlerhafte Musik beeinträchtigt den Ladefortschritt nicht.

## Bildaufbau

Die fünf Stadtfotos sind byte-identische Kopien der vom Nutzer bereitgestellten Originalaufnahmen von rp_evocity_rlrp. Farbfilter, Zoom und leichte Kamerafahrt erfolgen ausschließlich im CSS. Polizist und Mechanikerin sind separat generierte transparente PNGs im GTA-V-Ladebildstil. Figuren und Hintergrund bewegen sich auf unabhängigen Ebenen. Keine Lauf-, Skelett- oder Körperanimation. „Animation pausieren“ hält Kamerafahrt, Figurenbewegung und Bildwechsel an. Reduzierte Bewegung wird berücksichtigt.
