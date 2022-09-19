const express = require('express')
const app = express();
const bodyparser = require('body-parser')

const {rentees} = require('../controllers/rentees');
const { get_rentees } = require('../Controllers/get_rentees');



app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());



app.post('/rentees',rentees)
app.get('/getRentees',get_rentees)


module.exports = app
