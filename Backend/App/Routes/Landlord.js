const express = require("express");
const upload  = require("../Middlewares/fileUpload");
const multiplePictures = upload.fields([{name:"image", maxCount:1}, {name:"pdf", maxCount:1}])
const router = express.Router();



const landlord = require("../Controllers/addProperty");
const get_rentees  = require('../Controllers/get_rentees');
const get_tenants  = require('../Controllers/get_tenants');
const pending = require('../Controllers/pending')
const middleware = require("../Middlewares/userauth");
const get_property = require("../Controllers/get_property");
const delete_rentee = require("../Controllers/delete_rentee");
const update_payment = require("../Controllers/update_payment");


router.post('/add_property/:id', multiplePictures,landlord.addProperty);
router.post('/add_rooms/:property_id', upload.single("image"), landlord.addRoomImages);
router.get('/getproperty/:userid', landlord.getMyProperties);
router.delete('/deleteProperty/:property_id', landlord.deleteMyProperty)
router.delete('/deleteRentee/:id',delete_rentee)
router.get('/getRentees/:id',get_rentees)
// router.get('/getPending/:id',get_pending)
router.get('/getproperties/:id',get_property)
router.put('/updatePayment',update_payment)


router.get('/getLandAddress/:id',get_tenants.getLandlordRes);
router.get('/getTenants/:address',get_tenants.tenantsFromSpecifiAddress);
// router.get('/getLandAddress/:id', get_rentees.getLandlordRes);
// router.get('/getRentees/:address', get_rentees.tenantsFromSpecifiAddress);


// router.post('/getTenants',get_tenants.tenantsFromSpecifiAddress); ///
router.delete('/deleteProperty/:property_id', landlord.deleteMyProperty);
router.get('/getPending/:userid', pending.getPendingTenants);
router.get('/getOnePending/:applicant_id', pending.getOnePendingTenants);


router.get('/getproperties/:id',get_property);

// router.patch('/update/:userid', upload.single("image"),auth.profileUpdate);
// router.post('/file',upload.single("image"), auth.fileUpload);
module.exports = router;
