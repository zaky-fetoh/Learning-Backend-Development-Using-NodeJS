const dbo = require("./data_base").gatDBO()
const mongo = require("mongodb");

class item {
    constructor(mongoObj) {
        Object.assign(this, mongoObj);
    }

    save(collection) {
        return dbo.collection(collection).insert(this).then(res => {
            this._id = res.insertId;
        })
    }
    upsert(collection) {
        if (!this._id) return this.save(collection)
        return dbo.collection(collection).updateOne({
            _id: mongo.ObjectId(this._id)
        }, {$set: this });
    }
    delete(collection) {
        return dbo.collection(collection).deleteOne({
            _id: mongo.ObjectId(this._id)
        })
    }
    addNewFields(obj){
        Object.assign(this, obj); 
    }
}
const createNewIntity = function (collection) {
    class intity extends item {

        constructor(empObj) {
            super(empObj);
        }

        update() {
            super.addNewFields(this);
            return super.upsert(collection);
        }
        delete() {
            return super.delete(collection);
        }
    } return intity;
}

exports.createNewIntity = createNewIntity
