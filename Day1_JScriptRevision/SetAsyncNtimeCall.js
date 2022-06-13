
counter=0
function incrandprint(arg){
    console.log(arg)
    console.log( counter ++); 
}

function setNcall(callback, N, timeInterval, ...args){
    let stoptime = N * timeInterval + timeInterval/2;
    let repcall = setInterval(callback, timeInterval, ...args);
    setTimeout(()=>{
        clearInterval(repcall)
    },stoptime)
}

async function setNcall_dtr(callback, N, timeInterval, ...args){
    const chainedfunc = function (M){
        if(!M) return;
        setTimeout(chainedfunc,timeInterval, M-1); 
        callback(...args);        
    }
    setTimeout(chainedfunc,timeInterval, N);
}

async function setNcall_br(callback, N, timeInterval, ...args){
    for(let i =1 ; i <= N; i++)
        setTimeout(callback,timeInterval*i,...args);
}


setNcall_br(incrandprint, 1000 , 1000, 'mah')