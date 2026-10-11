// EN/DE translation. Elements opt in with data-i18n="key" (text) or data-i18n-placeholder="key";
// images swap source via data-src-en / data-src-de. Strings shared by every page (header, footer)
// live in COMMON below; page-specific strings come from window.TRANSLATIONS defined inline in each page.
// Language priority: ?lang= query param, then saved choice, then browser language.
(function () {
  var STORAGE_KEY = "tm-lang";

  var COMMON = {
    en: {
      navGetApp: "Get on App Store",
      navBackHome: "Back to home",
      navKofi: "Support me on Ko-fi",
      footerTagline: "Perfect for everyday life.",
      footerContact: "Contact Us",
      footerPrivacy: "Privacy Policy",
      footerImprint: "Imprint",
      footerFeedback: "Give Feedback",
      footerCopyright: "© 2027 Timetable Manager. All rights reserved.",
    },
    de: {
      navGetApp: "Laden im App Store",
      navBackHome: "Zurück zur Startseite",
      navKofi: "Unterstütze mich auf Ko-fi",
      footerTagline: "Perfekt für den Alltag.",
      footerContact: "Kontakt",
      footerPrivacy: "Datenschutz",
      footerImprint: "Impressum",
      footerFeedback: "Feedback geben",
      footerCopyright: "© 2027 Timetable Manager. Alle Rechte vorbehalten.",
    },
  };

  function detectLang() {
    var params = new URLSearchParams(window.location.search);
    var fromQuery = params.get("lang");
    if (fromQuery === "en" || fromQuery === "de") return fromQuery;

    try {
      var stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "en" || stored === "de") return stored;
    } catch (e) {}

    return (navigator.language || "").toLowerCase().indexOf("de") === 0 ? "de" : "en";
  }

  function apply(lang) {
    var page = (window.TRANSLATIONS && window.TRANSLATIONS[lang]) || {};
    var dict = Object.assign({}, COMMON[lang] || COMMON.en, page);

    document.documentElement.lang = lang;

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (dict[key] !== undefined) el.textContent = dict[key];
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-placeholder");
      if (dict[key] !== undefined) el.setAttribute("placeholder", dict[key]);
    });

    document.querySelectorAll(".lang-switch [data-lang]").forEach(function (btn) {
      btn.classList.toggle("active", btn.getAttribute("data-lang") === lang);
    });

    document.querySelectorAll("[data-src-" + lang + "]").forEach(function (img) {
      img.src = img.getAttribute("data-src-" + lang);
    });

    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {}
  }

  document.addEventListener("DOMContentLoaded", function () {
    apply(detectLang());

    document.querySelectorAll(".lang-switch [data-lang]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        apply(btn.getAttribute("data-lang"));
      });
    });
  });
})();
