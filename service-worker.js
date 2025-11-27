const CACHE_NAME = 'aomori-trip-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  // 如果你有圖片或 CSS，也要列在這裡，例如：
  // './style.css',
  // './icon.png'
];

// 安裝 Service Worker 並快取檔案
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(ASSETS_TO_CACHE);
      })
  );
});

// 攔截網路請求，如果快取有就用快取的，沒有就上網抓
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});
