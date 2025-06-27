let memory = [];
let status = "Fully Activated";
const chatBox = document.getElementById("chat-box");
const inputBox = document.getElementById("user-input");

function appendMessage(sender, text) {
  const msg = document.createElement("div");
  msg.className = sender;
  msg.innerText = text;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

async function sendMessage() {
  const userText = inputBox.value.trim();
  if (!userText) return;
  appendMessage("user", "🧍 " + userText);
  inputBox.value = "";

  const res = await fetch("/api/gpt", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages: [...memory, { role: "user", content: userText }] })
  });

  const data = await res.json();
  const reply = data.choices?.[0]?.message?.content || "⚠️ Error from AI.";
  appendMessage("bot", "🤖 " + reply);

  memory.push({ role: "user", content: userText });
  memory.push({ role: "assistant", content: reply });
}