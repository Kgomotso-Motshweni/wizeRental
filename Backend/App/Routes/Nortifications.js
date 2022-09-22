const express = require("express");
const upload  = require("../Middlewares/fileUpload");
const router = express.Router();

const nortify = require('../Controllers/Nortification')

//router.get('/getmyplcestens/:id', nortify.getMyTenatsAndProperties);
router.post('/sendMessage/:id', nortify.sendToSpecificUser);

module.exports = router;