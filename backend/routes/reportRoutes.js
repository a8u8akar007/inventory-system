const express = require('express');
const router = express.Router();
const { getDashboardStats } = require('../controllers/reportController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/dashboard', authMiddleware, getDashboardStats);

module.exports = router;
