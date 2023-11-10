/* eslint-disable no-restricted-globals */

// eslint-disable-next-line no-console
console.log('running service worker');
function stringifySort(sortKey, value) {
  if (value instanceof Object && !(value instanceof Array)) {
    return Object.keys(value)
      .sort()
      .reduce((sorted, key) => {
        sorted[key] = value[key];
        return sorted;
      }, {});
  }
  return (value instanceof Array) ? value.sort() : value;
}

async function handleResponse(event) {
  const { request } = event;
  let cacheRequest = request;
  if (request.method.toUpperCase() === 'POST') {
    // get the body text...
    let body = await request.clone().text();
    // create a new URL for the purposes of a cache key...
    const cacheUrl = new URL(request.url);
    // create an augmented URL by appending the body to the original pathname...
    body = JSON.stringify(body, stringifySort);
    cacheUrl.pathname += body;
    // convert the request to a GET to be able to cache it...
    cacheRequest = new Request(cacheUrl.toString(), {
      /* headers: request.headers, */
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
    incrementCounterInDB(request, false);
  } else {
    incrementCounterInDB(request, true);
  }
  return response;
}

function updateCounterObject(counterObject, isHit) {
  if (isHit) {
    if (counterObject.hits >= 1) {
      counterObject.hits = parseInt(counterObject.hits, 10);
      counterObject.hits += 1;
    } else {
      counterObject.hits = 1;
    }
  } else if (counterObject.miss >= 1) {
    counterObject.miss = parseInt(counterObject.miss, 10);
    counterObject.miss += 1;
  } else {
    counterObject.miss = 1;
  }
}

function incrementCounterInDB(request, isHit) {
  const idb = indexedDB.open('algoliaCacheUsageStats', 1);
  idb.onupgradeneeded = (event) => {
    event.target.result.createObjectStore('hitMissStore');
  };
  // Open a connection to the IndexedDB
  idb.onsuccess = (event) => {
    const db = event.target.result;
    const transaction = db.transaction('hitMissStore', 'readwrite');
    const store = transaction.objectStore('hitMissStore');
    // Get the current value of the counter for the URL
    store.get(request.url).onsuccess = (e) => {
      const hitMiss = e.target.result || {};
      // check if counter is a number
      updateCounterObject(hitMiss, isHit);

      // Update the counter in the IndexedDB
      store.put(hitMiss, request.url);
    };
  };
}

self.addEventListener('fetch', (e) => {
  if (e.request.url.includes('/adobe/assets/search')) {
    e.respondWith((async () => handleResponse(e))());
  }
});

self.addEventListener('activate', (ev) => {
  ev.waitUntil(self.clients.claim());
});

self.skipWaiting();
