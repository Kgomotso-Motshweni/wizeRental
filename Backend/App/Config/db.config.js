
//local connection

//const {Client} = require("pg");
//const client= new Client(process.env.DB_URL)

//Using MSQL
// const mysql = require('mysql');
// const client = new mysql.createConnection({
//     host     : process.env.DB_Host, 
//     user     : process.env.DB_User, 
//     database : process.env.DB_Data, 
//     password : process.env.DB_Pass,
//     ssl:{
        // rejectUnauthorized: false //allows external access to database when using nodejs
//     }
// })

// module.exports = client


//
const Pool = require('pg').Pool
// const pool = new Pool("postgres://fxarrraqzxyuak:6730a1bbc832d76d2f2da0d1069315dd4f78c0010298e71906dcda81738b5710@ec2-52-71-23-11.compute-1.amazonaws.com:5432/d2cjd0a8ddb2ks")

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'wizerentalz',
  password: 'Letsdoit!',
  port: 5432,
})

/*
const {Client} = require("pg");
const client = new Client({
    connectionString: process.env.DB_Posgres,
    ssl:{
        rejectUnauthorized: false //allows external access to database when using nodejs
    }
});
*/
module.exports = pool;