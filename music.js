(function () {
  "use strict";
  var settings = (window.LOADING_CONFIG || {}).music || {};
  var audio = document.getElementById("background-music"), toggle = document.getElementById("music-toggle");
  var nextButton = document.getElementById("music-next"), slider = document.getElementById("music-volume");
  var title = document.getElementById("music-title"), status = document.getElementById("music-status"), equalizer = document.getElementById("equalizer");
  var gameVolume = 1, manuallyPaused = false, unavailable = false, starting = false, ready = false, wantsPlay = false;
  var tracks = [], index = 0, failed = {}, generation = 0;
  var userVolume = typeof settings.volume === "number" && isFinite(settings.volume) ? Math.max(0, Math.min(1, settings.volume)) : 0.25;
  function validSource(src) { return typeof src === "string" && src.trim() && !/^\/\//.test(src) && (!/^[a-z][a-z0-9+.-]*:/i.test(src) || /^https:\/\//i.test(src)); }
  function normalise(list) {
    var seen = {};
    return (Array.isArray(list) ? list : []).map(function (track) { return typeof track === "string" ? {src:track} : track; }).filter(function (track) {
      if (!track || !validSource(track.src) || seen[track.src]) return false;
      seen[track.src] = true; return true;
    }).map(function (track) { return {src:track.src, title:track.title || track.src.split('/').pop().split('?')[0].replace(/\.mp3$/i,'')}; });
  }
  function syncVolume() {
    audio.volume = userVolume * gameVolume; slider.value = Math.round(userVolume * 100);
    if (gameVolume === 0) status.textContent = "Im Spiel stummgeschaltet";
    else if (status.textContent === "Im Spiel stummgeschaltet") status.textContent = "";
  }
  function syncState() {
    var playing = !audio.paused && !unavailable && !starting;
    toggle.textContent = playing ? "Ⅱ" : "▶";
    toggle.setAttribute("aria-label", playing ? "Musik pausieren" : "Musik abspielen");
    toggle.setAttribute("aria-pressed", String(playing));
    equalizer.className = playing && audio.volume > 0 ? "equalizer playing" : "equalizer";
  }
  function noTracks(message) {
    unavailable = true; starting = false; title.textContent = message || "Zurzeit ohne Musik";
    status.textContent = ""; toggle.disabled = true; slider.disabled = true; nextButton.disabled = true; syncState();
  }
  function play() {
    if (!ready || starting || unavailable || !tracks.length || manuallyPaused || gameVolume === 0) return;
    var attempt = generation;
    starting = true; status.textContent = "Musik wird geladen …";
    try {
      var result = audio.play();
      if (result && result.then) result.then(function () { if (attempt !== generation) return; starting = false; syncState(); }, function (error) {
        if (attempt !== generation) return;
        starting = false;
        if (unavailable || (error && error.name === "AbortError")) return;
        status.textContent = error && error.name === "NotAllowedError" ? "Zum Starten auf Play klicken" : "Musik konnte nicht gestartet werden";
        syncState();
      }); else starting = false;
    } catch (error) { starting = false; status.textContent = "Zum Starten auf Play klicken"; }
  }
  function selectTrack(position, resume) {
    generation++; starting = false; index = position;
    audio.pause(); audio.src = tracks[index].src; audio.load();
    title.textContent = tracks[index].title;
    toggle.title = (index + 1) + " / " + tracks.length + " Lieder";
    status.textContent = gameVolume === 0 ? "Im Spiel stummgeschaltet" : "";
    syncState(); if (resume) play();
  }
  function advance(resume) {
    for (var step = 1; step <= tracks.length; step++) {
      var candidate = (index + step) % tracks.length;
      if (!failed[tracks[candidate].src]) { selectTrack(candidate, resume); return; }
    }
    noTracks("Musikdateien nicht erreichbar");
  }
  function configure(list) {
    tracks = normalise(list); ready = true;
    if (!tracks.length) { noTracks(); return; }
    if (settings.shuffle !== false) for (var i = tracks.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)), swap = tracks[i]; tracks[i] = tracks[j]; tracks[j] = swap; }
    unavailable = false; toggle.disabled = false; slider.disabled = false; nextButton.disabled = tracks.length < 2;
    nextButton.title = tracks.length < 2 ? "Für das nächste Lied eine weitere MP3 hochladen" : "Nächstes Lied";
    selectTrack(0, wantsPlay);
  }
  window.LoadingMusic = {
    setGameVolume: function (value) {
      if (typeof value === "number" && isFinite(value)) gameVolume = Math.max(0, Math.min(1, value));
      syncVolume(); syncState();
      if (settings.autoplay !== false && gameVolume > 0) { wantsPlay = true; play(); }
    }
  };
  audio.loop = false; syncVolume();
  audio.addEventListener("playing", function () { starting = false; status.textContent = gameVolume === 0 ? "Im Spiel stummgeschaltet" : ""; syncState(); });
  audio.addEventListener("pause", syncState); audio.addEventListener("volumechange", syncState);
  audio.addEventListener("ended", function () { if (!unavailable) advance(!manuallyPaused); });
  audio.addEventListener("error", function () {
    if (!ready || !tracks.length || unavailable) return;
    failed[tracks[index].src] = true; advance(wantsPlay && !manuallyPaused);
  });
  toggle.addEventListener("click", function () {
    if (!audio.paused || starting) { manuallyPaused = true; starting = false; audio.pause(); }
    else { manuallyPaused = false; wantsPlay = true; play(); }
  });
  nextButton.addEventListener("click", function () { if (tracks.length < 2) return; var resume = !manuallyPaused && (!audio.paused || starting); advance(resume); });
  slider.addEventListener("input", function () { userVolume = Number(slider.value) / 100; syncVolume(); syncState(); });
  var fallback = normalise(settings.tracks || (settings.src ? [{src:settings.src,title:settings.title}] : []));
  if (settings.auto === true && window.fetch) {
    title.textContent = "Playlist wird geladen …";
    window.fetch(settings.manifest || "playlist.json", {cache:"no-store"}).then(function (response) {
      if (!response.ok) throw Error("Playlist unavailable"); return response.json();
    }).then(function (data) { configure(data.tracks); }, function () { configure(fallback); });
  } else configure(fallback);
}());
