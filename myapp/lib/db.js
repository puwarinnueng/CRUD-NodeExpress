//import dependency mysql //เชื่อมต่อฐานข้อมูล
let mysql = require('mysql');
let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodejs_crud'
})

connection.connect((error) => {
    //ถ้าเชื่อมต่อได้
    if(!!error){
        console.log(error);
    }else{
        console.log('connect ');
    }
})

module.exports = connection;