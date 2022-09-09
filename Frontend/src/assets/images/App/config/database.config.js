
const {Client} = require("pg");
const client = new Client(process.env.DB);

//  const client = new Client({
//      connectionString: process.env.DB,
//      ssl:{
//          rejectUnauthorized: false //allows external access to database when using nodejs
//      }
//  });

module.exports = client;