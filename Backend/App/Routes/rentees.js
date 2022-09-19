const express = require('express')
const app = express();
const bodyparser = require('body-parser')


const {rentees} = require('../controllers/rentees');
const { get_rentees } = require('../Controllers/get_rentees');
const { delete_rentee } = require('../Controllers/delete_rentee');
const { payment_status } = require('../Controllers/payment_status');



app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());



app.post('/rentees',rentees)
app.get('/getRentees',get_rentees)
app.get('/getPayment',payment_status)
app.delete('/deleteRentee/:id',delete_rentee)


module.exports = app
