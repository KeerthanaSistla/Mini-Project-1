const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { register, login } = require('../controllers/authController');

// Auth
router.post('/register', register);
router.post('/login', login);

// ✅ Email Verification
router.get('/verify-email/:token', async (req, res) => {
  const user = await User.findOne({
    emailToken: req.params.token,
    emailTokenExpires: { $gt: Date.now() },
  });

  if (!user) return res.status(400).send('Invalid or expired token.');

  user.isVerified = true;
  user.emailToken = undefined;
  user.emailTokenExpires = undefined;
  await user.save();

  res.redirect(`${process.env.CLIENT_URL}/add-optional-details?email=${user.email}`);
});

// ✅ Optional Details Update
router.patch('/optional-details', async (req, res) => {
  const { email, phoneNumber, telephoneNumber, hobbies, location, occupation } = req.body;
  try {
    const user = await User.findOneAndUpdate(
      { email },
      { phoneNumber, telephoneNumber, hobbies, location, occupation },
      { new: true }
    );
    res.status(200).json({ message: 'Details updated', user });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update details', details: err.message });
  }
});

module.exports = router;
