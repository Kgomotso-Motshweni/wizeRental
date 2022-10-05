const express = require("express");
const router = express.Router();

const nortify = require('../Controllers/Nortification')

router.get('/filterTenants/:p_name', nortify.FilterTenants)
//Send Notifications from landlord
router.post('/sendMessage/:id', nortify.sendToSpecificUser);

//Receive Notifications from landlord
router.get('/landlordReceive/:id', nortify.landlordReceive);

//Send Notifications from tenant
router.post('/tenantSend/:id', nortify.tenantSend);

//Receive Notifications from landlord
router.get('/tenantReceive/:id', nortify.tenantReceive);

module.exports = router;