const express = require("express");
const upload  = require("../Cloudinary/multer");
const router = express.Router();

const auth = require("../Controllers/authentication");
const middleware = require("../Middlewares/userauth");

router.post('/register/:user_role',auth.register);
router.post('/login',auth.login);
router.get('/profile/:userid', auth.userProfile);
router.patch('/update/:userid', upload.single("image"), auth.profileUpdate);
// router.post('/file',upload.single("image"), auth.fileUpload);
module.exports = router;
