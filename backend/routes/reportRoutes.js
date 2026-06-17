const express = require('express');
const reportController = require('../controllers/reportController');
const auth = require('../middleware/authMiddleware');
const role = require('../middleware/roleMiddleware');

const router = express.Router();

// All report routes require admin authentication
router.use(auth);
router.use(role('admin'));

// Courier report between dates
router.get('/couriers', reportController.getCourierReport);

// Request count report (couriers + enquiries + complaints)
router.get('/request-count', reportController.getRequestCount);

// Sales report (total couriers and revenue)
router.get('/sales', reportController.getSalesReport);

module.exports = router;