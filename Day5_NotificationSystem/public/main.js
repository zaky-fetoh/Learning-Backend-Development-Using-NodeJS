//public Vapid key
const PUBLIC_KEY = "BET-SlEFF_YVnkKDFJ5al7mznXtDSH2LUh8UY6hSdyJBhv2qckOA4L4GKSWEWMoBUbrMMVP3T3xp1Pq7BDtTpjk";

function toUint8(base64String) {
    const padding = "=".repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, "+")
        .replace(/_/g, "/");

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}



//Registering the Service Worker
if ("serviceWorker" in navigator)
    navigator.serviceWorker.register('SW.js', { scope: '/' });

//making SW's Push manager subscribs the Server
navigator.serviceWorker.ready.then(reg => {
    return reg.pushManager.subscribe({
        applicationServerKey: toUint8(PUBLIC_KEY),
        userVisibleOnly: true,
    })
}).then(subscr => { // Sending Subscribtion to the Server.
    return fetch('/subsribe', {
        method: "POST", body: JSON.stringify(subscr),
        headers: {
            'Content-Type': 'application/json'
        },
    })
}).then((res) => { // probing periodically new Notifications from SW
    console.log("hello After the SW subscribed")
    if (res.status >= 300 && res.status < 199)
        return Promise.reject(new Error("SADSAD"));
    setInterval(() => {
        fetch('/isThereUpdates', {
            method: "GET",
        }).then((res) => res.json()).then( respo => {
            updates = respo.numbers
            //console.log(respo)
            if (updates) {
                //console.log(updates)
                document.getElementById('Ntf').innerHTML = `You have ${updates}`
            }
        })
    }, 2000)
}).catch(err => { //catching Promises Erros
    console.log(err)
    console.log("Failed Please Reload The Page")
});



