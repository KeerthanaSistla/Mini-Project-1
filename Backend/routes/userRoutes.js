const express = require('express');
const router = express.Router();
const { getProfile, searchUsers } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/me', authMiddleware, getProfile);
router.get('/search', authMiddleware, searchUsers);

module.exports = router;
