const {Client} = require("pg");
const client = new Client({
    connectionString: process.env.DB_Connnection,
    ssl:{
        rejectUnauthorized: false //allows external access to database when using nodejs
    }
});
module.exports = client
