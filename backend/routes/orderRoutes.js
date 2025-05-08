const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

// Create order
router.post("/", async (req, res) => {
  if (!req.session.user) return res.status(401).json({ message: "Unauthorized" });

  try {
    const order = new Order({
      user: req.session.user.id,
      items: req.body.items,
      total: req.body.total,
      address: req.body.address
    });
    await order.save();
    res.status(201).json({ message: "Order placed", order });
  } catch (err) {
    res.status(500).json({ message: "Error saving order" });
  }
});

// Get orders for logged-in user
router.get("/", async (req, res) => {
  if (!req.session.user) return res.status(401).json({ message: "Unauthorized" });

  try {
    const orders = await Order.find({ user: req.session.user.id });
    res.json({ orders });
  } catch (err) {
    res.status(500).json({ message: "Error fetching orders" });
  }
});

module.exports = router;
