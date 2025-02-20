const express = require("express");
const PaymentController = require('./../Controller/PaymentController')

const Router = express.Router();

Router.post("/create-order", PaymentController.createOrderHandler);
Router.post("/verify-payment", PaymentController.verifyPaymentHandler);

module.exports = Router;
