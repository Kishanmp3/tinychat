const msg = document.getElementById("msg");
const input = document.getElementById("input");
const send = document.getElementById("send");
const clearBtn = document.getElementById("clear");

let messages = [];

function save() {
  chrome.storage.local.set({ messages });
}

function ask(text) {
  messages.push({ role: "user", content: text });
  save();
  msg.textContent = "...";

  chrome.runtime.sendMessage({ type: "ask", messages }, (response) => {
    const reply = chrome.runtime.lastError
      ? "err: " + chrome.runtime.lastError.message
      : (response?.text ?? "no response");
    messages.push({ role: "assistant", content: reply });
    save();
    msg.textContent = reply;
  });
}

clearBtn.addEventListener("click", () => {
  messages = [];
  save();
  msg.textContent = "";
});

send.addEventListener("click", () => {
  const val = input.value.trim();
  if (!val) return;
  input.value = "";
  ask(val);
});

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") send.click();
});

chrome.storage.local.get(["messages"], (stored) => {
  messages = stored.messages ?? [];
  const last = messages.findLast(m => m.role === "assistant");
  if (last) msg.textContent = last.content;
});
