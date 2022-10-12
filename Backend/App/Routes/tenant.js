const express = require("express");
const upload  = require("../Middlewares/profileUpload");
const router = express.Router();

const get_property = require("../Controllers/get_property");
const room = require("../Controllers/getPropertyInfo")
const auth = require("../Controllers/authentication");
const applicant = require("../Controllers/apply");

router.patch('/update/:userid', upload.single("image"), auth.profileUpdate); //Update tenant profile
router.post('/application/:userid',upload.single("id_doc"), applicant.applyRoom); //tenant apply for a property
router.get('/getRoom/:id', room.getRoomById); //Tenant room details
router.get('/getproperties/:id',get_property);

module.exports = router;
