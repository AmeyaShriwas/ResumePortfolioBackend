const express = require("express");
const { createOrderHandler, verifyPaymentHandler } = require("./../Controller/PaymentController");

const Router = express.Router();

Router.post("/create-order", createOrderHandler);
Router.post("/verify-payment", verifyPaymentHandler);

module.exports = Router;
