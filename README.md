# Ahar File Streamer Bot (aharbot)

A powerful, universal social media downloader bot supporting Telegram, WhatsApp, and a Web interface. Built with Python (Pyrogram) and Node.js (whatsapp-web.js).

## 🚀 Features

- **Universal Downloading:** Supports YouTube, Instagram, Facebook, TikTok, Twitter, and more (via `yt-dlp`).
- **Multi-Platform:** Interacts through Telegram bot commands, WhatsApp messages, and a clean Web UI.
- **Large File Support:** Automatically generates 3-hour direct web links for files that exceed WhatsApp/Telegram upload limits.
- **Interactive UI:** Dynamic format selection for YouTube videos on all platforms.
- **High Performance:** Multi-threaded downloading and efficient cleanup.

## 🛠️ Tech Stack

- **Backend:** Python 3.10+
- **Telegram:** Pyrogram
- **WhatsApp:** [whatsapp-web.js](https://github.com/pedroslopez/whatsapp-web.js) + Node.js
- **Web Server:** Aiohttp
- **Engine:** [yt-dlp](https://github.com/yt-dlp/yt-dlp)
- **Browser Automation:** Puppeteer (wrapped by whatsapp-web.js)

## 📋 Prerequisites

- **Linux OS** (Ubuntu/Debian recommended)
- **Python 3.10+**
- **Node.js 18+**
- **Google Chrome Stable** (for WhatsApp bridge codecs)
- **ffmpeg** (for media processing)

## ⚙️ Installation

### 1. Clone the Repository
```bash
git clone https://github.com/amharnisfar/aharbot.git
cd aharbot
```

### 2. Install System Dependencies
```bash
sudo apt update
sudo apt install -y python3-pip nodejs npm ffmpeg google-chrome-stable
```

### 3. Install Python Dependencies
```bash
pip install -r requirements.txt
```

### 4. Install Node.js Dependencies
```bash
cd bot
npm install
cd ..
```

### 5. Configuration
- Place your `cookies.txt` in the root or `bot/` directory for YouTube/Instagram bypass.
- Edit `bot/bot.py` to set your `API_ID`, `API_HASH`, and `BOT_TOKEN`.
- (Optional) Configure the `whatsapp_bridge.js` if you need custom Puppeteer settings.

## 🏃 Running the Bot

The bot uses a systemd service for maximum uptime.

```bash
# Start the Telegram bot and Web server
python3 bot/bot.py

# (In a separate terminal) Start the WhatsApp bridge
cd bot
./run_bridge.sh
```

### 🧹 Automatic Cleanup
The bot includes a background task that wakes up every 5 minutes to delete expired web download files (3-hour expiry).

## 🔗 Project Links

- **GitHub Repository:** [https://github.com/amharnisfar/aharbot](https://github.com/amharnisfar/aharbot)
- **Web Interface:** [https://aharbot.qzz.io](https://aharbot.qzz.io)

## ⚖️ License
MIT License. See [LICENSE](LICENSE) for details.
