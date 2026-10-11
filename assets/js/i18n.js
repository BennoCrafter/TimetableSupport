// EN/DE translation. Elements opt in with data-i18n="key" (text), data-i18n-<attribute>="key" (placeholder, alt, content);
// images swap source via data-src-en / data-src-de. Strings shared by every page (header, footer)
// live in COMMON below; page-specific strings come from window.TRANSLATIONS defined inline in each page.
// Language priority: ?lang= query param, then saved choice, then browser language.
//
// Pages that exist once per language (the homepage: / and /de/, see scripts/build-de.mjs) are
// written in their language directly, so search engines can index both. They name their
// counterpart's URL, e.g. <html lang="en" data-url-de="/de/">; on those pages the EN/DE buttons
// navigate instead of translating in place. Load this in <head> so the redirect below happens
// before first paint.
(function () {
  var STORAGE_KEY = "tm-lang";
  var root = document.documentElement;

  function counterpartUrl(lang) {
    return root.getAttribute("data-url-" + lang);
  }
  var fixedLang = counterpartUrl("en") || counterpartUrl("de") ? root.lang : null;

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

    ["placeholder", "alt", "content"].forEach(function (attr) {
      document.querySelectorAll("[data-i18n-" + attr + "]").forEach(function (el) {
        var key = el.getAttribute("data-i18n-" + attr);
        if (dict[key] !== undefined) el.setAttribute(attr, dict[key]);
      });
    });

    document.querySelectorAll(".lang-switch [data-lang]").forEach(function (btn) {
      btn.classList.toggle("active", btn.getAttribute("data-lang") === lang);
    });

    document.querySelectorAll("[data-src-" + lang + "]").forEach(function (img) {
      img.src = img.getAttribute("data-src-" + lang);
    });

    save(lang);
  }

  function save(lang) {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {}
  }

  // German visitors landing on the English homepage go to /de/. Never redirect the other way:
  // crawlers browse in English and would never get to see /de/.
  if (fixedLang === "en" && counterpartUrl("de") && detectLang() === "de") {
    location.replace(counterpartUrl("de") + location.hash);
    return;
  }

  document.addEventListener("DOMContentLoaded", function () {
    apply(fixedLang || detectLang());

    document.querySelectorAll(".lang-switch [data-lang]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var lang = btn.getAttribute("data-lang");
        if (counterpartUrl(lang)) {
          save(lang);
          location.href = counterpartUrl(lang);
        } else {
          apply(lang);
        }
      });
    });
  });
})();
