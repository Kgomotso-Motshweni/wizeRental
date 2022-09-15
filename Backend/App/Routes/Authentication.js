const express = require("express");
const multer = require("multer");
const upload  = require("../Middlewares/profileUpload");
const router = express.Router();
const bodyParser = require('body-parser');
// app.use(bodyParser.json());
// app.use(express.urlencoded({  extended: true }));

const auth = require("../Controllers/authentication");
const middleware = require("../Middlewares/userauth");

// const upload  = multer({dest: 'uploads/'})

router.post('/register/:user_role', auth.register);
router.post('/login',auth.login);
router.get('/profile/:userid', auth.userProfile);
router.patch('/update/:userid', upload.single("image"), auth.profileUpdate);
// router.post('/file',upload.single("image"), auth.fileUpload);
module.exports = router;

