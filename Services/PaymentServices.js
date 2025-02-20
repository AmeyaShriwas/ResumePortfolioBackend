const Razorpay = require("razorpay");
const crypto = require("crypto");
const Payment = require("./../Model/RozorpayModel");

// const RAZORPAY_KEY_ID = "rzp_test_KLoSa0rPrNw5Y2";
// const RAZORPAY_KEY_SECRET = "fjo4u549ufhol3inj43984093uojn49y0fhohf930fh";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const createOrder = async (amount) => {
  try {
    const options = {
      amount: amount * 100, // Convert amount to paisa
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    return { success: true, order };
  } catch (error) {
    throw new Error(error.message);
  }
};

const verifyPayment = async ({ razorpay_order_id, razorpay_payment_id, razorpay_signature, amount }) => {
  try {
    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return { success: false, message: "Payment verification failed" };
    }

    const payment = new Payment({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      amount,
      status: "Paid",
    });

    await payment.save();
    return { success: true, message: "Payment verified successfully" };
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { createOrder, verifyPayment };
