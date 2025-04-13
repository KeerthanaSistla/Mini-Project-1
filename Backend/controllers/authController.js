const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Token generator
const createToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// ✅ Define password validator properly
const validatePassword = (password) => {
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const hasNoSpaces = /^\S+$/.test(password);
  return hasUpper && hasLower && hasSpecial && hasNoSpaces;
};

// ✅ Register function
exports.register = async (req, res) => {
  try {
    const { username, name, email, password, confirmPassword } = req.body;

    if (!username || !name || !email || !password || !confirmPassword) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match.' });
    }

    if (!validatePassword(password)) {
      return res.status(400).json({
        error: 'Password must include uppercase, lowercase, special character, and no spaces.',
      });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ error: 'Email already in use.' });
    }

    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ error: 'Username already taken.' });
    }

    const newUser = await User.create({ username, name, email, password });
    const token = createToken(newUser);
    
    res.status(201).json({
      message: 'Registration successful!',
      user: { username, name, email },
      token
    });

  } catch (err) {
    res.status(500).json({ error: 'Registration failed.', details: err.message });
  }
};

// ✅ Login function
exports.login = async (req, res) => {
  try {
    const { identifier, password } = req.body;

    if (!identifier || !password) {
      return res.status(400).json({ error: 'Username/email and password are required.' });
    }

    const user = await User.findOne({
      $or: [{ email: identifier }, { username: identifier }],
    });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: 'Invalid username/email or password.' });
    }

    const token = createToken(user);
    
    res.status(200).json({
      message: 'Login successful!',
      user: { username: user.username, name: user.name, email: user.email },
      token
    });

  } catch (err) {
    res.status(500).json({ error: 'Login failed.', details: err.message });
  }
};
