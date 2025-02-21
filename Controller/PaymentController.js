const { createOrder, verifyPayment } = require("./../Services/PaymentServices");

const createOrderHandler = async (req, res) => {
    try {
        const { amount, planName } = req.body;
        const response = await createOrder(req.user.id, amount, planName);
        res.json(response);
    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({ success: false, error: error.message });
    }
};

const verifyPaymentHandler = async (req, res) => {
    try {
        const response = await verifyPayment({ userId: req.user.id, ...req.body });
        res.json(response);
    } catch (error) {
        console.error("Error verifying payment:", error);
        res.status(500).json({ success: false, error: error.message });
    }
};

module.exports = { createOrderHandler, verifyPaymentHandler };
