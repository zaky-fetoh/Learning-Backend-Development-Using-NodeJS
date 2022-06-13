const http = require('http');


function handelReq(res, buff) {
    res.on('data', chank => {
        buff.push(chank)
    });
    res.on('end', () => {
        let output = Buffer.concat(buff).toString();
        console.log(output)
    })
    res.on('end', () => {
        console.log('Done');
    })
}


async function sendReq(url) {
    request = http.request(url, res => {
        let sc = res.statusCode;
        let buff = [];
        if (sc === 200) handelReq(res, buff);
        else {
            console.log('SoMeErrOcc Trying Again');
            setTimeout(sendReq, 5000, url);
        }
    }).end()
}

let options = {
    hostname: 'localhost',
    port: 4000, path: '/',
    method: 'GET'
}

function main(){
    for(let i = 0; i < 2000; i++){
        sendReq(options);
    }
}


main();