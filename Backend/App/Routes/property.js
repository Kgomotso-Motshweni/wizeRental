const express = require("express");
const router = express.Router();


const landing = require("../Controllers/getPropertyInfo")

router.get('/getproperty', landing.getProperty);
router.get('/getByProperty/:id', landing.getPropertyByID); 
router.get('/getRoomsImages/:id', landing.getRoomsImages); 

module.exports = router;