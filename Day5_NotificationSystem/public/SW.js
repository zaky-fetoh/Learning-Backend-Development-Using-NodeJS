//cashes
const cache_name = "NotiCach_v0"
const upadateUrl = '/isThereUpdates'
let SW_name = undefined;

//installing Event
self.addEventListener('install', e => {
    console.log('SW is installed');

});

//activate Event
self.addEventListener('activate', e => {

    //Get Current Number of Notifation From Server
    e.waitUntil(fetch(upadateUrl,
        { method: "GET" }
        //Caching this number in case that asked
    ).then(res => {
        caches.open(cache_name).then(cache => {
            cache.put(upadateUrl, res)
        })
    }));
});


//update the Number of Notifications
self.addEventListener('push', e => {
    data = e.data.json()
    if (data.type === "IsAlive") // For Checking if the Service worker still Exist
        // it simply Reply With it's name if not server will dlt it subsrcibtion
        e.waitUntil(fetch('/Alive', {
            method: "POST",
            body: JSON.stringify({'name': SW_name}),
            headers: {
                'Content-Type': 'application/json'
            }
        }));
    else if (data.type === "SetName"){ // set the service worker name
        SW_name = data.name;
        console.log("Service Worker Name has been Set" + SW_name)
    }
    else if (data.type === "NotiUpdate") e.waitUntil(
        fetch(upadateUrl,
            { method: "GET" }
            //Caching this number in case that asked
        ).then(res => {
            caches.open(cache_name).then(cache => {
                cache.put(upadateUrl, res)
            })
        })
    );
});

//respond With the Cached Notification Number
self.addEventListener('fetch', event => {
    event.respondWith(async function() {
        // Try to get the response from a cache.
        const cachedResponse = await caches.match(event.request);
        // Return it if we found one.
        if (cachedResponse) return cachedResponse;
        // If we didn't find a match in the cache, use the network.
        return fetch(event.request);
      }());
});
