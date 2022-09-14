const express = require("express");
const upload  = require("../Middlewares/profileUpload");
const router = express.Router();

const landlord = require("../Controllers/addProperty");
const middleware = require("../Middlewares/userauth");

router.post('/add_property/:userid', upload.single("image"), landlord.addProperty);
router.post('/add_rooms/:property_id', upload.single("image"), landlord.addRoomImages);

//router.patch('/update/:userid', upload.single("image"), auth.profileUpdate);
// router.post('/file',upload.single("image"), auth.fileUpload);
module.exports = router;
