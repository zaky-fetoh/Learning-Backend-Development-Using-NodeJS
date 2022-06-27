const PUBLIC_KEY = 'BDh6kcUfD7Lq3ofr2b8lJzHhQBg_NBNkgCVWE8NM7n5OAp1GipznXeqz2AOW2BE9f4wNWS-_-ujvf-x6OkGqXYI'

function urlBase64ToUint8Array(base64String) {
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

if ('serviceWorker' in navigator){
    navigator.serviceWorker.register('SerWorker.js',
        { scope: '/' });
    
        navigator.serviceWorker.ready.then(reg=>{
    reg.pushManager.subscribe({
        applicationServerKey:urlBase64ToUint8Array(PUBLIC_KEY),
        userVisibleOnly: true,
    }).then(subscription =>{
        fetch('/subscribe',{method: "POST",
        body: JSON.stringify(subscription),
        headers: {
            "content-type": "application/json"
        }})
    })
})}