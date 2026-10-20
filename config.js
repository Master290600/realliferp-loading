// Öffentlich sichtbare Einstellungen. Keine Tokens oder Passwörter eintragen.
window.LOADING_CONFIG = {
  name: "RealLifeRP",
  map: "rp_evocity_rlrp",
  tagline: "Ein neuer Tag. Eine neue Rolle. Mach die Stadt zu deiner.",
  // Große Überschrift + Unterzeile wechseln alle 12 Sekunden.
  headlines: [
    { top: "real life", bottom: "roleplay", tagline: "Ein neuer Tag. Eine neue Rolle. Mach die Stadt zu deiner." },
    { top: "deine stadt", bottom: "dein weg", tagline: "Zwischen Alltag und Abenteuer beginnt deine Geschichte in Evocity." },
    { top: "neue rolle", bottom: "neuer tag", tagline: "Lerne Menschen kennen. Knüpfe Kontakte. Finde deinen Platz." },
    { top: "dein plan", bottom: "dein moment", tagline: "Aus einer kleinen Idee kann dein nächstes großes Projekt werden." },
    { top: "dein leben", bottom: "deine story", tagline: "Jede Begegnung kann den Verlauf deiner Geschichte verändern." },
    { top: "viele wege", bottom: "ein zuhause", tagline: "Willkommen bei RealLifeRP. Willkommen in Evocity." }
  ],
  accent: "#d5ad7a",
  // Optional: echter Discord-Einladungslink. Leer = Bereich ausblenden.
  discord: "",
  // Alle MP3s werden bei jeder Veröffentlichung automatisch in playlist.json erfasst.
  // Beliebige Namen, auch im Ordner music/. Doppelte Dateiinhalte laufen nur einmal.
  // auto: false verwendet stattdessen src oder eine manuelle tracks-Liste.
  music: { auto: true, manifest: "playlist.json", src: "music.mp3", title: "RealLifeRP Radio", volume: 0.25, autoplay: true, shuffle: true },
  backgrounds: [
    { src: "images/rp_evocity_rlrp0000.jpg", character: "images/officer.png", label: "MITTEN IN EVOCITY", credit: "rp_evocity_rlrp · Originalaufnahme" },
    { src: "images/rp_evocity_rlrp0001.jpg", character: "images/mechanic.png", label: "DEIN NÄCHSTES GESCHÄFT", credit: "rp_evocity_rlrp · Originalaufnahme" },
    { src: "images/rp_evocity_rlrp0003.jpg", character: "images/doctor.png", label: "DA, WENN ES ZÄHLT", credit: "rp_evocity_rlrp · Originalaufnahme" },
    { src: "images/rp_evocity_rlrp0004.jpg", character: "images/merchant.png", label: "DAS RICHTIGE ANGEBOT", credit: "rp_evocity_rlrp · Originalaufnahme" },
    { src: "images/rp_evocity_rlrp0005.jpg", character: "images/mechanic.png", label: "DEIN FEIERABEND BEGINNT HIER", credit: "rp_evocity_rlrp · Originalaufnahme" }
  ],
  tips: [
    { title: "Deine Rolle beginnt bei dir.", body: "Ob du ein Geschäft eröffnest oder für Ordnung sorgst: Gib deiner Figur eine Geschichte." },
    { title: "Gute Geschichten entstehen zusammen.", body: "Lass anderen Raum zum Mitspielen. Aus einer kleinen Begegnung kann die nächste große Geschichte werden." },
    { title: "Neu in der Stadt?", body: "Nimm dir Zeit, die Stadt und ihre Möglichkeiten kennenzulernen. Dein nächstes Kapitel beginnt gleich." },
    { title: "Erst ankommen, dann durchstarten.", body: "Schau dich in Evocity um. Wer die Wege kennt, findet sich im nächsten Einsatz oder Alltag leichter zurecht." },
    { title: "Ein Gespräch kann viel verändern.", body: "Sprich andere an, stell Fragen und hör zu. Gute Kontakte entstehen oft ganz nebenbei." },
    { title: "Deine Figur hat eine Perspektive.", body: "Überlege, was deine Figur selbst erlebt und erfahren hat. Dieses Wissen macht ihre Entscheidungen glaubwürdig." },
    { title: "Ein Beruf ist mehr als ein Titel.", body: "Fülle deine Rolle mit Leben: Ein freundlicher Service oder ein gutes Gespräch bleibt anderen im Gedächtnis." },
    { title: "Kleine Ziele, große Geschichten.", body: "Setz dir ein Ziel für den Tag. Ein neuer Kontakt, ein Auftrag oder eine Geschäftsidee ist ein guter Anfang." },
    { title: "Zusammen geht mehr.", body: "Such dir Mitspieler für deine Pläne. Unterschiedliche Rollen machen gemeinsame Szenen interessanter." },
    { title: "Lass der Szene Zeit.", body: "Gib deinem Gegenüber Gelegenheit zu reagieren. Nicht jede Situation muss sofort entschieden sein." },
    { title: "Auch Rückschläge erzählen etwas.", body: "Ein gescheiterter Plan kann der Anfang einer neuen Geschichte sein. Spiel die Folgen mit aus." },
    { title: "Ein Zuhause mit Charakter.", body: "Wenn du dir einen Ort einrichtest, denke an seine Geschichte. Kleine Details machen ihn persönlich." },
    { title: "Frag lieber einmal nach.", body: "Wenn dir ein Ablauf unklar ist, frag nach Hilfe. Niemand muss am ersten Tag alles kennen." },
    { title: "Hinter jeder Figur sitzt ein Mensch.", body: "Bleib im Umgang miteinander respektvoll. Ein spannender Konflikt im Spiel braucht keinen Streit außerhalb davon." },
    { title: "Mach Platz für Überraschungen.", body: "Du musst nicht jede Begegnung vorausplanen. Manchmal entsteht das beste Rollenspiel aus dem Unerwarteten." },
    { title: "Feierabend gehört auch dazu.", body: "Nach einem langen Tag in der Stadt bleibt Zeit für Gespräche und neue Bekanntschaften. Genieß den Moment." }
  ]
};
