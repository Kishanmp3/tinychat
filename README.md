# TinyChat

A lightweight Chrome extension that lets you chat with AI directly from your browser toolbar — no tab switching, no setup.

## Installation

Since TinyChat isn't on the Chrome Web Store, you'll need to load it manually:

1. Clone or download this repo
2. Go to `chrome://extensions/` in your browser
3. Enable **Developer mode** (top right toggle)
4. Click **Load unpacked** and select the project folder

## Usage

Click the TinyChat icon in your toolbar to open the chat popup and start chatting.

## Setup

Create a `.env` file or add your API key directly in `background.js`:

```js
const API_KEY = "your-anthropic-api-key-here";
```

## Stack

- Chrome Extension (Manifest V3)
- Vanilla JS
- Anthropic Claude API
