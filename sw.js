var CACHE_NAME = 'cqs-app-cache-v237';
var CACHED_URLS = [
    '/',
    '/history/',
    '/profile/',
    '/css/styles.css',
    '/js/main.min.js'
];

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            return cache.addAll(CACHED_URLS);
        })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        fetch(event.request).catch(function() {
            return caches.match(event.request).then(function(response) {
                if (response) {
                    return response;
                } else if (event.request.headers.get('accept').includes('text/html')) {
                    return caches.match('/');
                }
            });
        })
    );
});

self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (CACHE_NAME !== cacheName && cacheName.startsWith('cqs-app-cache')) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
