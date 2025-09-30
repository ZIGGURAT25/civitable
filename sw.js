/**
 * CiviTable Service Worker
 * This file is managed by Workbox.
 */

// Import the Workbox library.
importScripts('workbox-915e8d08.js');

// --- VERSIONING ---
// Bump APP_VERSION to force an update when core assets change.
const APP_VERSION = 'v1.0.1-ghpages-2025-09-30';
const RUNTIME_CACHE = `civi-runtime-${APP_VERSION}`;
const CORE_CACHE = `civi-core-${APP_VERSION}`;

// List of core assets required for the app shell to render offline.
// NOTE: Keep paths relative to the SW scope. Adjust if hosted in a subfolder.
// Use relative paths so it works under GitHub Pages repo subdirectory
const CORE_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './data.js',
  './sw.js',
  './workbox-915e8d08.js',
  './images/icon-192x192.png',
  './images/icon-512x512.png',
  './dist/styles.css',
];

// --- Core Workbox Settings ---
// This ensures that the new service worker activates as soon as it's installed.
workbox.core.skipWaiting();
workbox.core.clientsClaim();

// Listener to handle the 'SKIP_WAITING' message from the app.
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// --- Precaching ---
// Workbox will inject the list of files to cache here. This ensures the app shell
// loads instantly and works offline.
// Use Workbox precache injection if available.
workbox.precaching.precacheAndRoute(self.__WB_MANIFEST || []);

// Manual core asset caching fallback (covers case when __WB_MANIFEST is empty because build step not run)
self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CORE_CACHE);
      try {
        await cache.addAll(CORE_ASSETS);
      } catch (e) {
        // Ignore individual failures (e.g., missing /dist/styles.css in dev)
        console.warn('[SW] Core asset caching issue:', e);
      }
    })()
  );
});

// Cleanup old caches when activating new version
self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames.map((cn) => {
          if (!cn.includes(APP_VERSION) && (cn.startsWith('civi-core-') || cn.startsWith('civi-runtime-'))) {
            return caches.delete(cn);
          }
        })
      );
    })()
  );
});

// --- Caching Strategies for Dynamic Content ---

// For the main data file, use StaleWhileRevalidate.
// This serves data from the cache immediately for a fast load,
// then updates it from the network in the background.
workbox.routing.registerRoute(
  ({url}) => url.pathname.endsWith('/data.js'),
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'civi-table-data-cache',
  })
);

// Generic same-origin GET requests (images, css, js not already precached)
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

// --- Caching for Third-Party Assets (Google Fonts) ---
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

// --- Offline Fallback ---
// This ensures that any navigation request that can't be fulfilled
// will fall back to the main index.html page.
// Navigation route (relative path for GitHub Pages)
try {
  workbox.routing.registerNavigationRoute(
    workbox.precaching.createHandlerBoundToURL('index.html')
  );
} catch (e) {
  // Workbox might throw if index.html not precached yet; fetch fallback logic below still covers it.
}

// Catch-all fallback: if a request fails and it's a navigation, return index.html.
self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') {
    event.respondWith(
      (async () => {
        try {
          const preload = await event.preloadResponse;
            if (preload) return preload;
          const networkResp = await fetch(event.request);
          return networkResp;
        } catch (e) {
          // Offline fallback to cached index.html
          const cache = await caches.open(CORE_CACHE);
          const cached = await cache.match('index.html') || await cache.match('./index.html');
          if (cached) return cached;
          // As last resort return a minimal offline response
          return new Response('<!DOCTYPE html><title>Offline</title><h1>Offline</h1><p>The application shell is not cached yet. Please reconnect.</p>', { headers: { 'Content-Type': 'text/html' }});
        }
      })()
    );
  }
});

// Optional: Warm Google Fonts (stylesheet) so first offline load has styles if accessed once
// (Cannot reliably pre-cache cross-origin font files without a prior fetch due to CORS, so we skip explicit addAll.)