// Vercel serverless function: turns a feedback.html submission into a GitHub issue.
// POST { title, body, labels } → GitHub's create-issue response (status passed through).
// This endpoint is public, so only known labels are forwarded and empty submissions are rejected.

const REPO_ISSUES_URL = "https://api.github.com/repos/BennoCrafter/Timetable/issues";
const ALLOWED_LABELS = new Set(["bug", "enhancement", "other", "external-feedback-issue", "lang-en", "lang-de"]);

const isNonEmptyString = (value) => typeof value === "string" && value.trim() !== "";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { title, body, labels } = req.body || {};
  if (!isNonEmptyString(title) || !isNonEmptyString(body)) {
    return res.status(400).json({ error: "title and body are required" });
  }

  const response = await fetch(REPO_ISSUES_URL, {
    method: "POST",
    headers: {
      Accept: "application/vnd.github.v3+json",
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      "Content-Type": "application/json",
      "User-Agent": "TimetableBot",
    },
    body: JSON.stringify({
      title,
      body,
      labels: Array.isArray(labels) ? labels.filter((label) => ALLOWED_LABELS.has(label)) : [],
    }),
  });

  const data = await response.json();
  return res.status(response.status).json(data);
}
