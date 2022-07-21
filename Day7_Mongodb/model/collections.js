const createNewIntity = require("./items-temp").createNewIntity;
const dbo = require("./data_base").gatDBO()

class Collection {
    constructor(collecName) {
        this.ItemClass = createNewIntity(collecName);
        this.rawMongoObj = dbo.collection(collecName);
    }
    insertNew(objs) {
        return new this.ItemClass(objs).update();
    }
    findOne(query) {
        return new this.ItemClass(
            this.rawMongoObj.findOne(query)
        );
    }
    async findAll(query = {}) {
        const arr = [];
        let cursor = await this.rawMongoObj.find(query);
        await cursor.forEach(e=>{
            arr.push(new this.ItemClass(e));
        })
        return arr;
    }

}

exports.CollectionNames = ["Employee", "Customer"]
exports.CollectionNames.forEach(e => {
    exports[e] = new Collection(e);
})

