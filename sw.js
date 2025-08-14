/**
 * CiviTable Service Worker
 * This file is managed by Workbox.
 */

// Import the Workbox library.
importScripts('workbox-915e8d08.js');

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
workbox.precaching.precacheAndRoute(self.__WB_MANIFEST || []);

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
workbox.routing.registerNavigationRoute(
  workbox.precaching.createHandlerBoundToURL('/index.html')
);