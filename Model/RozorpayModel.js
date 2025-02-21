const mongoose = require('mongoose');

const PaymentSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    razorpay_order_id: String,
    razorpay_payment_id: String,
    razorpay_signature: String,
    amount: Number,
    status: { type: String, default: "Pending" }
});

const Payment = mongoose.model("Payment", PaymentSchema);
module.exports = Payment;
