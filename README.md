# RealLifeRP – Evocity Loading Screen

Live: https://master290600.github.io/realliferp-loading/

## Eigene Musik

Einfach eine MP3 namens **music.mp3** über **Add file → Upload files** in den Repository-Stamm hochladen. Nach dem GitHub-Pages-Deployment ist sie aktiv. Titel, Lautstärke und Autoplay stehen in **config.js**. Eine fertige Musikdatei wurde nicht mitgeliefert.

[Ausführliche Musik-Anleitung](MUSIC.md)

## Garry's Mod

Serverseitig in garrysmod/cfg/autoexec.cfg:

```cfg
sv_loadingurl "https://master290600.github.io/realliferp-loading/"
```

Alternativ Startparameter `+sv_loadingurl` mit derselben URL. `?preview=1` ist ausschließlich eine gekennzeichnete Designvorschau mit simulierten Downloaddaten.

## Gestaltung

Fünf unveränderte Originalaufnahmen der Map **rp_evocity_rlrp**, vom Nutzer bereitgestellt. Farblook und Kamerafahrt über CSS. Zwei separat generierte transparente Figuren im GTA-V-Ladebildstil, unabhängig vom Hintergrund bewegt. Keine generierten Ersatzgebäude und keine anderen Maps.

Bildwechsel alle 16 Sekunden. Animationen können pausiert werden; reduzierte Bewegung wird berücksichtigt. Das sind animierte Bildebenen, keine laufenden oder per Skelett animierten Figuren.

## Technik

Statisches HTML/CSS/JavaScript. Kein Backend, keine Tracker oder externen Fonts. Engine-Callbacks liefern Serverinfos, Status und Dateidownload-Fortschritt. 100 % Dateidownloads bedeutet noch keinen abgeschlossenen Spielbeitritt. Musik startet nach GameDetails und respektiert die Musiklautstärke des Spielers; normale Browser können Play benötigen.

Die lokale Server-Konfiguration wurde nicht verändert. Ein echter DarkRP-Serverbeitritt ist noch separat zu prüfen.

Technische Quelle: https://wiki.facepunch.com/gmod/Loading_URL
