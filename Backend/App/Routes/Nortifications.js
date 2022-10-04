const express = require("express");
const router = express.Router();

const nortify = require('../Controllers/Nortification')

router.get('/filterTenants/:p_name', nortify.FilterTenants)
router.post('/sendMessage/:id', nortify.sendToSpecificUser);
router.get('/landlordReceive/:id', nortify.landlordReceive);
router.post('/tenantSend/:id', nortify.tenantSend);
router.get('/tenantReceive/:id', nortify.tenantReceive);

module.exports = router;