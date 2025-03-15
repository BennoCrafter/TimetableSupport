export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  const { title, body, labels } = req.body;

  const response = await fetch(
    "https://api.github.com/repos/BennoCrafter/Timetable/issues",
    {
      method: "POST",
      headers: {
        Accept: "application/vnd.github.v3+json",
        Authorization: `token ${GITHUB_TOKEN}`,
        "Content-Type": "application/json",
        "User-Agent": "timetable-feedback",
      },
      body: JSON.stringify({ title, body, labels }),
    },
  );

  const data = await response.json();
  return res.status(response.status).json(data);
}
