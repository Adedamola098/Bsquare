const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const cors = require('cors');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const emailjs = require('@emailjs/nodejs');

dotenv.config();

// Debug environment variables
console.log('MONGO_URL:', process.env.MONGO_URL);
console.log('EMAILJS_PUBLIC_KEY:', process.env.EMAILJS_PUBLIC_KEY);
console.log('EMAILJS_SERVICE_ID:', process.env.EMAILJS_SERVICE_ID);
console.log('EMAILJS_ADD_TO_CART_TEMPLATE_ID:', process.env.EMAILJS_ADD_TO_CART_TEMPLATE_ID);
console.log('EMAILJS_CHECKOUT_ADMIN_TEMPLATE_ID:', process.env.EMAILJS_CHECKOUT_ADMIN_TEMPLATE_ID);
console.log('EMAILJS_CHECKOUT_USER_TEMPLATE_ID:', process.env.EMAILJS_CHECKOUT_USER_TEMPLATE_ID);

// Initialize EmailJS
if (process.env.EMAILJS_PUBLIC_KEY) {
  emailjs.init(process.env.EMAILJS_PUBLIC_KEY);
  console.log('EmailJS initialized with public key:', process.env.EMAILJS_PUBLIC_KEY);
} else {
  console.error('❌ EmailJS public key is missing');
}

const app = express();

// MongoDB connection
const mongoUrl = process.env.MONGO_URL || 'mongodb+srv://Adedamola:Adedamola123@cluster0.frfdnae.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
console.log('Attempting to connect to MongoDB with URL:', mongoUrl);
mongoose.connect(mongoUrl)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => {
    console.error('❌ MongoDB connection error:', {
      message: err.message,
      name: err.name,
      code: err.code,
    });
  });

// User Schema
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
});
const User = mongoose.model('User', UserSchema);

// Order Schema
const OrderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  cartItems: [
    {
      id: Number,
      name: String,
      price: Number,
      quantity: Number,
    },
  ],
  total: { type: Number, required: true },
  name: String,
  number: String,
  email: String,
  location: String,
  date: { type: Date, default: Date.now },
});
const Order = mongoose.model('Order', OrderSchema);

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET || 'yourSecretKey',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URL }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, // 1 day
    httpOnly: true,
    sameSite: 'lax',
  },
}));

// Health check route
app.get('/', (req, res) => res.send('✅ Server is up and running!'));

// Signup Route
app.post('/api/signup', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email already exists' });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();
    req.session.userId = user._id;
    res.status(201).json({ message: 'User created' });
  } catch (err) {
    console.error('❌ Signup error:', err);
    res.status(500).json({ message: `Server error during signup: ${err.message}` });
  }
});

// Login Route
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ message: 'Missing email or password' });
    }
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid email or password' });
    if (user.password) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });
    }
    req.session.userId = user._id;
    res.status(200).json({ message: 'Login successful' });
  } catch (err) {
    console.error('❌ Login error:', err);
    res.status(500).json({ message: `Server error during login: ${err.message}` });
  }
});

// User Route
app.get('/api/user', async (req, res) => {
  if (!req.session.userId) return res.status(401).json({ message: 'Unauthorized' });
  try {
    const user = await User.findById(req.session.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ username: user.username, email: user.email });
  } catch (error) {
    console.error('❌ User fetch error:', error);
    res.status(500).json({ message: `Server error: ${error.message}` });
  }
});

// Logout Route
app.post('/api/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('❌ Logout error:', err);
      return res.status(500).json({ message: 'Server error during logout' });
    }
    res.clearCookie('connect.sid');
    res.status(200).json({ message: 'Logged out' });
  });
});

// Reset Password Endpoint
app.post('/api/reset-password', async (req, res) => {
  const { email } = req.body;
  try {
    if (!email) return res.status(400).json({ message: 'Email is required' });
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Email not found' });
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || 'yourSecretKey', { expiresIn: '1h' });
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000;
    await user.save();
    const resetLink = `http://localhost:5173/reset-password/${token}`;
    const params = { resetLink };
    const response = await emailjs.send(
      process.env.EMAILJS_SERVICE_ID,
      process.env.EMAILJS_RESET_PASSWORD_TEMPLATE_ID,
      params
    );
    console.log('Reset password email sent, response:', response);
    res.status(200).json({ message: 'Password reset link sent' });
  } catch (error) {
    console.error('❌ Reset password error:', {
      message: error.message,
      stack: error.stack,
      code: error.code,
      errorDetails: JSON.stringify(error, null, 2),
    });
    res.status(500).json({ message: `Failed to send reset link: ${error.message || 'Unknown error'}` });
  }
});

// Reset Password Validation and Update
app.get('/api/reset-password/:token', async (req, res) => {
  const { token } = req.params;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'yourSecretKey');
    const user = await User.findOne({
      _id: decoded.userId,
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });
    if (!user) return res.status(400).json({ message: 'Invalid or expired token' });
    res.status(200).json({ message: 'Token valid' });
  } catch (error) {
    console.error('❌ Reset password token validation error:', error);
    res.status(400).json({ message: 'Invalid or expired token' });
  }
});

app.post('/api/reset-password/:token', async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  try {
    if (!password) return res.status(400).json({ message: 'Password is required' });
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'yourSecretKey');
    const user = await User.findOne({
      _id: decoded.userId,
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });
    if (!user) return res.status(400).json({ message: 'Invalid or expired token' });
    user.password = await bcrypt.hash(password, 10);
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    await user.save();
    res.status(200).json({ message: 'Password updated' });
  } catch (error) {
    console.error('❌ Reset password update error:', error);
    res.status(500).json({ message: `Invalid or expired token: ${error.message}` });
  }
});

// Add to Cart Email Route
app.post('/api/add-to-cart', async (req, res) => {
  const { email, productName } = req.body;
  try {
    if (!email || !productName) {
      return res.status(400).json({ message: 'Email and product name are required' });
    }
    console.log('Received request for /api/add-to-cart with params:', { email, productName });
    console.log('Using public key:', process.env.EMAILJS_PUBLIC_KEY);
    console.log('Using service ID:', process.env.EMAILJS_SERVICE_ID);
    console.log('Using template ID:', process.env.EMAILJS_ADD_TO_CART_TEMPLATE_ID);
    const params = { email, productName }; // Adjust if template expects different names
    const response = await emailjs.send(
      process.env.EMAILJS_SERVICE_ID,
      process.env.EMAILJS_ADD_TO_CART_TEMPLATE_ID,
      params
    );
    console.log('EmailJS response:', response);
    res.status(200).json({ message: 'Product added to cart email sent' });
  } catch (error) {
    console.error('❌ Add to cart email error:', {
      message: error.message,
      stack: error.stack,
      code: error.code,
      errorDetails: JSON.stringify(error, null, 2),
    });
    res.status(500).json({ message: `Failed to send add to cart email: ${error.message || 'Unknown error'}` });
  }
});

// Checkout Email Route
app.post('/api/checkout', async (req, res) => {
  const { name, number, email, location, cartItems } = req.body;
  if (!req.session.userId) return res.status(401).json({ message: 'Unauthorized' });

  if (!name || !number || !email || !location || !cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
    return res.status(400).json({ message: 'Missing or invalid checkout details' });
  }

  try {
    const cartDetails = cartItems
      .map(item => `${item.name} - ₦${item.price.toLocaleString()} x ${item.quantity} = ₦${(item.price * item.quantity).toLocaleString()}`)
      .join('\n');
    const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const order = new Order({
      userId: req.session.userId,
      cartItems,
      total: totalPrice,
      name,
      number,
      email,
      location,
    });
    await order.save();
    console.log('Order saved successfully:', order._id);

    const adminParams = { name, number, email, location, cartDetails, totalPrice: totalPrice.toLocaleString() };
    console.log('Sending admin email with params:', adminParams);
    console.log('Using public key:', process.env.EMAILJS_PUBLIC_KEY);
    console.log('Using service ID:', process.env.EMAILJS_SERVICE_ID);
    console.log('Using template ID:', process.env.EMAILJS_CHECKOUT_ADMIN_TEMPLATE_ID);
    const adminResponse = await emailjs.send(
      process.env.EMAILJS_SERVICE_ID,
      process.env.EMAILJS_CHECKOUT_ADMIN_TEMPLATE_ID,
      adminParams
    );
    console.log('Admin email sent successfully, response:', adminResponse);

    const userParams = { name, email, location, cartDetails, totalPrice: totalPrice.toLocaleString() };
    console.log('Sending user email with params:', userParams);
    console.log('Using template ID:', process.env.EMAILJS_CHECKOUT_USER_TEMPLATE_ID);
    const userResponse = await emailjs.send(
      process.env.EMAILJS_SERVICE_ID,
      process.env.EMAILJS_CHECKOUT_USER_TEMPLATE_ID,
      userParams
    );
    console.log('User email sent successfully, response:', userResponse);

    res.status(200).json({ message: 'Order placed successfully! You will receive a confirmation email soon.' });
  } catch (error) {
    console.error('❌ Checkout email error:', {
      message: error.message,
      stack: error.stack,
      code: error.code,
      errorDetails: JSON.stringify(error, null, 2),
    });
    res.status(500).json({ message: `Failed to process order: ${error.message || 'Unknown error'}` });
  }
});

// Order History Route
app.get('/api/order-history', async (req, res) => {
  if (!req.session.userId) return res.status(401).json({ message: 'Unauthorized' });
  try {
    const orders = await Order.find({ userId: req.session.userId });
    res.status(200).json(orders);
  } catch (error) {
    console.error('❌ Order history error:', error);
    res.status(500).json({ message: `Failed to fetch order history: ${error.message}` });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));