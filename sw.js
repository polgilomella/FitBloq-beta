const CACHE='fitbloq-v1';
const ASSETS=['./','./index.html','./styles.css','./app.js','./enhancements.js','./assets/leaflet/leaflet.css','./assets/leaflet/leaflet.js','./manifest.webmanifest'];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS))));
self.addEventListener('fetch',event=>event.respondWith(caches.match(event.request).then(hit=>hit||fetch(event.request))));
