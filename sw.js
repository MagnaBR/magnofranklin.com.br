let sw_version = 'v0.01';

const addResourcesToCache = async (resources) => {
    const cache = await caches.open(sw_version);
    await cache.addAll(resources);
};

self.addEventListener("install", (event) => {
    event.waitUntil(
      addResourcesToCache([
        "/",
      ]),
    );
});

self.addEventListener("fetch", (event) => {
    console.log(event);
    //event.respondWith();
});

const deleteCache = async (key) => {
    await caches.delete(key);
  };
  
  const deleteOldCaches = async () => {
    const cacheKeepList = [sw_version];
    const keyList = await caches.keys();
    const cachesToDelete = keyList.filter((key) => !cacheKeepList.includes(key));
    await Promise.all(cachesToDelete.map(deleteCache));
  };
  
  self.addEventListener("activate", (event) => {
    event.waitUntil(deleteOldCaches());
  });
  