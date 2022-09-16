const express = require("express");
const upload  = require("../Middlewares/profileUpload");
const router = express.Router();

const auth = require("../Controllers/authentication");
const middleware = require("../Middlewares/userauth");

router.post('/register/:user_role', auth.register);
router.post('/login',auth.login); 
router.get('/profile/:userid', auth.userProfile); //get user profile
router.patch('/update/:userid', upload.single("image"), auth.profileUpdate); //Update user profile

// router.post('/file',upload.single("image"), auth.fileUpload);
module.exports = router;

