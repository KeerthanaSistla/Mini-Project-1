const express = require('express');
const router = express.Router();
const { getRelations, addOrUpdateRelation } = require('../controllers/relationDataController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, getRelations);
router.post('/', authMiddleware, addOrUpdateRelation);

module.exports = router;
