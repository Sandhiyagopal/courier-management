const express = require('express');
const courierController = require('../controllers/courierController');
const auth = require('../middleware/authMiddleware');
const role = require('../middleware/roleMiddleware');

const router = express.Router();

// All courier routes require staff authentication and role
router.use(auth);
router.use(role('staff'));

// Add a new courier booking
router.post('/', courierController.addCourier);

// Get all new couriers (status = 'Booked')
router.get('/new-couriers', courierController.getNewCouriers);

// Search courier by reference number
router.get('/search', courierController.searchCourier);

// Update courier status (with tracking remark)
router.put('/:id/status', courierController.updateStatus);

// Delete a courier by ID
router.delete('/:id', courierController.deleteCourier);

// Get full courier details + tracking history by ID
router.get('/:id', courierController.getCourierById);

module.exports = router;