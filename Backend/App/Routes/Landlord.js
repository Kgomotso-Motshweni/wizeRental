const express = require("express");
const upload  = require("../Middlewares/fileUpload");
const router = express.Router();

const landlord = require("../Controllers/addProperty");
const get_rentees  = require('../Controllers/get_rentees');
const middleware = require("../Middlewares/userauth");

router.post('/add_property/:userid', upload.single("pdf"), landlord.addProperty);
router.post('/add_rooms/:property_id', upload.single("image"), landlord.addRoomImages);
router.get('/getproperty/:userid', landlord.getMyProperties);
router.delete('/deleteProperty/:property_id', landlord.deleteMyProperty)
router.get('/getRentees', get_rentees)

//router.patch('/update/:userid', upload.single("image"), auth.profileUpdate);
// router.post('/file',upload.single("image"), auth.fileUpload);
module.exports = router;
