const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

// Nodemailer Setup (you’d need to pass this from server.js or reconfigure)
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER || 'lawalabiolaibileh@gmail.com',
    pass: process.env.EMAIL_PASS || 'Oluwajuedalo27',
  },
});

router.post('/', async (req, res) => {
  const { name, number, email, location, cartItems } = req.body;

  try {
    console.log('Received checkout request:', req.body);

    if (!name || !number || !email || !location || !cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
      console.error('Validation failed: Missing or invalid fields');
      return res.status(400).json({ message: 'All fields are required, and cart cannot be empty.' });
    }

    for (const item of cartItems) {
      if (!item.name || !item.price || !item.quantity) {
        console.error('Invalid cart item:', item);
        return res.status(400).json({ message: 'Invalid cart item data.' });
      }
    }

    const cartDetails = cartItems
      .map(
        (item) =>
          `${item.name} - ₦${item.price.toLocaleString()} x ${item.quantity} = ₦${(item.price * item.quantity).toLocaleString()}`
      )
      .join('\n');

    const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // Email to you (admin)
    const adminMailOptions = {
      from: process.env.EMAIL_USER || 'lawalabiolaibileh@gmail.com',
      to: 'lawalabiolaibileh@gmail.com', // Replace with your email address
      subject: 'New Order from Bsquare',
      text: `
        New Order Details:
        Name: ${name}
        Phone Number: ${number}
        Email: ${email}
        Location: ${location}

        Order Items:
        ${cartDetails}

        Total: ₦${totalPrice.toLocaleString()}
      `,
    };

    // Confirmation email to user
    const userMailOptions = {
      from: process.env.EMAIL_USER || 'your-email@gmail.com',
      to: email, // User's email
      subject: 'Order Confirmation - Bsquare',
      text: `
        Dear ${name},

        Thank you for your order from Bsquare! Here are your order details:

        Order Items:
        ${cartDetails}

        Total: ₦${totalPrice.toLocaleString()}

        We will deliver to:
        ${location}

        If you have any questions, feel free to contact us.

        Best regards,
        Bsquare Team
      `,
    };

    console.log('Sending admin email with options:', adminMailOptions);
    await transporter.sendMail(adminMailOptions);
    console.log('Admin email sent successfully');

    console.log('Sending user confirmation email with options:', userMailOptions);
    await transporter.sendMail(userMailOptions);
    console.log('User confirmation email sent successfully');

    res.status(200).json({ message: 'Order placed successfully! You will receive a confirmation email soon.' });
  } catch (error) {
    console.error('❌ Checkout email error:', error.message, error.stack);
    res.status(500).json({ message: 'Failed to process order. Please try again.' });
  }
});

module.exports = router;