const express = require("express"),
    webpush = require("web-push"),
    uuid = require('uuid'),
    fs = require("fs"),
    path = require("path");

const pk = "BET-SlEFF_YVnkKDFJ5al7mznXtDSH2LUh8UY6hSdyJBhv2qckOA4L4GKSWEWMoBUbrMMVP3T3xp1Pq7BDtTpjk";
const prk = "M7z0QX6j_4m20iiIu1hZqB8JG2rE-bJGqtRsu6Dz8WE"

webpush.setVapidDetails(
    'mailto:example@yourdomain.org',
    pk, prk,
);

let CurrArticles = 0

const setSWName = function (subscr, name) {
    webpush.sendNotification(subscr,
        JSON.stringify({ "type": "SetName", "name": name })
    );
}

const notifyForUpdates = function(DB){

    DB.SubArr.forEach(({name, Subscr})=>{
        webpush.sendNotification(Subscr,
            JSON.stringify({ "type": "NotiUpdate"})
        );
    });

}

exports.getSubscrRoute = function (DB) {

    return express.Router().post('/subsribe', (req, res, next) => {
        let body = req.body;
        setTimeout(() => {
            let GivenName = uuid.v4();
            setSWName(body, GivenName);
            DB.addSubscr({ "name": GivenName, "Subscr": body });
        }, 10000)
        res.status(200).send("WillBeAdded10sec");
    })

}

exports.getIsthereNotifi = express.Router()
    .get('/isThereUpdates', (req, res, next) => {
        let payload = JSON.stringify({ "numbers": CurrArticles });
        res.status(200).contentType('application/json').send(payload)
    })

exports.addArticle = function(DB){
    return express.Router()
    .post('/addarticle', (req, res, next) => {
        article = req.body;
        fs.writeFile(
            path.join(__dirname, '..', 'DB', article.name + '.txt'),
            article.content,
            err => {
                if (err) res.status(401).send("Failed");
                else {
                    res.status(200).send('added');
                    CurrArticles++;
                    notifyForUpdates(DB);
                }
            }
        )
    })
}