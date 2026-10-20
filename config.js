// Öffentlich sichtbare Einstellungen. Keine Tokens oder Passwörter eintragen.
window.LOADING_CONFIG = {
  name: "RealLifeRP",
  map: "rp_evocity_rlrp",
  tagline: "Ein neuer Tag. Eine neue Rolle. Mach die Stadt zu deiner.",
  accent: "#d5ad7a",
  // Optional: echter Discord-Einladungslink. Leer = Bereich ausblenden.
  discord: "",
  // Einfach eine MP3 namens music.mp3 in den Repository-Stamm hochladen.
  // Alternativ hier einen anderen Dateipfad oder direkten HTTPS-Audiolink setzen.
  // src: "" schaltet Musik vollständig aus. Keine YouTube-/Spotify-Seitenlinks.
  music: { src: "music.mp3", title: "RealLifeRP Radio", volume: 0.25, autoplay: true },
  backgrounds: [
    { src: "images/rp_evocity_rlrp0000.jpg", character: "images/officer.png", label: "MITTEN IN EVOCITY", credit: "rp_evocity_rlrp · Originalaufnahme" },
    { src: "images/rp_evocity_rlrp0001.jpg", character: "images/mechanic.png", label: "DEIN NÄCHSTES GESCHÄFT", credit: "rp_evocity_rlrp · Originalaufnahme" },
    { src: "images/rp_evocity_rlrp0003.jpg", character: "", label: "DA, WENN ES ZÄHLT", credit: "rp_evocity_rlrp · Originalaufnahme" },
    { src: "images/rp_evocity_rlrp0004.jpg", character: "images/officer.png", label: "EINE STADT. VIELE ROLLEN.", credit: "rp_evocity_rlrp · Originalaufnahme" },
    { src: "images/rp_evocity_rlrp0005.jpg", character: "images/mechanic.png", label: "DEIN FEIERABEND BEGINNT HIER", credit: "rp_evocity_rlrp · Originalaufnahme" }
  ],
  tips: [
    { title: "Deine Rolle beginnt bei dir.", body: "Ob du ein Geschäft eröffnest oder für Ordnung sorgst: Gib deiner Figur eine Geschichte." },
    { title: "Gute Geschichten entstehen zusammen.", body: "Lass anderen Raum zum Mitspielen. Aus einer kleinen Begegnung kann die nächste große Geschichte werden." },
    { title: "Neu in der Stadt?", body: "Nimm dir Zeit, die Stadt und ihre Möglichkeiten kennenzulernen. Dein nächstes Kapitel beginnt gleich." }
  ]
};
