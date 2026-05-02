const API_KEY = YOUR_API_KEY_HERE

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type !== "ask") return;

  fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": API_KEY,
      "anthropic-version": "2023-06-01",
      "anthropic-dangerous-direct-browser-access": "true"
    },
    body: JSON.stringify({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 60,
      system: "Reply in 1–2 sentences max. Be extremely concise.",
      messages: message.messages
    })
  })
    .then(res => res.json())
    .then(data => {
      if (data.error) return sendResponse({ text: "API: " + data.error.message });
      sendResponse({ text: data.content?.[0]?.text ?? "no content" });
    })
    .catch(e => sendResponse({ text: "fetch: " + e.message }));

  return true; // keeps the message channel open for the async response
});
