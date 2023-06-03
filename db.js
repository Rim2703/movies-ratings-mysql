const mysql = require('mysql')

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root123',
    database: 'my_db'
})

db.connect((err)=>{
    if(err){
        console.log(err)
    }
    else{
        console.log("Mysql connected")
    }
})

module.exports = db;