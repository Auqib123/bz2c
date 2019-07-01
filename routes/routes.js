const express = require("express");
const router = express.Router();
const { getCustomers, createCustomers } = require("./controllers/customer-controller")

router.post("/customers", createCustomers);
router.get("/customers", getCustomers);
module.exports = router;