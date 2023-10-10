/* eslint-disable no-restricted-globals */

console.log('running service worker');

async function handleResponse(event) {
  const { request } = event;
  let cacheRequest = request;
  if (request.method.toUpperCase() === 'POST') {
    // get the body text...
    const body = await request.clone().text();
    // create a new URL for the purposes of a cache key...
    const cacheUrl = new URL(request.url);
    // create an augmented URL by appending the body to the original pathname...
    cacheUrl.pathname += body;
    // convert the request to a GET to be able to cache it...
    cacheRequest = new Request(cacheUrl.toString(), {
      headers: request.headers,
      method: 'GET',
    });
  }
  // get cache...
  const cache = await caches.open('algolia-search');
  // check if there is a cached response in the cache based on the cloned
  // GET request (for the cache key) NOT the original POST request...
  let response = await cache.match(cacheRequest);
  // if not, fetch the response using the original POST request...
  if (!response) {
    response = await fetch(request);
    // put the response into the cache using the cloned GET request
    // (for the cache key) NOT the original POST request...
    event.waitUntil((await cache).put(cacheRequest, response.clone()));
  }
  return response;
}

function incrementCounterInDB(request) {
  const idb = indexedDB.open('myDatabase', 1);
  idb.onupgradeneeded = (event) => {
    event.target.result.createObjectStore('counterStore');
  };
  // Open a connection to the IndexedDB
  idb.onsuccess = (event) => {
    const db = event.target.result;
    const transaction = db.transaction('counterStore', 'readwrite');
    const store = transaction.objectStore('counterStore');
    // Get the current value of the counter for the URL
    store.get(request.url).onsuccess = (e) => {
      let counter = e.target.result || 0;
      // check if counter is a number
      if (typeof counter !== 'number') {
        counter = parseInt(counter, 10);
      }
      // Increment the counter
      counter += 1;
      // Update the counter in the IndexedDB
      store.put(counter, request.url);
    };
  };
}

self.addEventListener('fetch', (e) => {
  if (e.request.url.includes('/adobe/assets/search')) {
    incrementCounterInDB(e.request);
    e.respondWith((async () => handleResponse(e))());
  }
});

self.addEventListener('activate', (ev) => {
  ev.waitUntil(self.clients.claim());
});

self.skipWaiting();
