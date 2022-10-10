const express = require("express");
const upload  = require("../Middlewares/profileUpload");
const router = express.Router();
const tenantStatus = require("../Controllers/tenantStatus");

const auth = require("../Controllers/authentication");
const applicant = require("../Controllers/apply");

router.patch('/update/:userid', upload.single("image"), auth.profileUpdate); //Update tenant profile
router.post('/application/:userid',upload.single("id_doc"), applicant.applyRoom); //tenant apply for a property
router.get('/getStatus/tenant_status');
router.put('/updateTenant', tenantStatus);



module.exports = router;
