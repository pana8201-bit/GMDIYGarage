/* Offline support for DIY Garage (GM edition).
   Network-first: always try the latest files (so data updates pushed to GitHub
   show up), fall back to cache when offline. Bump CACHE on each release.
   Only caches with the "gmdiy-" prefix are ever deleted, so other apps hosted on
   the same github.io origin (e.g. the Ford DIY Garage) are left alone. */
const PREFIX = "gmdiy-";
const CACHE = PREFIX + "2026.11a";
const ASSETS = ["./", "index.html", "styles.css", "data-core.js", "data-lt.js", "data-hd.js", "data-suv.js",
  "data-mid.js", "data-ev.js", "data-finalize.js", "app.js", "icon.svg", "manifest.webmanifest"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys()
    .then((ks) => Promise.all(ks.filter((k) => k.startsWith(PREFIX) && k !== CACHE).map((k) => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener("fetch", (e) => {
  const req = e.request;
  const url = new URL(req.url);
  if (req.method !== "GET" || url.origin !== self.location.origin) return;
  // only handle requests inside this app's scope
  if (!url.href.startsWith(self.registration.scope)) return;
  e.respondWith(
    fetch(req)
      .then((res) => {
        if (res.ok) { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(req, copy)); }
        return res;
      })
      .catch(() => caches.open(CACHE).then((c) => c.match(req, { ignoreSearch: true }))
        .then((r) => r || caches.open(CACHE).then((c) => c.match("index.html"))))
  );
});
self.addEventListener("notificationclick", (e) => {
  e.notification.close();
  e.waitUntil(self.clients.matchAll({ type: "window" })
    .then((cs) => (cs[0] ? cs[0].focus() : self.clients.openWindow("./"))));
});
