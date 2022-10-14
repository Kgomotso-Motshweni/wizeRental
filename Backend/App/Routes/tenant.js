const express = require("express");
const upload  = require("../Middlewares/profileUpload");
const router = express.Router();

const room = require("../Controllers/getPropertyInfo")
const auth = require("../Controllers/authentication");
const applicant = require("../Controllers/apply")
const moa = require("../Controllers/createMOA")

router.patch('/update/:userid', upload.single("image"), auth.profileUpdate); //Update tenant profile
router.post('/application/:userid',upload.single("id_doc"), applicant.applyRoom); //tenant apply for a property
router.get('/getMOA/:id', moa.getMOA); //getUnsigned MOA
router.get('/getSignedMOA/:id', moa.getSingedMOA); //Get Singed MOA
router.post('/updateSignature',moa.updateSignature) //Sign MOA
router.get('/getRoom/:id', room.getRoomById); //Tenant room details

module.exports = router;
