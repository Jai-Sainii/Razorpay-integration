const Course = require("../models/Course");
const razorpayInstance = require("../config/razorpay.config");
const crypto = require("crypto");

exports.createOrder = async (req, res) => {
  const { courseId } = req.body;
  try {
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    const amount = course.price;
    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: "order_rcptid_123",
    };
    razorpayInstance.orders.create(options, (error, order) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ message: "Failed to create order" });
      }
      res.json(order);
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to create order" });
  }
};


exports.verifyPayment = (req, res) => {
  const { order_id, payment_id, signature } = req.body;
  const secret = process.env.RAZORPAY_KEY_SECRET;
  try {

    const expectedSignature = crypto
        .createHmac("sha256", secret)
        .update(order_id + "|" + payment_id)
        .digest("hex");

        if (signature !== expectedSignature) {
        return res.status(400).json({ message: "Invalid signature" });
    }
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to verify payment" });
  }
};
