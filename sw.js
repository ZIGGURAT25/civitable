importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.5.4/workbox-sw.js');

if (workbox) {
  console.log(`Workbox is loaded`);

  // Suppress all Workbox logs in production
  workbox.setConfig({ debug: false });

  // 1. Precache the app shell (HTML, CSS, main JS, manifest)
  workbox.precaching.precacheAndRoute(self.__WB_MANIFEST || [
    { url: 'index.html', revision: null },
    { url: 'manifest.json', revision: null },
    { url: 'images/icon-192x192.png', revision: null },
    { url: 'images/icon-512x512.png', revision: null },
    { url: 'images/org.png', revision: null },
  ]);

  // 2. Cache static assets (images, fonts) with a CacheFirst strategy
  workbox.routing.registerRoute(
    ({ request }) => ['image', 'font'].includes(request.destination),
    new workbox.strategies.CacheFirst({
      cacheName: 'static-assets-v2',
      plugins: [
        new workbox.expiration.ExpirationPlugin({
          maxEntries: 100,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
        }),
        new workbox.cacheableResponse.CacheableResponsePlugin({
          statuses: [0, 200],
        }),
      ],
    })
  );

  // 3. Cache Google Fonts using StaleWhileRevalidate
  workbox.routing.registerRoute(
    ({url}) => url.origin === 'https://fonts.googleapis.com' || url.origin === 'https://fonts.gstatic.com',
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: 'google-fonts-v1',
    })
  );

  // 4. Cache the timetable data from Google Apps Script
  const DATA_URL = 'https://script.google.com/macros/s/AKfycbzB-Q2T4Tg8yAjatGip2nO0ktkACiM6LXDCPwBo3Gf57PZH907_FmTcupuAsVMKRp2o/exec';

  workbox.routing.registerRoute(
    ({url}) => url.href === DATA_URL,
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: 'timetable-data-v2',
      plugins: [
        // This plugin will automatically broadcast a message when the cache is updated
        new workbox.broadcastUpdate.BroadcastUpdatePlugin({
            channelName: 'timetable-updates',
        }),
        new workbox.cacheableResponse.CacheableResponsePlugin({
          statuses: [0, 200],
        }),
      ],
    })
  );

  // 5. Ensure the new service worker activates immediately
  self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
      self.skipWaiting();
    }
  });

  // 6. Clean up old caches
  self.addEventListener('activate', (event) => {
    const cacheWhitelist = ['static-assets-v2', 'google-fonts-v1', 'timetable-data-v2'];
    event.waitUntil(
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheWhitelist.indexOf(cacheName) === -1) {
              return caches.delete(cacheName);
            }
          })
        );
      })
    );
  });

  // Fallback to index.html for navigation requests when offline
  self.addEventListener('fetch', (event) => {
    if (event.request.mode === 'navigate') {
      event.respondWith(
        fetch(event.request).catch(() => caches.match('index.html'))
      );
    }
  });

} else {
  console.log(`Workbox didn't load`);
}
