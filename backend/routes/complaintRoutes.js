// backend/routes/complaintRoutes.js
const express = require('express');
const complaintController = require('../controllers/complaintController');
const auth = require('../middleware/authMiddleware');
const role = require('../middleware/roleMiddleware');

const router = express.Router();

// All complaint routes require admin authentication and role
router.use(auth);
router.use(role('admin'));

// Get all complaints
router.get('/', complaintController.getComplaints);

// Resolve a specific complaint
router.put('/:id/resolve', complaintController.resolveComplaint);

module.exports = router;