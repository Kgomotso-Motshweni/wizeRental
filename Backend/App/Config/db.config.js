//Using POSTGRES
// const {Client} = require("pg");
// const client = new Client({
//     connectionString: process.env.DB_Posgres,
//     ssl:{
//         rejectUnauthorized: false //allows external access to database when using nodejs
//     }
// });



//Using MSQL
const mysql = require('mysql');
const client = new mysql.createConnection({
    host     : process.env.DB_Host, 
    user     : process.env.DB_User, 
    database : process.env.DB_Data, 
    password : process.env.DB_Pass,
    ssl:{
        rejectUnauthorized: false //allows external access to database when using nodejs
    }
})

module.exports = client
