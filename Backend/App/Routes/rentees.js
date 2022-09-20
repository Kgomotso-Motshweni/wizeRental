const express = require('express')
const router = express.Router();

const rentees = require('../controllers/rentees');

const { delete_rentee } = require('../Controllers/delete_rentee');
const { payment_status } = require('../Controllers/payment_status');

router.post('/rentees',rentees)

router.get('/getPayment',payment_status)
router.delete('/deleteRentee/:id',delete_rentee)


module.exports = router
