// Offline cache — so the plan opens at a hawker stall with no signal.
const CACHE = 'eating-plan-v20';
const ASSETS = [
  './',
  './index.html',
  './app.html',
  './app.webmanifest',
  './manifest.webmanifest',
  './icon-192.png',
  './icon-512.png',
  './apple-touch-icon.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Network-first so edits show up, cache fallback so it works offline.
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;

  // Never touch cross-origin requests. API calls (api.anthropic.com,
  // api.github.com) must fail honestly rather than be answered from cache —
  // otherwise a restore gets served index.html and JSON.parse chokes on it.
  let url;
  try { url = new URL(e.request.url); } catch (err) { return; }
  if (url.origin !== self.location.origin) return;

  e.respondWith(
    fetch(e.request)
      .then(res => {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, copy));
        return res;
      })
      .catch(() => caches.match(e.request).then(r => r || caches.match('./index.html')))
  );
});
