# 🚀 Ahar All-In-One Downloader (AharBot)

A premium, high-performance universal media downloader, streamer, and AI assistant. This bot integrates **Telegram**, **WhatsApp**, and a **Web GUI** into a single, powerful ecosystem for media management and discovery.

---

## 🌟 Official Links
- **Telegram Bot:** [@aharallinonebot](https://t.me/aharallinonebot)
- **Telegram Channel:** [@aharbots](https://t.me/aharbots)
- **Website/Web GUI:** [https://aharbot.qzz.io](https://aharbot.qzz.io)

---

## 🔥 Key Features

### 1. 📂 Universal Downloader
- **Supports 1000+ Sites:** Powered by `yt-dlp` to handle YouTube, Instagram, Facebook, TikTok, X (Twitter), and many more.
- **Multi-Format/Quality:** Choose from 144p to 4K video, or extract high-quality audio (MP3, M4A, etc.).
- **Playlist Support:** Download entire YouTube playlists or series with a single link.
- **Multi-Threaded:** Optimized for speed with parallel fragmented downloading and `ffmpeg` merging.

### 2. 🤖 AI & Visual Intelligence
- **🔍 Google Lens Search:** Reply to any image with `/lens` to find related videos, social media profiles (YouTube, FB, IG, TikTok, X), and visual matches.
- **📝 AI Summarization:** Use the "AI Summarize" button on YouTube videos to get concise, context-aware summaries powered by local Ollama LLMs.
- **💬 AI Chat Assistant:** Interactive AI chat mode that remembers context and assists with queries.

### 3. 📺 YouTube Power Tools
- **🔔 Smart Subscriptions:** `/subscribe` to channels and get notified automatically when new videos are uploaded.
- **🔎 Channel Search:** Find and follow creators directly with `/search_channel`.
- **📅 Daily Recommendations:** All users receive a hand-picked, high-quality music recommendation every 24 hours.

### 4. 🌐 Web & Streaming Architecture
- **⚡ Direct Web Links:** Generate 3-hour temporary links for instant browser streaming or downloading of files >2GB.
- **🖼️ Auto-Thumbnails:** Original YouTube thumbnails are fetched, and frames are auto-extracted for other sources to ensure beautiful previews.
- **🛡️ Session Isolation:** Each request runs in an isolated, temporary directory to prevent file collisions and ensure zero-leak cleanup.

---

## 🛠️ Command Reference

### 👤 User Commands
| Command | Description |
| :--- | :--- |
| **`/start`** | Initialize the bot and see a quick-start guide. |
| **`/help`** | View advanced usage instructions and supported platforms. |
| **`/dl [URL]`** | The core downloader. Accepts links from almost any platform. |
| **`/youtube [URL]`** | Alias for `/dl` (specifically optimized for YouTube). |
| **`/playlist [URL]`** | Fetch and download all videos from a playlist. |
| **`/search [query]`** | Search YouTube and get interactive download buttons. |
| **`/lens`** | (Reply to image) Analyze an image using Google Lens. |
| **`/insta [URL]`** | Specialized handler for Instagram Reels, Stories, and Posts. |
| **`/torrent [link/file]`** | High-speed torrent downloader (supports magnet links and `.torrent` files). |
| **`/sniff [URL]`** | Advanced browser-based sniffing for hidden video streams. |
| **`/subscribe [URL]`** | Subscribe to a YouTube channel for new video alerts. |
| **`/unsubscribe [URL]`** | Stop receiving notifications for a channel. |
| **`/channels`** | List and manage your active YouTube subscriptions. |
| **`/search_channel [q]`** | Find and subscribe to channels directly in Telegram. |
| **`/stats`** | View live server load, active tasks, and disk usage. |
| **`/speedtest`** | Run a comprehensive network performance test. |
| **`/ping`** | Check the bot's response latency. |
| **`/newchat`** | Reset your AI chat session context. |
| **`/cancel`** | Immediately stop any active download or background task. |

### 🔑 Admin & Power-User Commands
| Command | Description |
| :--- | :--- |
| **`/admin`** | Access the secure Admin Panel (User management, system status). |
| **`/broadcast`** | (Reply to message) Send a message to every bot user. |
| **`/whatsapp`** | Manage the WhatsApp bridge (Login, QR code, and session status). |
| **`/logs`** | Retrieve the latest system logs for debugging. |
| **`/restart`** | Perform a safe reboot of the bot process. |
| **`/shell [cmd]`** | (Owner) Execute bash commands directly on the server. |
| **`/exec [py]`** | (Owner) Run Python code within the bot's runtime. |
| **`/url`** | (Reply to file) Generate a temporary direct web link for any file. |
| **`/backup`** | Manually trigger a backup of the system configuration. |
| **`/addapi`** | Update or add API keys dynamically. |
| **`/delall`** | (Owner) Clear all active download sessions. |

---

## ⚙️ Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/amharnisfar/aharbot.git
   cd aharbot
   ```

2. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   # Manual install:
   pip install pyrogram tgcrypto yt-dlp requests pillow opencv-python libtorrent python-dotenv
   ```

3. **Configure Environment:**
   - Copy `bot/.env.example` to `bot/.env`
   - Fill in your `API_ID`, `API_HASH`, and `BOT_TOKEN` from [my.telegram.org](https://my.telegram.org).

4. **Run the Bot:**
   ```bash
   python bot/bot.py
   ```

---

## 🏗️ Technical Stack
- **Backend:** Python 3.10 (Pyrogram)
- **WhatsApp Bridge:** Node.js (whatsapp-web.js)
- **Runtime:** Deno (for YouTube extractor stabilization)
- **Database:** Local JSON (Subscriptions/Feedback)
- **Web UI:** Native Glassmorphism (HTML5/CSS3/JS)
- **Browser Automation:** Playwright / Puppeteer

---

## ✍️ Created By
- **[Amhar Nisfer](https://github.com/amharnisfar)** - Lead Developer & Architect
- **[Izzath Nisfer](https://github.com/izzathnisfer)** - Core Collaborator

---

## 📜 License
Licensed under the MIT License. Built with ❤️ for the community.
