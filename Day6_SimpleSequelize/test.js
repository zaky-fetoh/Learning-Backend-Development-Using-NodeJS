let funcs = {
    "f1":(x)=>()=>console.log(x),
    "f2":(x)=>()=>console.log(x),
    "f3":(x)=>()=>console.log(x),
    "f4":(x)=>()=>console.log(x),
}


Object.entries(funcs).forEach(([key,val])=>{
    exports[key] = val(key);
})