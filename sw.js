const cacheName = 'debt-cache-v3';
const assets = [
  '/',
  '/index.html',
  '/unpaid.html',
  '/paid.html',
  '/reminder.html',
  '/style.css',
  '/app.js',
  '/unpaid.js',
  '/paid.js',
  '/reminder.js',
  '/manifest.json'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(cacheName).then(cache => cache.addAll(assets)));
});

self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(res => res || fetch(e.request)));
});
