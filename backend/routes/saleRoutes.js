const express = require('express');
const router = express.Router();
const { createSale, getSales } = require('../controllers/saleController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, createSale);
router.get('/', authMiddleware, getSales);

module.exports = router;
