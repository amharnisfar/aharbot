const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const qrcodeTerminal = require('qrcode-terminal');
const qrcode = require('qrcode');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const express = require('express');

// Configuration
const PYTHON_BOT_URL = 'http://localhost:8080/whatsapp';
const CHROME_PATH = '/usr/bin/google-chrome-stable';
const PORT = 3000;

// --- State tracking ---
let isReady = false;
let fatalExitScheduled = false;

// --- Fatal exit handler ---
// When Puppeteer's frame detaches, we MUST exit so the supervisor can restart us cleanly.
const triggerFatalExit = (reason) => {
    if (fatalExitScheduled) return;
    fatalExitScheduled = true;
    console.error(`[WA FATAL] ${reason}. Exiting in 1s for supervisor restart...`);
    setTimeout(() => process.exit(1), 1000);
};

// --- Catch unhandled rejections so the process doesn't silently die ---
process.on('unhandledRejection', (reason) => {
    const msg = String(reason && reason.message ? reason.message : reason);
    console.error('[WA] Unhandled rejection:', msg);
    if (msg.includes('detached Frame') || msg.includes('Protocol error') || msg.includes('Session closed') || msg.includes('Target closed') || msg.includes('Connection closed')) {
        triggerFatalExit('Unhandled rejection: ' + msg);
    }
});

// --- Client ---
const client = new Client({
    authStrategy: new LocalAuth({
        dataPath: './whatsapp_session'
    }),
    puppeteer: {
        executablePath: CHROME_PATH,
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--no-first-run',
            '--no-zygote',
            '--disable-gpu',
            '--disable-software-rasterizer'
        ]
    }
});

// --- Detect fatal Puppeteer errors ---
const isFatalError = (err) => {
    const msg = err && (err.message || String(err));
    return msg && (
        msg.includes('detached Frame') ||
        msg.includes('Protocol error') ||
        msg.includes('Session closed') ||
        msg.includes('Target closed') ||
        msg.includes('Connection closed') ||
        msg.includes('page has been closed')
    );
};

// --- Events ---
client.on('qr', (qr) => {
    console.log('QR RECEIVED, SCAN IT:');
    qrcodeTerminal.generate(qr, { small: true });
    qrcode.toFile('./qr.png', qr, {
        color: { dark: '#000000', light: '#FFFFFF' }
    }, (err) => {
        if (err) console.error('[WA QR] Error saving QR image:', err);
        else console.log('[WA QR] QR code saved to qr.png - open it to scan!');
    });
});

client.on('ready', () => {
    isReady = true;
    console.log('WhatsApp Client is ready!');
});

client.on('disconnected', (reason) => {
    console.warn('[WA] Client disconnected:', reason);
    triggerFatalExit('Client disconnected: ' + reason);
});

// Listen for Puppeteer page errors
client.on('change_state', (state) => {
    console.log('[WA] State changed:', state);
});

// --- Safe send ---
const safeSend = async (chatId, content, options = {}) => {
    // Check if page is alive before sending
    if (!isReady) throw new Error('Client not ready');
    if (client.pupPage) {
        try {
            const isClosed = client.pupPage.isClosed();
            if (isClosed) {
                triggerFatalExit('pupPage is closed before send');
                throw new Error('detached Frame / page closed');
            }
        } catch (e) {
            if (isFatalError(e)) {
                triggerFatalExit(e.message);
                throw e;
            }
        }
    }
    return client.sendMessage(chatId, content, options);
};

// --- Message handler ---
client.on('message_create', async (msg) => {
    if (msg.fromMe) return; // Skip our own messages to avoid loops and overhead

    const body = (msg.body || '') + (msg.caption ? ' ' + msg.caption : '');
    const isCommand = body.startsWith('!') || body.startsWith('/');
    const isNumber = /^\d+$/.test(body.trim());
    const hasLink = /https?:\/\/[^\s]+/.test(body) || body.includes('www.');

    if (isCommand || hasLink || isNumber) {
        console.log(`[WA] Intercepted: "${body.substring(0, 100)}" from ${msg.from}`);
        try {
            const response = await axios.post(PYTHON_BOT_URL, {
                from: msg.from,
                to: msg.to,
                body: body,
                hasMedia: msg.hasMedia,
                messageId: msg.id._serialized,
                isGroup: msg.from.endsWith('@g.us')
            }, { timeout: 15000 });

            console.log(`[WA] Python Bot Response status: ${response.status}`);
            if (response.data && response.data.reply) {
                await safeSend(msg.from, response.data.reply);
            }
        } catch (error) {
            console.error('[WA] Error in message handler:', error.message);
            if (isFatalError(error)) {
                triggerFatalExit('Fatal error in message handler: ' + error.message);
            }
        }
    }
});

// --- HTTP API for Python bot to send messages ---
const app = express();
app.use(express.json());

// WhatsApp can handle up to ~2GB natively IF we use fromUrl().
// fromFilePath() loads the file as base64 through Puppeteer CDP which crashes Chrome for large files.
// Strategy: always prefer fromUrl() when a public URL is available.

app.post('/send', async (req, res) => {
    const { to, text, filePath, directLink } = req.body;
    console.log(`[WA] /send for ${to}. File: ${filePath ? path.basename(filePath) : 'None'}, URL: ${directLink ? 'yes' : 'no'}`);

    if (!isReady) {
        return res.status(503).json({ success: false, error: 'Client not ready yet' });
    }

    const start = Date.now();

    // Helper to send text-only fallback (never triggers fatal exit)
    const sendTextFallback = async (message) => {
        try {
            await client.sendMessage(to, message);
            console.log(`[WA] Fallback text sent in ${Date.now() - start}ms.`);
        } catch (e) {
            console.error('[WA] Fallback text also failed:', e.message);
            // Only if even plain text fails does it indicate a real fatal state
            if (isFatalError(e)) triggerFatalExit(e.message);
        }
    };

    try {
        if (filePath && fs.existsSync(filePath)) {
            const stats = fs.statSync(filePath);
            const fileSizeMB = stats.size / (1024 * 1024);
            console.log(`[WA] Using fromFilePath() for ${fileSizeMB.toFixed(1)}MB file`);
            try {
                // This might throw ERR_STRING_TOO_LONG for 1GB+ files
                const media = MessageMedia.fromFilePath(filePath);
                let sendOptions = { caption: text || '' };
                
                // WhatsApp imposes a 16MB limit for photos/videos. 
                // Any file larger than this must be sent as a document.
                if (fileSizeMB > 16) sendOptions.sendMediaAsDocument = true;
                
                // This might throw Target closed (CDP Protocol Error) for 50MB+ files
                await safeSend(to, media, sendOptions);
                console.log(`[WA] Media sent via fromFilePath in ${Date.now() - start}ms.`);
            } catch (mediaErr) {
                console.error(`[WA] Failed to send ${fileSizeMB.toFixed(1)}MB media. Fallback to text:`, mediaErr.message);
                await sendTextFallback(`⚠️ Note: File is ${fileSizeMB.toFixed(1)}MB, which exceeds WhatsApp Web's browser transfer limits. Use the link below.\n\n${text || ''}`);
            }
        } else if (text) {
            await safeSend(to, text);
            console.log(`[WA] Text sent in ${Date.now() - start}ms.`);
        }
        res.json({ success: true });
    } catch (error) {
        console.error('[WA] Critical error in /send:', error.message || error);
        if (isFatalError(error)) {
            triggerFatalExit(error.message);
        }
        res.status(500).json({ success: false, error: error.message || String(error) });
    }
});

app.listen(PORT, () => {
    console.log(`WhatsApp Bridge API listening on port ${PORT}`);
});

client.initialize();
