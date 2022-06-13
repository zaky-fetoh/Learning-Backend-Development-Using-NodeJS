const fs = require('fs') 
const log= console.log
const toChar = String.fromCharCode

class deffMap extends Map{
    constructor(){
        super()
    }
    get(k){
        if (super.has(k)) return super.get(k);
        else return 0;
    }
    incr(k){
        super.set(k, this.get(k)+1);
    }
}

const calhist = function(txt){
    hist = new deffMap();
    txt.forEach(c=>hist.incr(c)) 
    return hist ; 
}

const getSorted = function(hist){
    list = Array.from(hist);
    list.sort(([k1,v1], [k2,v2])=> v1 - v2)
    return list
}


const printfreq = function(list){
    list.forEach(([k,v]) => {
        log(toChar(k) +" "+ v)
    });
}

inp = process.stdin.on('data',data =>{
    log('youIntered' + data); 
    printfreq( getSorted(calhist(data)));
});

