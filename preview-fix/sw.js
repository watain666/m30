const cacheName = self.location.pathname
const pages = [

];

self.addEventListener("install", function (event) {
  self.skipWaiting();

  caches.open(cacheName).then((cache) => {
    return cache.addAll(pages);
  });
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") {
    return;
  }
  
  // Skip service worker for audio files to avoid encoding issues
  const url = new URL(request.url);
  const audioExtensions = ['.m4a', '.mp3', '.wav', '.ogg', '.aac'];
  const isAudioFile = audioExtensions.some(ext => url.pathname.toLowerCase().endsWith(ext));
  
  if (isAudioFile) {
    return; // Let browser handle audio files directly
  }

  /**
   * @param {Response} response
   * @returns {Promise<Response>}
   */
  function saveToCache(response) {
    if (cacheable(response)) {
      return caches
        .open(cacheName)
        .then((cache) => cache.put(request, response.clone()))
        .then(() => response);
    } else {
      return response;
    }
  }

  /**
   * @param {Error} error
   */
  function serveFromCache(error) {
    return caches.open(cacheName).then((cache) => {
      return cache.match(request.url).then((response) => {
        if (response) {
          return response;
        }
        // If no cached response is found, return a basic 404 response
        return new Response('Resource not found', {
          status: 404,
          statusText: 'Not Found',
          headers: new Headers({
            'Content-Type': 'text/plain'
          })
        });
      });
    });
  }

  /**
   * @param {Response} response
   * @returns {Boolean}
   */
  function cacheable(response) {
    return response.type === "basic" && response.ok && !response.headers.has("Content-Disposition")
  }

  event.respondWith(
    fetch(request)
      .then(saveToCache)
      .catch((error) => {
        // Log the error for debugging
        console.warn('Fetch failed for:', request.url, error);
        return serveFromCache(error);
      })
  );
});
