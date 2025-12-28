/**
 * CiviTable Service Worker
 * Managed by Workbox
 */

// Import the Workbox library.
importScripts('workbox-915e8d08.js');

// --- VERSIONING ---
// Bumped version to force cache clearing of the old logic
const APP_VERSION = 'v1.3.0-data-fix';
const RUNTIME_CACHE = `civi-runtime-${APP_VERSION}`;
const CORE_CACHE = `civi-core-${APP_VERSION}`;

// --- CORE ASSETS ---
// Files to cache immediately so the app shell works offline.
// NOTE: Removed './data.js' from here so it can update dynamically via NetworkFirst below.
const CORE_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './sw.js',
  './workbox-915e8d08.js',
  './images/icon-192x192.png',
  './images/icon-512x512.png',
  './dist/styles.css'
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
// This runs when the new Service Worker activates.
// It deletes ANY cache that doesn't match the current APP_VERSION.
self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames.map((cn) => {
          // Delete caches that don't match the current version string
          if (!cn.includes(APP_VERSION) && (cn.startsWith('civi-core-') || cn.startsWith('civi-runtime-') || cn.includes('civi-data-cache'))) {
            console.log('[SW] Deleting old cache:', cn);
            return caches.delete(cn);
          }
        })
      );
    })()
  );
});

// --- 3. Dynamic Caching Strategies ---

// A. DATA.JS (CRITICAL UPDATE)
// Strategy: NetworkFirst
// 1. Try to fetch from Network.
// 2. If successful, update the cache and serve the new file.
// 3. If offline/fails, serve the cached version.
workbox.routing.registerRoute(
  ({url}) => url.pathname.endsWith('/data.js'),
  new workbox.strategies.NetworkFirst({
    cacheName: `civi-data-cache-${APP_VERSION}`, // Versioned data cache
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 1, // Only keep the latest version
      }),
    ],
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
// If a navigation fails (e.g., offline and page not cached), return index.html
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
