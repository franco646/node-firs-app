const mysql = require('mysql2');


const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'firstnodedatabase',
    password: 'mortadela1'
})

module.exports = pool.promise();    