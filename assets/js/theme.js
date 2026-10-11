// Light/dark theme. Load in <head> without defer/async: the stored theme must be
// applied before first paint, otherwise dark-mode users see a white flash.
// No stored choice = follow the OS (prefers-color-scheme, handled in styles.css).
(function () {
  var STORAGE_KEY = "tm-theme";
  var root = document.documentElement;

  try {
    var stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "dark" || stored === "light") root.setAttribute("data-theme", stored);
  } catch (e) {}

  function effectiveTheme() {
    var attr = root.getAttribute("data-theme");
    if (attr === "light" || attr === "dark") return attr;
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  function setTheme(theme) {
    root.setAttribute("data-theme", theme);
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (e) {}
  }

  document.addEventListener("DOMContentLoaded", function () {
    var toggle = document.querySelector(".theme-toggle");
    if (!toggle) return;
    toggle.addEventListener("click", function () {
      setTheme(effectiveTheme() === "dark" ? "light" : "dark");
    });
  });
})();
