const CACHE_NAME = "app-cache-v3"; // <-- Increment version when deploying new changes

const FILES_TO_CACHE = [
  "./index.html",
  "./starting.css",
  "./manifest.json",
  "./apple-touch-icon.png",
  "./favicon-16x16.png",
  "./favicon-32x32.png",
  "./icon-192.png",
  "./icon-512.png",
  "./signinStudent.html",
  "./signinStudent.css",
  "./signinStudent.js",
  "./signinTeacher.html",
  "./signinTeacher.css",
  "./script2.js",
  "./homePage.html",
  "./homePage.css",
  "./homePage.js",
  "./allstandards.html",
  "./progress.html",
  "./settings.html",
  "./settings.css",
  "./games.html",
  "./subjects.html",
  "./subjects.css",
  "./CHSE-Odisha-logo.jpg",
  "./gamified-education.jpg",
  "./Govt_odisha.png",
  "./jagannath-rath-yatra.jpg",
  "./odisha12logo.jpg",
  "./sambalpur.jpeg",
  "./Shri-Jagannath-Temple.jpg",
  "./starting_background.jpg",
  "./site.webmanifest",
];

// Install event
self.addEventListener("install", event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
});

// Activate event
self.addEventListener("activate", event => {
  self.clients.claim();
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            console.log(`[SW] Deleting old cache: ${key}`);
            return caches.delete(key);
          }
        })
      )
    )
  );
});

// Helper function: check if request is HTML
const isHTMLRequest = request =>
  request.headers.get("accept")?.includes("text/html");

// Fetch event
self.addEventListener("fetch", event => {
  const request = event.request;

  if (isHTMLRequest(request)) {
    // Network first strategy for HTML pages
    event.respondWith(
      fetch(request)
        .then(response => {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(request, responseClone));
          return response;
        })
        .catch(() => {
          return caches.match(request).then(cached => cached || caches.match("./index.html"));
        })
    );
  } else {
    // Cache first for all other files (CSS, JS, images)
    event.respondWith(
      caches.match(request).then(response => {
        return response || fetch(request);
      })
    );
  }
});
