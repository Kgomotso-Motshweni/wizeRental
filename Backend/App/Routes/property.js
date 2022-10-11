const express = require("express");
const router = express.Router();

const landing = require("../Controllers/getPropertyInfo")
const filterTown = require("../Controllers/filterTown")
const filterP_Name = require("../Controllers/filterP_Name")
const filterPropertyType = require("../Controllers/filterPropertyType")

router.get('/getproperty', landing.getProperty);
router.get('/getByProperty/:id', landing.getPropertyByID); 
router.get('/getRoomsImages/:id', landing.getRoomsImages); 
router.get('/filterTown', filterTown.filterTown)
router.get('/filterName', filterP_Name.filterName)
router.get('/filterProperty', filterPropertyType.filterProperty)
module.exports = router;