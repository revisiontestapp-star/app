const CACHE_NAME = 'revision-test-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/ref.png',
  '/manifest.json',
  // The Exam Files
  '/NEET.html',
  '/JEE.html',
  '/UPSC.html',
  '/SSC_CGL.html',
  '/SSC_CHSL.html',
  '/BANKING.html',
  '/RRB_NTPC.html',
  '/IELTS.html',
  '/NCLEXRN.html',
  '/HAAD.html'
];

// 1. Install Service Worker and Cache Files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Caching app assets...');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// 2. Fetch Files (Serve from Cache if Offline)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    }).catch(() => {
      // Optional: Return a fallback page if both cache and network fail
      return caches.match('/index.html');
    })
  );
});

// 3. Activate and cleanup old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME) {
          return caches.delete(key);
        }
      }));
    })
  );
});
