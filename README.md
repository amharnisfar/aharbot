# 🚀 Ahar File Streamer Bot (aharbot)

A premium, state-of-the-art universal social media downloader. This bot provides a seamless experience for downloading media from across the web via **Telegram**, **WhatsApp**, and a dedicated **Web Interface**.

---

## 🌟 Key Features

- **Universal Support:** Powered by `yt-dlp` to handle YouTube, Instagram, Facebook, TikTok, Twitter, and 1000+ other sites.
- **Multi-Platform Access:**
  - **Telegram:** Use commands or just paste a link.
  - **WhatsApp:** Intelligent link detection and interactive format selection.
  - **Web UI:** A beautiful, responsive interface for browser-based downloads.
- **Large File Handling:** 
  - Automatically bypasses platform limits (Telegram 2GB / WhatsApp 16MB).
  - Generates high-speed **3-hour direct web links** for large files.
- **Smart Quality Selection:** Pick exactly what you want—from 144p to 4K video, or high-quality audio only.
- **Automated Stability:** Built-in supervisor for the WhatsApp bridge and auto-cleanup tasks to keep the server healthy.

---

## 🏗️ System Architecture

The project is split into three main components working in harmony:

1.  **Core Bot (`bot/bot.py`):**
    - The "Brain" of the operation.
    - Handles the Telegram API (Pyrogram).
    - Runs an asynchronous Web Server (Aiohttp) to host downloaded files.
    - Manages the `yt-dlp` engine for extraction and downloading.
2.  **WhatsApp Bridge (`bot/whatsapp_bridge.js`):**
    - A Node.js service using `whatsapp-web.js` and Puppeteer (Chrome).
    - Intercepts WhatsApp messages and communicates with the Core Bot via a local API.
    - Handles the QR code login process and automated replies.
3.  **Web Frontend (`web/index.html`):**
    - A modern, "Glassmorphism" styled interface.
    - Allows users to fetch info and download directly via the browser.

---

## 📋 Installation Guide

### 1. System Requirements
- **OS:** Ubuntu 20.04+ / Debian 11+
- **Resources:** At least 2GB RAM (Chrome/Puppeteer requires memory).
- **Disk:** Recommend a dedicated partition for downloads (configured at `/datadrive` by default).

### 2. Install Dependencies
```bash
# Update and install system tools
sudo apt update && sudo apt install -y python3-pip nodejs npm ffmpeg google-chrome-stable

# Install Python libraries
pip install -r requirements.txt

# Install WhatsApp Bridge dependencies
cd bot
npm install
cd ..
```

### 3. Configuration
- **API Credentials:** Open `bot/bot.py` and fill in:
  - `API_ID` & `API_HASH` (from my.telegram.org)
  - `BOT_TOKEN` (from @BotFather)
- **Cookies:** To prevent bot detection on YouTube/Instagram:
  - Export cookies from your browser (Netscape format).
  - Save as `bot/cookies.txt`.

### 4. Running the Services
We recommend using `pm2` or `systemd` to keep these running 24/7.

**Manual start:**
```bash
# Start the Bot & Web Server
python3 bot/bot.py

# Start the WhatsApp Bridge (with auto-restart support)
cd bot
./run_bridge.sh
```

---

## 🔐 Security & Privacy
- **.gitignore:** Configured to never upload your `cookies.txt`, `whatsapp_session`, or downloaded user data to GitHub.
- **Auto-Cleanup:** The system automatically wipes downloaded files every 3 hours to protect user privacy and disk space.

---

## 🛠️ Commands
- `/dl [URL]` - Universal download command.
- `/start` - Get started and see supported sites.
- Just paste any link in WhatsApp or Telegram to trigger the auto-downloader!

---

## 🤝 Support
Created by [Amharnisfar](https://github.com/amharnisfar).
Project Link: [https://github.com/amharnisfar/aharbot](https://github.com/amharnisfar/aharbot)
