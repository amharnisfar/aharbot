# 🚀 Ahar All in One downloader (aharbot)

A premium, high-performance universal media downloader and streamer. This bot integrates **Telegram**, **WhatsApp**, and a **Web GUI** into a single powerful ecosystem.

---

## 🌟 Official Links
- **Telegram Bot:** [@aharallinonebot](https://t.me/aharallinonebot)
- **Telegram Channel:** [@aharbots](https://t.me/aharbots)
- **Website:** [https://aharbot.qzz.io](https://aharbot.qzz.io)
- **WhatsApp Automation:** [+94777616398](https://wa.me/94777616398)

---

## 🛠️ Command Reference (The "What & How")

### 👤 User Commands
- **`/dl [URL]`** (or `/youtube`, `/download`): The heart of the bot. Paste any link to start the interactive "Fetch" process.
- **`/start`**: Initializes the bot and provides a quick-start guide.
- **`/help`**: Displays advanced usage instructions and supported platforms.
- **`/search [query]`**: Searches YouTube for videos and returns interactive download buttons.
- **`/playlist [URL]`**: Fetches an entire series of videos. (Note: Large playlists may trigger the 3-hour Web Link fallback).
- **`/sniff [URL]`**: Advanced mode. Uses a headless Playwright browser to "sniff" hidden video streams from complex sites.
- **`/torrent [link/file]`**: High-speed torrent downloader utilizing `libtorrent`.
- **`/insta [URL]`**: Optimized handler for Instagram Reels, Stories, and Posts.
- **`/ping`**: Checks bot latency.
- **`/stats`**: View server load, active downloads, and disk usage.
- **`/speedtest`**: Comprehensive network speed check.
- **`/cancel`**: Immediately halts any active download task.

### 🔑 Admin & Power-User Commands
- **`/admin`**: Opens the secure administrative panel (Status, User management, Logs).
- **`/broadcast`**: (Reply to message) Sends a message to every single user in the database.
- **`/whatsapp`**: Manages the Node.js bridge. Use this to view the QR code and login.
- **`/logs`**: Instantly retrieves the last 50 lines of system logs.
- **`/restart`**: Safely reboots the entire bot process.
- **`/shell [cmd]`**: (Owner ONLY) Executes bash commands directly on the server.
- **`/exec [py]`**: (Owner ONLY) Runs raw Python code within the bot's runtime context.
- **`/url`**: (Reply to a file) Manually generates a 3-hour direct web link for any file stored in the bot.

---

## 🔍 The "Full-Fledge Fetch" Explanation (Deep Dive)

When you paste a link, the bot doesn't just "download" it. It performs a sophisticated **Fetch & Extract** sequence:

1.  **Metadata Extraction:** The bot invokes `yt-dlp` using **Deno** as the JavaScript runtime (to solve anti-bot challenges). It extracts the Title, Thumbnail, Description, and every available Format (144p, 1080p, 4K, MP3, etc.).
2.  **Interactive Selection:** It presents the user with a clean menu. You aren't forced into one quality; you choose exactly what fits your data plan.
3.  **Fragmented Downloading:** Once a format is chosen, the bot downloads video and audio fragments in parallel using multi-threaded buffers for maximum speed.
4.  **Merging & Processing:** It uses `ffmpeg` to merge high-quality video (dash) with high-quality audio into a standard `.mp4` or `.mkv`.
5.  **Smart Routing:**
    - If the file is **Under 2GB**, it sends it directly through Telegram.
    - If it's for **WhatsApp**, it generates a **3-hour direct web link** immediately to avoid browser crashes.
    - If it's **Over 2GB**, it hosts it on the internal web server.

---

## 🌐 Dynamic DNS (dpdns.org) & Cloudflared Setup

Follow this guide to get a professional free domain and expose your bot to the global web without a static IP.

### Step 1: Get your Free Domain
1.  Go to [DigitalPlat Domain](https://domain.digitalplat.org).
2.  Register for a free account (GitHub Login supported).
3.  Pick a domain name (e.g., `aharbot.dpdns.org`).
4.  Keep the dashboard open for the next step.

### Step 2: Establish the Cloudflare Tunnel
1.  Login to [Cloudflare Zero Trust](https://one.dash.cloudflare.com).
2.  Go to **Networks** -> **Tunnels**.
3.  Click **Create a Tunnel** and name it `ahar-tunnel`.
4.  Copy the **Connector Command** for Linux and run it on your server:
    ```bash
    curl -L --output cloudflared.deb https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb
    sudo dpkg -i cloudflared.deb
    sudo cloudflared service install YOUR_TOKEN_HERE
    ```
5.  Go to the **Public Hostname** tab in Cloudflare.
6.  Add a hostname:
    - **Subdomain:** `aharbot`
    - **Domain:** (Select your `dpdns.org` domain which you pointed to Cloudflare NS)
    - **Service:** `http://localhost:8080` (The internal port our bot uses).

### Step 3: Why use this?
- **No Port Forwarding:** Your router stays safe.
- **Static URL:** Your bot link (e.g., `https://aharbot.dpdns.org/dl/xyz`) never changes, even if your Home/VPS IP changes.
- **SSL Security:** Automatic HTTPS encryption provided by Cloudflare.

---

## 🏗️ Technical Component Map

| Component | Technology | Purpose |
| :--- | :--- | :--- |
| **Backend** | Python 3.10 | Core logic, user database, and Telegram API. |
| **Bridge** | Node.js | Powered by `whatsapp-web.js` to handle WA sessions. |
| **Browser** | Puppeteer | Headless Chrome used to render/send WhatsApp media. |
| **Runtime** | Deno | Executes extractor JS to bypass YouTube bot detection. |
| **Web UI** | HTML5/CSS3 | Premium Glassmorphism interface for direct browser downloads. |

---

## ✍️ Created By
- **[Amhar Nisfer](https://github.com/izzathnisfer)** - Lead Developer & Architect

---

## 📜 License
Licensed under the MIT License. Built with ❤️ for the community.
