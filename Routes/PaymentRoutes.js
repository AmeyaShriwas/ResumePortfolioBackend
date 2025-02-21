const express = require("express");
const { createOrderHandler, verifyPaymentHandler } = require("./../Controller/PaymentController");
const authMiddleware = require("./../Middleware/Auth");

const router = express.Router();

router.post("/create-order", authMiddleware, createOrderHandler);
router.post("/verify-payment", authMiddleware, verifyPaymentHandler);

module.exports = router;
