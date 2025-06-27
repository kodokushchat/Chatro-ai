export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST requests allowed' });
  }

  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'No prompt provided' });
  }

  try {
    const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-4o', // or gpt-4-turbo, adjust as needed
        messages: [
          {
            role: 'system',
            content: 'You are LUX-00 Genesis, an all-powerful AI assistant.'
          },
          {
            role: 'user',
            content: prompt
          }
        ]
      })
    });

    if (!openaiRes.ok) {
      const error = await openaiRes.text();
      return res.status(openaiRes.status).json({ error });
    }

    const data = await openaiRes.json();
    const answer = data.choices[0].message.content;

    res.status(200).json({ answer });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong.' });
  }
}
