const express = require("express");
const upload  = require("../Middlewares/profileUpload");
const router = express.Router();

const auth = require("../Controllers/authentication");
const applicant = require("../Controllers/apply");

router.patch('/update/:userid', upload.single("image"), auth.profileUpdate); //Update tenant profile
router.post('/application/:userid',upload.single("id_doc"), applicant.applyRoom); //tenant apply for a property


module.exports = router;
