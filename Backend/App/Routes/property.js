const express = require("express");
const router = express.Router();


const landing = require("../Controllers/getPropertyInfo")
const filterbyname =require("../Controllers/filterName")
const filterbytown =require("../Controllers/filtertown")
const filterbyProp =require("../Controllers/filterProperty")

router.get('/getproperty', landing.getProperty);
router.get('/getByProperty/:id', landing.getPropertyByID); 
router.get('/getRoomsImages/:id', landing.getRoomsImages); 
router.get('/filtername',filterbyname.filtername);
router.get('/filtertown',filterbytown.filterTown);
router.get('/filterpropertytype',filterbyProp.filterProp);



module.exports = router;