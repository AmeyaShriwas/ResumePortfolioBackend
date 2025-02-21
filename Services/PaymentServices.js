const Razorpay = require("razorpay");
const crypto = require("crypto");
const Payment = require("./../Model/RozorpayModel");
const Plan = require("./../Model/Plan");

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const createOrder = async (userId, amount, planName) => {
    try {
        if (isNaN(amount) || amount <= 0) {
            throw new Error("Invalid amount");
        }

        const options = {
            amount: Math.round(amount * 100),
            currency: "INR",
            receipt: `receipt_${Date.now()}`
        };

        const order = await razorpay.orders.create(options);

        // Store pending payment entry
        await Payment.create({
            userId,
            razorpay_order_id: order.id,
            amount,
            status: "Pending"
        });

        return { success: true, order };
    } catch (error) {
        return { success: false, message: error.message };
    }
};

const verifyPayment = async ({ userId, razorpay_order_id, razorpay_payment_id, razorpay_signature, planName }) => {
    try {
        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            return { success: false, message: "Missing payment details" };
        }

        const generatedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(`${razorpay_order_id}|${razorpay_payment_id}`)
            .digest("hex");

        if (generatedSignature !== razorpay_signature) {
            return { success: false, message: "Payment verification failed" };
        }

        // Update payment status
        const payment = await Payment.findOneAndUpdate(
            { razorpay_order_id },
            { razorpay_payment_id, razorpay_signature, status: "Paid" },
            { new: true }
        );

        // Update user plan
        const newPlanData = {
            planName,
            planStatus: "active",
            startDate: new Date(),
            endDate: new Date(new Date().setMonth(new Date().getMonth() + (planName === "rs1" ? 1 : 6))) // 1 or 6 months
        };

        await Plan.findOneAndUpdate({ userId }, newPlanData, { upsert: true });

        return { success: true, message: "Payment verified & plan updated", payment };
    } catch (error) {
        return { success: false, message: error.message };
    }
};

module.exports = { createOrder, verifyPayment };
