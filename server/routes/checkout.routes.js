const express = require("express");
const { createCheckoutSession } = require("../controllers/checkout.controller");
const verifyToken = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/create-checkout-session", verifyToken, createCheckoutSession);

module.exports = router;
