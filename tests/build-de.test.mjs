// Run: node --test tests/
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { buildGerman } from "../scripts/build-de.mjs";

test("de/index.html is up to date with index.html (run: node scripts/build-de.mjs)", () => {
  const source = fs.readFileSync(new URL("../index.html", import.meta.url), "utf8");
  const generated = fs.readFileSync(new URL("../de/index.html", import.meta.url), "utf8");
  assert.equal(generated, buildGerman(source));
});
