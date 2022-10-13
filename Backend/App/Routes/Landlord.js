const express = require("express");
const upload  = require("../Middlewares/fileUpload");
const multiplePictures = upload.fields([{name:"image", maxCount:1}, {name:"pdf", maxCount:1}])
const router = express.Router();

const landlord = require("../Controllers/addProperty");
const get_tenants  = require('../Controllers/get_tenants');
const pending = require('../Controllers/pending')
const get_property = require("../Controllers/get_property");
const delete_rentee = require("../Controllers/delete_rentee");
const update_payment = require("../Controllers/update_payment");
const moa = require("../Controllers/createMOA")
const room = require('../Controllers/getPropertyInfo')
//Add Property Details
router.post('/add_property/:id', multiplePictures,landlord.addProperty);
router.post('/add_rooms/:property_id', upload.array("image", 5), landlord.addRoomImages);

//Get and delete My Properties
router.get('/getproperty/:userid', landlord.getMyProperties);
router.delete('/deleteProperty/:property_id', landlord.deleteMyProperty)
router.get('/getproperties/:id',get_property);

//Delete, update and get Rentees
router.delete('/deleteRentee/:id',delete_rentee)
router.get('/getRentees/:id',get_rentees)
router.put('/updatePayment',update_payment)
router.get('/getLandAddress/:id',get_tenants.getLandlordRes);
router.post('/getTenants',get_tenants.tenantsFromSpecifiAddress);
router.get('/getPayment',payment_status)

//Delete My Properties
router.delete('/deleteProperty/:property_id', landlord.deleteMyProperty);

//View Pending tenants 
router.get('/getPending/:userid', pending.getPendingTenants);
router.get('/getOnePending/:applicant_id', pending.getOnePendingTenants);

//Create MOA for a tenant
router.post('/acceptNewTenant', moa.CreateMOA)
router.patch('/updateRooms/:property_id', moa.updateRoomsAvailable) //Update rooms available

router.get('/getRoom/:id', room.getRoomById); //Tenant room details

module.exports = router;
