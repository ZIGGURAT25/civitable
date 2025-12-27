/**
 * CiviTable Service Worker
 * Managed by Workbox
 */

// Import the Workbox library.
importScripts('workbox-915e8d08.js');

// --- VERSIONING ---
// Updated to force the new CSS changes to load
const APP_VERSION = 'v1.2.0-offline-css';
const RUNTIME_CACHE = `civi-runtime-${APP_VERSION}`;
const CORE_CACHE = `civi-core-${APP_VERSION}`;

// --- CORE ASSETS ---
// Files to cache immediately so the app works offline.
const CORE_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './data.js',
  './sw.js',
  './workbox-915e8d08.js',
  './images/icon-192x192.png',
  './images/icon-512x512.png',
  './dist/styles.css' // <--- Now serving local styles!
];

// --- Core Workbox Settings ---
workbox.core.skipWaiting();
workbox.core.clientsClaim();

// Handle Skip Waiting message
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// --- 1. Pre-caching Core Assets ---
self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CORE_CACHE);
      try {
        await cache.addAll(CORE_ASSETS);
      } catch (e) {
        console.warn('[SW] Core asset caching issue:', e);
      }
    })()
  );
});

// --- 2. Cleanup Old Caches ---
self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames.map((cn) => {
          // Delete old caches that don't match the current version
          if (!cn.includes(APP_VERSION) && (cn.startsWith('civi-core-') || cn.startsWith('civi-runtime-'))) {
            return caches.delete(cn);
          }
        })
      );
    })()
  );
});

// --- 3. Dynamic Caching Strategies ---

// A. Local Data (Fast updates)
workbox.routing.registerRoute(
  ({url}) => url.pathname.endsWith('/data.js'),
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'civi-data-cache',
  })
);

// B. Google Fonts (Keep these for now until you localize them)
workbox.routing.registerRoute(
  ({url}) => url.origin === 'https://fonts.googleapis.com',
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'google-fonts-stylesheets',
  })
);

workbox.routing.registerRoute(
  ({url}) => url.origin === 'https://fonts.gstatic.com',
  new workbox.strategies.CacheFirst({
    cacheName: 'google-fonts-webfonts',
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxAgeSeconds: 365 * 24 * 60 * 60, // Cache for 1 Year
      }),
    ],
  })
);

// C. Generic same-origin GET requests (Images, other assets)
workbox.routing.registerRoute(
  ({request, url}) => request.method === 'GET' && url.origin === self.location.origin,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: RUNTIME_CACHE,
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 200,
        purgeOnQuotaError: true,
      }),
    ],
  })
);

// --- 4. Offline Fallback ---
// If a navigation fails (e.g., offline), return index.html
const handler = async (options) => {
  try {
    return await fetch(options.request);
  } catch (error) {
    const cache = await caches.open(CORE_CACHE);
    const cachedResp = await cache.match('index.html') || await cache.match('./index.html');
    return cachedResp || new Response('Offline - App Shell Missing', { status: 503 });
  }
};

workbox.routing.registerRoute(
  ({request}) => request.mode === 'navigate',
  handler
);