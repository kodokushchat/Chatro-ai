export default async function handler(req, res) {
  const key = process.env.OPENROUTER_API_KEY;
  const { messages } = req.body;

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${key}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "openai/gpt-4o",
      messages
    })
  });

  const data = await response.json();
  res.status(200).json(data);
}