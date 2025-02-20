const express = require('express')
const Router = express.Router();
const Payment = require('./../Model/RozorpayModel')
const Razorpay = require("razorpay");
const crypto = require("crypto");


const RAZORPAY_KEY_ID='rzp_test_KLoSa0rPrNw5Y2'
const RAZORPAY_KEY_SECRET='fjo4u549ufhol3inj43984093uojn49y0fhohf930fh'
const rozorpay = new Razorpay({
    key_id:  RAZORPAY_KEY_ID,
    key_secret: RAZORPAY_KEY_SECRET
});

Router.post('/create-order', async (req, res)=> {
    try{

        const option = {
            amount: req.body.amount * 100,
            currency: "INR",
            receipt: `receipt_${Date.now()}`

        }
        const order  = await rozorpay.orders.create(option)
        res.json({ success: true, order });

    }
    catch(error){
        console.log('error', error)
        res.status(500).json({ success: false, error: error.message})
    }
})

Router.post('/verify-payment', async(req, res)=> {
    try{

        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
        const generatedSignature = crypto
        .createHmac("sha256", RAZORPAY_KEY_SECRET)

      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

      if (generatedSignature === razorpay_signature) {
        const payment = new Payment({
          razorpay_order_id,
          razorpay_payment_id,
          razorpay_signature,
          amount: req.body.amount,
          status: "Paid",
        });
  
        await payment.save();
        res.json({ success: true, message: "Payment verified successfully" });
      } else {
        res.status(400).json({ success: false, message: "Payment verification failed" });
      }

    }
    catch(error){
        res.status(500).json({ success: false, error: error.message });
    }
})

module.exports = Router
