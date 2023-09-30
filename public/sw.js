// eslint-disable-next-line no-restricted-globals
self.addEventListener('install', (event) => {
    console.log('Service worker installed');
});

// eslint-disable-next-line no-restricted-globals
self.addEventListener('fetch', (event) => {
    if (event.request.url.includes('https://api.binance.com/api/v3')) {
        event.respondWith(
            caches.open('api-cache').then((cache) => {
                return cache.match(event.request).then((response) => {
                    if (response) {
                        return response; 
                    }

                    return fetch(event.request).then((networkResponse) => {
                        cache.put(event.request, networkResponse.clone());
                        return networkResponse;
                    });
                });
            })
        );
    }
});
