const customer = require("./database/customer");
const Ops  = require("./ops"); 

class Customer extends Ops {
    constructor(){
        super(); 
        this.table = customer; 
    }
}

module.exports = new Customer();



