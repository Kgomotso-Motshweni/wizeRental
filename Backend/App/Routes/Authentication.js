const express = require("express");
const router = express.Router();

const auth = require("../Controllers/authentication");
const middleware = require("../Middlewares/userauth");

router.post('/register/:user_role',auth.register);
router.post('/login',auth.login);
router.get('/profile',auth.userProfile);
router.patch('/update/:userid', auth.profileUpdate)
module.exports = router;
