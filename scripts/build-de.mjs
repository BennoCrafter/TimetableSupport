// Generates de/index.html from index.html + translations/home.de.json, so Google can index a real
// German homepage. Run after editing either:  node scripts/build-de.mjs   (tests/ fail if you forget)
//
// English is the markup of index.html; German comes from translations/home.de.json. This bakes in
// what i18n.js would do at runtime for German, using the same attributes: data-i18n (text),
// data-i18n-<attr> (attributes), data-src-de (images). Shared header/footer keys (navGetApp, …)
// live in COMMON in i18n.js; those stay as they are and are translated at runtime.
import fs from "node:fs";
import { fileURLToPath } from "node:url";

const SITE = "https://www.timetablemanager.app";
const SOURCE = fileURLToPath(new URL("../index.html", import.meta.url));
const TARGET = fileURLToPath(new URL("../de/index.html", import.meta.url));
const I18N_JS = fileURLToPath(new URL("../assets/js/i18n.js", import.meta.url));
const GERMAN = fileURLToPath(new URL("../translations/home.de.json", import.meta.url));

const escapeText = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const escapeAttr = (s) => escapeText(s).replace(/"/g, "&quot;");

function checkComplete(html, de, i18nJs) {
  const commonKeys = new Set([...i18nJs.matchAll(/^ {6}(\w+): "/gm)].map((m) => m[1]));
  const usedKeys = [...html.matchAll(/data-i18n(?:-\w+)?="(\w+)"/g)].map((m) => m[1]);
  const untranslated = [...new Set(usedKeys)].filter((key) => !(key in de) && !commonKeys.has(key));
  if (untranslated.length) throw new Error(`translations/home.de.json is missing: ${untranslated.join(", ")}`);
}

export function buildGerman(
  html,
  de = JSON.parse(fs.readFileSync(GERMAN, "utf8")),
  i18nJs = fs.readFileSync(I18N_JS, "utf8"),
) {
  checkComplete(html, de, i18nJs);

  let out = html
    .replace('<html lang="en" data-url-de="de/index.html">', '<html lang="de" data-url-en="../index.html">')
    // de/ is one folder deeper: relative URLs need a ../ (absolute https:, #, mailto: etc. stay as they are)
    .replace(/(\s(?:href|src|data-src-\w+)=")(?![a-z]+:|[#/])/g, "$1../")
    .replace(/(<link rel="canonical" href=")[^"]*/, `$1${SITE}/de/`)
    .replace(/(<meta property="og:url" content=")[^"]*/, `$1${SITE}/de/`)
    .replace(/(<meta property="og:image" content="[^"]*\/)en\//, "$1de/")
    .replace(/\n *<!-- English homepage\.[^>]*-->/, "");

  // Text content: <tag … data-i18n="key" …>text</tag>
  out = out.replace(/(<(\w+)\b[^>]*\sdata-i18n="(\w+)"[^>]*>)([\s\S]*?)(<\/\2>)/g, (m, open, tag, key, text, close) =>
    key in de ? open + escapeText(de[key]) + close : m,
  );

  // Attributes and localized images, tag by tag.
  out = out.replace(/<[a-z][^>]*>/g, (tag) => {
    for (const [, attr, key] of tag.matchAll(/data-i18n-(\w+)="(\w+)"/g)) {
      if (key in de) tag = tag.replace(new RegExp(`(\\s${attr}=")[^"]*`), `$1${escapeAttr(de[key])}`);
    }
    const src = tag.match(/data-src-de="([^"]*)"/);
    if (src) tag = tag.replace(/(\ssrc=")[^"]*/, `$1${src[1]}`);
    return tag;
  });

  return out.replace("<!doctype html>\n", "<!doctype html>\n<!-- Generated from index.html by scripts/build-de.mjs. Do not edit. -->\n");
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  fs.mkdirSync(new URL("../de/", import.meta.url), { recursive: true });
  fs.writeFileSync(TARGET, buildGerman(fs.readFileSync(SOURCE, "utf8")));
  console.log("wrote de/index.html");
}
