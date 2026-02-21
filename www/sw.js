// AcadeMind Service Worker - Offline Support
const CACHE_NAME = 'academind-v2';
const CHART_CDN = 'https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js';
const AI_ONLINE_URLS = ['https://text.pollinations.ai'];

// Assets to cache immediately on install
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icons/icon-512.png',
  '/icons/icon-192.png',
];

// ── Install: pre-cache app shell ──────────────────────────
self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return Promise.allSettled(
        PRECACHE_ASSETS.map(url =>
          cache.add(url).catch(() => console.warn('Could not pre-cache:', url))
        )
      );
    })
  );
});

// ── Activate: clean old caches ────────────────────────────
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// ── Fetch: smart caching strategy ─────────────────────────
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // AI API calls: network-only (fallback to offline message handled in app)
  if (AI_ONLINE_URLS.some(u => request.url.startsWith(u))) {
    event.respondWith(fetch(request));
    return;
  }

  // Google Fonts: network-first with cache fallback
  if (url.hostname.includes('fonts.googleapis.com') || url.hostname.includes('fonts.gstatic.com')) {
    event.respondWith(
      fetch(request)
        .then(resp => {
          const clone = resp.clone();
          caches.open(CACHE_NAME).then(c => c.put(request, clone));
          return resp;
        })
        .catch(() => caches.match(request))
    );
    return;
  }

  // Chart.js CDN: cache-first (rarely changes)
  if (request.url.includes('chart.js') || request.url.includes('cdn.jsdelivr.net')) {
    event.respondWith(
      caches.match(request).then(cached => {
        if (cached) return cached;
        return fetch(request).then(resp => {
          caches.open(CACHE_NAME).then(c => c.put(request, resp.clone()));
          return resp;
        });
      })
    );
    return;
  }

  // App shell: cache-first with network update
  event.respondWith(
    caches.match(request).then(cached => {
      const networkFetch = fetch(request).then(resp => {
        if (resp.ok) {
          caches.open(CACHE_NAME).then(c => c.put(request, resp.clone()));
        }
        return resp;
      }).catch(() => null);

      return cached || networkFetch || new Response('Offline', { status: 503 });
    })
  );
});
