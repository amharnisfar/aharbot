# 🚀 Ahar File Streamer Bot (aharbot)

A premium, state-of-the-art universal social media downloader. This bot provides a seamless experience for downloading media from across the web via **Telegram**, **WhatsApp**, and a dedicated **Web Interface**.

---

## 🌟 Key Features

- **Universal Support:** Powered by `yt-dlp` to handle YouTube, Instagram, Facebook, TikTok, Twitter, and 1000+ other sites.
- **Multi-Platform Access:**
  - **Telegram:** Use commands like `/dl` or just paste a link for auto-detection.
  - **WhatsApp:** Intelligent link detection and interactive format selection (respond with number to choose quality).
  - **Web UI:** A beautiful, responsive interface for browser-based downloads.
- **Large File Handling:** 
  - Automatically bypasses platform limits (Telegram 2GB / WhatsApp 16MB).
  - Generates high-speed **3-hour direct web links** for large files.
- **Smart Quality Selection:** Pick exactly what you want—from 144p to 4K video, or high-quality audio only.
- **Automated Stability:** Built-in supervisor for the WhatsApp bridge and auto-cleanup tasks to keep the server healthy.

---

## 🏗️ System Architecture & Components

The project is split into three main components working in harmony:

1.  **Core Bot (`bot/bot.py`):**
    - **Telegram Handler:** Uses Pyrogram to manage chat interactions.
    - **Web Server:** Runs an Aiohttp server on port 8080 to serve direct download links.
    - **Download Engine:** Orchestrates `yt-dlp` to extract metadata and download media.
    - **Deno Integration:** Uses Deno as a JS runtime to solve complex YouTube/Instagram challenges.
2.  **WhatsApp Bridge (`bot/whatsapp_bridge.js`):**
    - A Node.js service using `whatsapp-web.js`.
    - **Puppeteer Integration:** Uses a real Chrome instance to handle WhatsApp Web's encryption and media protocols.
    - **API Communication:** Forwards messages to the Core Bot and receives reply instructions.
3.  **Web Frontend (`web/index.html`):**
    - A modern, "Glassmorphism" styled interface for direct browser downloads.

---

## 📂 File Explanations

- **`bot/bot.py`**: The main entry point for the Python backend. Contains configuration for tokens and hardware paths.
- **`bot/whatsapp_bridge.js`**: The Node.js application that powers the WhatsApp connectivity.
- **`bot/run_bridge.sh`**: A simple shell script that ensures the WhatsApp bridge stays running even after a crash.
- **`web/index.html`**: The single-page application for the web interface.
- **`requirements.txt`**: List of all Python libraries needed.
- **`package.json`**: List of all Node.js libraries needed for the WhatsApp bridge.

---

## 📋 Installation Guide

### 1. System Requirements
- **OS:** Ubuntu 20.04+ (Recommended).
- **Hard Drive:** Requires a mount point at `/datadrive` for large downloads (this can be changed in `bot.py`).
- **Dependencies:** Python 3.10+, Node.js 18+, FFmpeg, Deno, and Google Chrome Stable.

### 2. Install Tools & Dependencies
```bash
# Update and install system tools
sudo apt update && sudo apt install -y python3-pip nodejs npm ffmpeg google-chrome-stable

# Install Deno (Required for YouTube JS challenges)
curl -fsSL https://deno.land/install.sh | sh

# Install Python libraries
pip install -r requirements.txt

# Install WhatsApp Bridge dependencies
cd bot
npm install
cd ..
```

### 3. Configuration
- **Bot Tokens:** Edit `bot/bot.py` (Lines 43-45) to add your `API_ID`, `API_HASH`, and `BOT_TOKEN`.
- **Cookies:** To avoid getting blocked by YouTube or Instagram:
  - Export your browser cookies in Netscape format.
  - Save as `bot/cookies.txt` or `bot/instagram_cookies.txt`.
- **Deno Path:** If Deno is installed in a non-standard location, update `DENO_BIN_DIR` in `bot.py`.

### 4. Starting the Bot
For production, we recommend using a systemd service. For manual start:

1. **Start the Core Engine:**
   ```bash
   python3 bot/bot.py
   ```
2. **Start the WhatsApp Bridge:**
   ```bash
   cd bot
   chmod +x run_bridge.sh
   ./run_bridge.sh
   ```

---

## 🧹 Automatic Maintenance
The bot includes a background loop that:
- Runs every **5 minutes**.
- Deletes expired web download files (Links are valid for **3 hours**).
- Cleans up memory and temporary download fragments.

---

## 🔗 Project Links
- **Lead Developer:** [Amharnisfar](https://github.com/amharnisfar)
- **GitHub:** [https://github.com/amharnisfar/aharbot](https://github.com/amharnisfar/aharbot)
