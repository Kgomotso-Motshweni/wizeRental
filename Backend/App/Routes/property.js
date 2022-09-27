const express = require('express')
const app = express()

const bodyParser = require('body-parser')


const {property} = require('../Controllers/property')
const {getProp} = require('../Controllers/getProp')
const {filter} = require('../Controllers/filter')


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


app.get('/getByProperty/:id',getProp);
app.get('/getproperty',property);
app.get('/filtered',filter);





module.exports = app
// module.exports= app =>{

//      //importing 
//     const property = require("../Controllers/property");
//     const prop = require("../Controllers/getProp");


 
//     //Creating routes
//     app.get('/property',property.getProperty);
//     app.get('/perprop',prop.getProp);
// }