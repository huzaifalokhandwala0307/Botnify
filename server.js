import { readFileSync, existsSync } from 'fs';

// ✅ Load .env FIRST before anything else
if (existsSync('.env')) {
  readFileSync('.env', 'utf-8')
    .split('\n')
    .filter(line => line.trim() && line.includes('=') && !line.startsWith('#'))
    .forEach(line => {
      const idx = line.indexOf('=');
      const key = line.slice(0, idx).trim();
      const val = line.slice(idx + 1).trim();
      process.env[key] = val;
    });
}

// ✅ Debug — confirm token loaded
const token = process.env.HF_TOKEN || process.env.HF_API_KEY;
console.log('HF Token:', token ? `✅ ${token.slice(0, 10)}...` : '❌ MISSING');

import express from 'express';

// ✅ Dynamic import AFTER env is set
const { default: handler } = await import('./api/detect.js');

const app = express();
app.use(express.json({ limit: '10mb' }));
app.all('/api/detect', (req, res) => handler(req, res));

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`✅ API running on http://localhost:${PORT}`);
});