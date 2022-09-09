const express = require('express'); // import express library
const cors = require('cors'); //import cors module
const app = express(); //Initialize express
const bodyParser = require('body-parser');

require('./App/Config/dotenv.config')

var corsOptions = {
    origin: ["*", "http://localhost:4200"],
    credentials: true
  };// only allow the listerning addresses to connnect to the backend
  
app.use(express.json());  // to support JSON-encoded
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);

//call our database connections file for postgre
const client = require('./App/Config/db.config')
client.connect((err) =>{ // Connect to the Database
    if (err) {
       console.log(err) //Return an error if unable to connnect to the database
      }
   else {
     console.log("Databased Connected"); //Database connection Successfuly
    }
});


const port = process.env.PORT || 8080; //create a listerning port number

app.get("/", (req, res) =>{
    res.status(200).send("Welcome to WizeRentalz server");
});


//Routes Calls
const auth = require("./App/Routes/Authentication");

app.use("/api", auth) //retrive authentication infor 


app.listen(port, () =>{  
    console.log(`Server is running on port ${port}. http://localhost:${port}`) 
 })
