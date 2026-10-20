# RealLifeRP – Evocity Loading Screen

Live: https://master290600.github.io/realliferp-loading/

## Musik hochladen

Beliebige MP3s (auch mehrere) im Repository-Stamm oder einem Unterordner hochladen. **GitHub Actions erzeugt und veröffentlicht die Playlist automatisch.** Nach erfolgreicher Veröffentlichung den Screen neu laden. Identische Dateien zählen nur einmal. Titelreihenfolge ist standardmäßig zufällig. Play/Pause, Lautstärke und **» Nächstes Lied** stehen im Radio zur Verfügung.

[Musik-Anleitung und Einstellungen](MUSIC.md)

## Garry's Mod

In der serverseitigen garrysmod/cfg/autoexec.cfg:

```cfg
sv_loadingurl "https://master290600.github.io/realliferp-loading/"
```

Alternativ +sv_loadingurl als Startparameter. ?preview=1 zeigt markierte Demo-Downloaddaten.

## Gestaltung

Fünf unveränderte Originalaufnahmen von rp_evocity_rlrp und separate transparente Figurengrafiken im GTA-V-Ladebildstil: Polizist, Mechaniker, Arzt, Gangstergruppe am Waffenladen und ein Mann im Anzug beim Tonstudio. Figur und Hintergrund bewegen sich unabhängig. Die Stadt wurde nicht neu generiert. 16 Tipps wechseln alle 10 Sekunden, 6 Haupttexte mit Unterzeile alle 12 Sekunden. Bildwechsel alle 16 Sekunden; Animationen können pausiert werden.

## Veröffentlichung

Pages-Quelle: GitHub Actions. .github/workflows/pages.yml verwendet build-playlist.cjs, um alle MP3s zu erfassen, gleiche Audiodateien anhand SHA-256 zusammenzufassen und einen vollständigen statischen Seitenstand nach _site zu kopieren. Es gibt keine separaten Titel-Commits und keine API-Abfragen aus dem Player. Die Playlist wird bei jedem Upload neu gebaut.

Ein tatsächlicher DarkRP-Serverbeitritt ist weiterhin separat zu prüfen. Engine-Callbacks und Musiklautstärke: https://wiki.facepunch.com/gmod/Loading_URL
