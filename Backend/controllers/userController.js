const User = require('../models/User');

exports.getProfile = async (req, res) => {
  const user = await User.findById(req.userId).select('-password');
  res.json(user);
};

exports.searchUsers = async (req, res) => {
  const query = req.query.q;
  const users = await User.find({ name: new RegExp(query, 'i') }).select('name email phone');
  res.json(users);
};
