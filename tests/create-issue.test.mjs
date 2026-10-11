// Run: node --test tests/
import { test } from "node:test";
import assert from "node:assert/strict";
import handler from "../api/create-issue.js";

function call(req) {
  const res = {
    statusCode: undefined,
    body: undefined,
    status(code) { this.statusCode = code; return this; },
    json(data) { this.body = data; return this; },
  };
  return handler(req, res).then(() => res);
}

function stubGitHub() {
  const sent = [];
  globalThis.fetch = async (url, init) => {
    sent.push(JSON.parse(init.body));
    return { status: 201, json: async () => ({ number: 1 }) };
  };
  return sent;
}

test("rejects non-POST", async () => {
  assert.equal((await call({ method: "GET" })).statusCode, 405);
});

test("rejects empty title or body without calling GitHub", async () => {
  const sent = stubGitHub();
  assert.equal((await call({ method: "POST", body: { title: " ", body: "x" } })).statusCode, 400);
  assert.equal((await call({ method: "POST", body: { title: "x" } })).statusCode, 400);
  assert.equal((await call({ method: "POST" })).statusCode, 400);
  assert.equal(sent.length, 0);
});

test("forwards the feedback form payload and drops unknown labels", async () => {
  const sent = stubGitHub();
  const res = await call({
    method: "POST",
    body: { title: "T", body: "D", labels: ["bug", "external-feedback-issue", "lang-de", "wontfix"] },
  });
  assert.equal(res.statusCode, 201);
  assert.deepEqual(res.body, { number: 1 });
  assert.deepEqual(sent[0], { title: "T", body: "D", labels: ["bug", "external-feedback-issue", "lang-de"] });
});
