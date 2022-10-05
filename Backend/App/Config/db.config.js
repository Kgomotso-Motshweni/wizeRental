
//local connection

//const {Client} = require("pg");
//const client= new Client(process.env.DB_URL)

// hosted
const {Client} = require("pg");
const client = new Client({
    connectionString: process.env.DB_Posgres,
    ssl:{
        rejectUnauthorized: false //allows external access to database when using nodejs
    }
});

module.exports = client
