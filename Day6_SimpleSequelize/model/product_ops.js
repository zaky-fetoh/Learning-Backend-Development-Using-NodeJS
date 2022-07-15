const product = require("./database/products");
const Ops = require("./ops")

class Products extends Ops {
    constructor(){
        super(); 
        this.table = product; 
    }
}

module.exports = new Products();
