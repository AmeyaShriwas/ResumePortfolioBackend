const { createOrder, verifyPayment } = require("./../Services/PaymentServices");

const createOrderHandler = async (req, res) => {
  try {
    const { amount } = req.body;
    const response = await createOrder(amount);
    res.json(response);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

const verifyPaymentHandler = async (req, res) => {
  try {
    const response = await verifyPayment(req.body);
    res.json(response);
  } catch (error) {
    console.error("Error verifying payment:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = { createOrderHandler, verifyPaymentHandler };
