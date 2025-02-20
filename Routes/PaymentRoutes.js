const express = require("express");
const PaymentController = require("./../Controller/PaymentController");

const Router = express.Router();

Router.post("/create-order", PaymentController.createOrder);
Router.post("/verify-payment", PaymentController.verifyPayment);

module.exports = Router;
