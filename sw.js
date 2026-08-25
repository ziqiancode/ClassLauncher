const CACHE_NAME = "class-launcher-pwa-v2";
const APP_SHELL = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icons/icon-192.png",
  "./icons/icon-512.png"
];

self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL)));
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;

  // For page navigations, prefer the network so GitHub Pages updates
  // are visible immediately. Fall back to cached index when offline.
  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put("./index.html", clone));
          return response;
        })
        .catch(() => caches.match("./index.html"))
    );
    return;
  }

  // Static assets can remain cache-first.
  event.respondWith(
    caches.match(event.request).then(cached =>
      cached || fetch(event.request).then(response => {
        const clone = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        return response;
      })
    )
  );
});

self.addEventListener("notificationclick", event => {
  event.notification.close();
  const target = event.notification.data?.url || "./";
  event.waitUntil((async () => {
    const windows = await clients.matchAll({type:"window", includeUncontrolled:true});
    for (const client of windows) {
      try {
        const appUrl = new URL(client.url);
        const targetUrl = new URL(target, self.location.origin);
        if (appUrl.origin === self.location.origin && targetUrl.origin === self.location.origin) {
          await client.focus();
          if (client.navigate) await client.navigate(targetUrl.href);
          return;
        }
      } catch {}
    }
    if (clients.openWindow) {
      await clients.openWindow(target);
    }
  })());
});
