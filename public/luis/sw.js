/* Offline support for /luis/. Bump VERSION to force a clean cache. */
const VERSION = 'luis-v1';
const SHELL = [
  '/luis/',
  '/luis/manifest.webmanifest',
  '/luis/icon-192.png',
  '/luis/icon-512.png',
  '/luis/apple-touch-icon.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(VERSION).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// The page sends the JS/CSS it already loaded so the first install works offline.
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'CACHE_URLS' && Array.isArray(event.data.urls)) {
    const urls = event.data.urls.filter((u) => new URL(u).origin === self.location.origin);
    event.waitUntil(
      caches.open(VERSION).then((c) =>
        Promise.all(urls.map((u) => c.match(u).then((hit) => hit || c.add(u).catch(() => {}))))
      )
    );
  }
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  // Pages: try the network for the latest version, fall back to cache offline.
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(VERSION).then((c) => c.put('/luis/', copy));
          return res;
        })
        .catch(() => caches.match('/luis/'))
    );
    return;
  }

  // Hashed build assets never change: cache first.
  if (url.pathname.startsWith('/_next/static/')) {
    event.respondWith(
      caches.match(req).then(
        (hit) =>
          hit ||
          fetch(req).then((res) => {
            if (res.ok) {
              const copy = res.clone();
              caches.open(VERSION).then((c) => c.put(req, copy));
            }
            return res;
          })
      )
    );
    return;
  }

  // Everything else: serve cached copy right away, refresh in the background.
  event.respondWith(
    caches.match(req).then((hit) => {
      const network = fetch(req)
        .then((res) => {
          if (res.ok) {
            const copy = res.clone();
            caches.open(VERSION).then((c) => c.put(req, copy));
          }
          return res;
        })
        .catch(() => hit);
      return hit || network;
    })
  );
});
