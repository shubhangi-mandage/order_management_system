const express = require('express');
const { createOrder,getUserOrders, getSalesReport } = require('../controllers/orderController');

const router = express.Router();

router.post('/orders',createOrder);
router.get('/orders/:userId',getUserOrders);
router.get('/sales-report',getSalesReport);

module.exports = router;