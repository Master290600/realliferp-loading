(function () {
  "use strict";
  var settings = (window.LOADING_CONFIG || {}).music || {};
  var audio = document.getElementById("background-music");
  var toggle = document.getElementById("music-toggle");
  var slider = document.getElementById("music-volume");
  var title = document.getElementById("music-title");
  var status = document.getElementById("music-status");
  var equalizer = document.getElementById("equalizer");
  var gameVolume = 1, manuallyPaused = false, unavailable = false, starting = false;
  var userVolume = typeof settings.volume === "number" && isFinite(settings.volume) ? Math.max(0, Math.min(1, settings.volume)) : 0.25;
  var src = typeof settings.src === "string" ? settings.src.trim() : "";
  function syncVolume() {
    audio.volume = userVolume * gameVolume;
    slider.value = Math.round(userVolume * 100);
    if (gameVolume === 0) status.textContent = "Im Spiel stummgeschaltet";
    else if (status.textContent === "Im Spiel stummgeschaltet") status.textContent = "";
  }
  function syncState() {
    var playing = !audio.paused && !unavailable;
    toggle.textContent = playing ? "Ⅱ" : "▶";
    toggle.setAttribute("aria-label", playing ? "Musik pausieren" : "Musik abspielen");
    toggle.setAttribute("aria-pressed", String(playing));
    equalizer.className = playing && audio.volume > 0 ? "equalizer playing" : "equalizer";
  }
  function failedPlay(error) {
    starting = false;
    if (unavailable || (error && error.name === "AbortError")) return;
    status.textContent = error && error.name === "NotAllowedError" ? "Zum Starten auf Play klicken" : "Musik konnte nicht gestartet werden";
    syncState();
  }
  function play() {
    if (starting || unavailable || !src || manuallyPaused) return;
    starting = true;
    try {
      var result = audio.play();
      if (result && result.then) result.then(function () { starting = false; syncState(); }, failedPlay);
      else starting = false;
    } catch (error) { failedPlay(error); }
  }
  window.LoadingMusic = {
    setGameVolume: function (value) {
      if (typeof value === "number" && isFinite(value)) gameVolume = Math.max(0, Math.min(1, value));
      syncVolume(); syncState();
      if (settings.autoplay !== false && gameVolume > 0) play();
    }
  };
  syncVolume();
  if (!src) { slider.disabled = true; return; }
  // Accept local relative files and direct HTTPS audio, never executable URLs.
  if (/^[a-z][a-z0-9+.-]*:/i.test(src) && !/^https:\/\//i.test(src) || /^\/\//.test(src)) {
    unavailable = true; status.textContent = "Ungültige Musikadresse"; slider.disabled = true; return;
  }
  toggle.disabled = false; title.textContent = settings.title || "RealLifeRP Radio";
  audio.addEventListener("playing", function () { starting = false; status.textContent = gameVolume === 0 ? "Im Spiel stummgeschaltet" : ""; syncState(); });
  audio.addEventListener("pause", syncState);
  audio.addEventListener("volumechange", syncState);
  audio.addEventListener("error", function () {
    unavailable = true; starting = false; title.textContent = "Zurzeit ohne Musik"; status.textContent = "";
    toggle.disabled = true; slider.disabled = true; syncState();
  });
  toggle.addEventListener("click", function () {
    if (!audio.paused || starting) { manuallyPaused = true; starting = false; audio.pause(); }
    else { manuallyPaused = false; play(); }
  });
  slider.addEventListener("input", function () { userVolume = Number(slider.value) / 100; syncVolume(); syncState(); });
  audio.src = src;
  // Engine autoplay starts in GameDetails, after the player's volume is known.
  // Browser visitors can start playback with Play.
}());
