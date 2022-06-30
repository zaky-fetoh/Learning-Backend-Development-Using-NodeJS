const fs = require('fs'),
    path = require('path');

class SDB {
    constructor(name = "sub.db", SaveEvery = 3000) {
        this.SubArr = [];
        this.updatedDBToDisk = false;
        this.p = path.join(__dirname, name);
        fs.stat(this.p, (err, stat) => {
            if (err)
                fs.writeFile(this.p, "[]", err => {
                    console.log("DataBase Created");
                });
            else {
                this.loadFromFile();
            }
        });
        setInterval(() => {
            if (this.updatedDBToDisk)
                this.saveToDisk();
            this.updatedDBToDisk = false; 
        }, SaveEvery);
    }
    addSubscr(subscr) {
        this.SubArr.push(subscr);
        this.updatedDBToDisk = true;
    }
    loadFromFile() {
        let data = fs.readFileSync(this.p, { encoding: 'utf-8' });
        this.SubArr = JSON.parse(data);
    }
    saveToDisk() {
        fs.writeFile(this.p, JSON.stringify(this.SubArr), err => {
            if (err) throw err;
            console.log("Subsribers DataBase Saved");
        });
    }

}

exports.SDB = SDB;