const mongoose = require('mongoose')
const Razorpay = require("razorpay");
const crypto = require("crypto");
require("dotenv").config();


const PaymentSchema = mongoose.Schema({
    razorpay_order_id: String,
    razorpay_payment_id: String,
    razorpay_signature: String,
   amount: Number,
   status: String
})

const Payment = new mongoose.model('Payment', PaymentSchema)
module.export = Payment

