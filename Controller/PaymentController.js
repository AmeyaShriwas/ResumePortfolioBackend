const PaymentService = require("./../Services/PaymentServices");

class PaymentController {
  static async createOrder(req, res) {
    try {
      const { amount } = req.body;
      const response = await PaymentService.createOrder(amount);
      res.json(response);
    } catch (error) {
      console.error("Error creating order:", error);
      res.status(500).json({ success: false, error: error.message });
    }
  }

  static async verifyPayment(req, res) {
    try {
      const response = await PaymentService.verifyPayment(req.body);
      res.json(response);
    } catch (error) {
      console.error("Error verifying payment:", error);
      res.status(500).json({ success: false, error: error.message });
    }
  }
}

module.exports = PaymentController;
