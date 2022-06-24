const fs = require('fs');
const path = require('path');

const db_path = path.join(__dirname,'..', 'DB/')



const utils ={
    getImgePath: function(id){
        return path.join(db_path,String(id)) 
    },
    isExist: function(id){
        return fs.existsSync(this.getImgePath(id)); 
    },
    loggerFile:function(){
        if (!fs.existsSync(path.join(__dirname,'..', 'logger.txt')))
        fs.writeFile(path.join(__dirname,'..', 'logger.txt'),
            '', { encoding: "utf-8" }, err => {
                if (err) console.log(err);
            });
    }, 

}


module.exports = utils ; 