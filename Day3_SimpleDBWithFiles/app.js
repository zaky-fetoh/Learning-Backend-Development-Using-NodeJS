const DB = require("./SimpleDB");
const http = require("http");
const fs = require("fs");
const url = require("url");

const db = new DB("Ser.db");

const handelGetReq = function (req, res) {
  let key = new url.URLSearchParams(req.url.split("?")[1].split("#")[0]).get(
    "key"
  );
  let v = db.find(key);
  if (v) {
    res.statusCode = 200;
    res.write(JSON.stringify(v));
  } else res.statusCode = 404;
  res.end();
};

const handelPostReq = function (req, res) {
  let arr = [];
  req.on("data", chunk => {
    arr.push(chunk);
  });
  req.on("end", () => {
    let d = JSON.parse(Buffer.concat(arr).toString());
    db.insert(d.key, d.obj);
    res.statusCode = 200;
    res.write(JSON.stringify(d));
    res.end();
  });
  req.on('error',e=>{throw e});
  
};

const handelPutReq = function (req, res) {
  let oldkey = new url.URLSearchParams(
    req.url.split("?")[1].split("#")[0]).get(
      "key"
    );
  let arr = [];
  req.on("data", chunk => {
    arr.push(chunk);
  });
  req.on("end", () => {
    let d = JSON.parse(Buffer.concat(arr).toString());
    console.log(d.key);
    db.updating(oldkey, d.key, d.obj);
    res.statusCode = 200;
    res.write(JSON.stringify(d));
    res.end();
  })
  req.on('error',e=>{throw e});
}

const handelDelReq = function (req, res) {
  let key = new url.URLSearchParams(req.url.split("?")[1].split("#")[0]).get(
    "key"
  );
  let v = db.find(key);
  console.log(v);
  if (v) {
    db.delete(key);
  } else res.statusCode = 404;
  res.end();
}

http
  .createServer((req, res) => {
    let { url, method } = req;
    console.log(url, method);
    try {
      if (method === "GET") handelGetReq(req, res);
      if (method === "POST") handelPostReq(req, res);
      if (method === "PUT") handelPutReq(req, res);
      if (method === "DELETE") handelDelReq(req, res);
    } catch{
      res.statusCode = 500;
      res.end();
    }
  }).listen(3000);
