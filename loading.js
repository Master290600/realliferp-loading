(function () {
  "use strict";
  var config = window.LOADING_CONFIG || {};
  var total = null, needed = null, live = false, demoTimer = null;
  var tips = config.tips && config.tips.length ? config.tips : [{ title: "Willkommen.", body: "Deine Geschichte beginnt gleich." }];
  var tipIndex = 0;
  function el(id) { return document.getElementById(id); }
  function text(id, value) { el(id).textContent = String(value); }
  function number(value) { var n = Number(value); return value !== null && value !== "" && isFinite(n) && n >= 0 ? Math.floor(n) : null; }
  function nativeEvent() { live = true; if (demoTimer) { clearInterval(demoTimer); demoTimer = null; } el("preview-label").hidden = true; }
  function progress() {
    var known = total !== null && needed !== null && total >= needed;
    var percent = known ? (total === 0 ? 100 : Math.round((total - needed) / total * 100)) : null;
    el("progress-fill").className = known ? "" : "indeterminate";
    el("progress-fill").style.width = known ? percent + "%" : "";
    text("percent", known ? percent + "%" : "•••");
    if (known) el("progress").setAttribute("aria-valuenow", percent);
    else el("progress").removeAttribute("aria-valuenow");
    text("count", known ? (total - needed) + " / " + total + " DATEIEN" : "BITTE EINEN MOMENT");
    if (known && needed === 0) text("file", "Dateidownloads abgeschlossen · Warte auf Spielstart");
  }
  window.GameDetails = function (servername, serverurl, mapname, maxplayers, steamid, gamemode, volume) {
    nativeEvent(); text("server", servername || config.name || "RealLifeRP");
    text("map", mapname || "Wird abgerufen"); text("gamemode", gamemode || "DarkRP");
    if (window.LoadingMusic) window.LoadingMusic.setGameVolume(volume);
  };
  window.SetFilesTotal = function (value) { nativeEvent(); total = number(value); progress(); };
  window.SetFilesNeeded = function (value) { nativeEvent(); needed = number(value); progress(); };
  window.DownloadingFile = function (name) { nativeEvent(); text("file", name); text("status", "Serverinhalte werden geladen"); };
  window.SetStatusChanged = function (status) { nativeEvent(); text("status", status); };
  text("brand", config.name || "RealLifeRP"); text("server", config.name || "RealLifeRP");
  if (config.map) text("map", config.map);
  text("footer-brand", (config.name || "RealLifeRP").toUpperCase());
  text("file", "Willkommen bei " + (config.name || "RealLifeRP") + ".");
  if (config.tagline) text("tagline", config.tagline);
  if (/^#[0-9a-f]{6}$/i.test(config.accent || "")) document.documentElement.style.setProperty("--accent", config.accent);
  if (/^https:\/\/(discord\.gg|discord\.com)\//i.test(config.discord || "")) {
    el("community").hidden = false; el("discord").href = config.discord; text("discord", config.discord.replace(/^https:\/\//, ""));
  }
  function showTip() {
    text("tip-title", tips[tipIndex].title); text("tip-body", tips[tipIndex].body);
    text("tip-number", ("0" + (tipIndex + 1)).slice(-2) + " / " + ("0" + tips.length).slice(-2));
    el("tip-dots").textContent = "";
    tips.forEach(function (_, i) { var dot = document.createElement("span"); dot.className = i === tipIndex ? "active" : ""; el("tip-dots").appendChild(dot); });
  }
  showTip(); setInterval(function () { tipIndex = (tipIndex + 1) % tips.length; showTip(); }, 10000);
  progress();
  // Explicit opt-in only. Production never invents connection or player data.
  if (/(?:\?|&)preview=1(?:&|$)/.test(window.location.search)) {
    el("preview-label").hidden = false; text("map", (config.map || "rp_evocity_rlrp") + " (Demo)");
    total = 240; needed = 172; progress(); text("status", "Serverinhalte werden geladen");
    text("file", "materials/models/city/building_01.vmt (Demo)");
    demoTimer = setInterval(function () {
      if (live) return;
      needed = needed > 0 ? needed - 1 : 172; progress();
      if (needed > 0) text("file", "materials/models/city/building_01.vmt (Demo)");
    }, 1400);
  }
}());
