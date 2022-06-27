self.addEventListener('install',e=>{
    console.log('Service Worker installed');
});

self.addEventListener('activate',e=>{
    console.log('Service Worker Activatied');
    //self.skipWaiting();
})

self.addEventListener("push", e=>{
    body = {};
    console.log('Parse Puded Data')
    data = e.data.json() ; 
    console.log(data);
    self.registration.showNotification(data.update)
})

self.addEventListener('fetch', e=>{
    //ToBe Implemented;
});

