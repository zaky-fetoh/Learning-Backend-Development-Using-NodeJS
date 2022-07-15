const pool = require("../model/database").pool;

exports.save = function (employee) {
    return pool.execute(`INSERT INTO employee(name, age)
    VALUES (?, ?)`, [
        employee.name, employee.age,
    ]);
};


exports.find = function(id) {
    return pool.execute(`
    SELECT * FROM employee 
    WHERE id = ?`, [id]);
};


exports.findAll = function(){
    return pool.execute(`SELECT * FROM employee`);
};


exports.update = function(id, employee){
    return pool.execute(`UPDATE employee
    SET name=?, age=?
    WHERE id= ?`, [employee.name, employee.age, id]
    );
};





