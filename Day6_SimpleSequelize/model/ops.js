class ops{
    constructor(){
        this.table= undefined ;
    }


     add(cus) {
        return this.table.create(cus)
    }

     findAll() {
        return this.table.findAll();
    }

     findId(id) {
        return this.table.findByPk(id);
    }

     find(cus) {
        return this.table.findAll({
            where: cus
        });
    }
    
     delete(id){
        return this.findId(id).then(cus=>{
            return cus.destroy()
        });
    }
}

module.exports = ops