const User = require('../models/User');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

// Token generator
const createToken = (user) => jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

// ✅ Email sender function
const sendVerificationEmail = async (email, token) => {
  const verificationURL = `${process.env.CLIENT_URL}/verify-email/${token}`;

  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    to: email,
    subject: 'Verify your Kinnected account',
    html: `<h2>Welcome to Kinnected!</h2><p>Please verify your email:</p>
           <a href="${verificationURL}">Verify Email</a>`,
  });
};

// ✅ Password validator
const validatePassword = (password) => {
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const hasNoSpaces = /^\S+$/.test(password);
  return hasUpper && hasLower && hasSpecial && hasNoSpaces;
};

// ✅ Register
exports.register = async (req, res) => {
  try {
    const { username, name, email, password, confirmPassword } = req.body;

    if (!username || !name || !email || !password || !confirmPassword)
      return res.status(400).json({ error: 'All fields are required.' });

    if (password !== confirmPassword)
      return res.status(400).json({ error: 'Passwords do not match.' });

    if (!validatePassword(password))
      return res.status(400).json({
        error: 'Password must include uppercase, lowercase, special character, and no spaces.',
      });

    const existingEmail = await User.findOne({ email });
    if (existingEmail) return res.status(400).json({ error: 'Email already in use.' });

    const existingUsername = await User.findOne({ username });
    if (existingUsername) return res.status(400).json({ error: 'Username already taken.' });

    const emailToken = crypto.randomBytes(32).toString('hex');
    const emailTokenExpires = Date.now() + 3600000; // 1 hour

    const newUser = await User.create({
      username,
      name,
      email,
      password,
      emailToken,
      emailTokenExpires,
    });

    await sendVerificationEmail(email, emailToken);

    res.status(201).json({ message: 'Registration successful. Please check your email.' });
  } catch (err) {
    res.status(500).json({ error: 'Registration failed.', details: err.message });
  }
};

// ✅ Login
exports.login = async (req, res) => {
  try {
    const { identifier, password } = req.body;

    if (!identifier || !password)
      return res.status(400).json({ error: 'Username/email and password are required.' });

    const user = await User.findOne({
      $or: [{ email: identifier }, { username: identifier }],
    });

    if (!user || !(await user.comparePassword(password)))
      return res.status(401).json({ error: 'Invalid username/email or password.' });

    if (!user.isVerified)
      return res.status(403).json({ error: 'Please verify your email before logging in.' });

    const token = createToken(user);

    res.status(200).json({
      message: 'Login successful!',
      user: { username: user.username, name: user.name, email: user.email },
      token,
    });
  } catch (err) {
    res.status(500).json({ error: 'Login failed.', details: err.message });
  }
};
