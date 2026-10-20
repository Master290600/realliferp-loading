(function () {
  "use strict";
  var scenes = (window.LOADING_CONFIG || {}).backgrounds || [];
  if (!scenes.length) return;
  var layers = [document.getElementById("scene-a"), document.getElementById("scene-b")];
  var active = 0, current = 0, pending = false, paused = false;
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)");
  var button = document.getElementById("scene-toggle");
  function labels(index) {
    var scene = scenes[index];
    document.getElementById("scene-label").textContent = scene.label || "REALLIFERP";
    document.getElementById("scene-credit").textContent = scene.credit || "";
    document.getElementById("scene-index").textContent = ("0" + (index + 1)).slice(-2) + " / " + ("0" + scenes.length).slice(-2);
  }
  function apply(layer, scene, done) {
    var background = layer.querySelector(".scene-background"), character = layer.querySelector(".scene-character");
    var backgroundReady = false, characterReady = !scene.character, finished = false;
    function ready() { if (!finished && backgroundReady && characterReady) { finished = true; done(); } }
    background.onload = function () { backgroundReady = true; ready(); };
    background.onerror = function () { pending = false; };
    character.hidden = !scene.character;
    if (scene.character) {
      character.onload = function () { characterReady = true; ready(); };
      character.onerror = function () { character.hidden = true; characterReady = true; ready(); };
      character.src = scene.character;
    } else character.removeAttribute("src");
    background.src = scene.src;
  }
  labels(0);
  button.disabled = scenes.length < 2;
  button.addEventListener("click", function () {
    paused = !paused;
    document.documentElement.classList.toggle("animation-paused", paused);
    button.textContent = paused ? "Animation fortsetzen" : "Animation pausieren";
    button.setAttribute("aria-pressed", String(paused));
  });
  setInterval(function () {
    if (pending || paused || document.hidden || (reduce && reduce.matches) || scenes.length < 2) return;
    var next = (current + 1) % scenes.length, target = layers[1 - active];
    pending = true;
    apply(target, scenes[next], function () {
      pending = false;
      if (paused || (reduce && reduce.matches)) return;
      target.className = "scene active"; layers[active].className = "scene";
      active = 1 - active; current = next; labels(current);
    });
  }, 16000);
}());
