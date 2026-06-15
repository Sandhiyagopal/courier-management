const express = require('express');
const auth = require('../middleware/authMiddleware');
const role = require('../middleware/roleMiddleware');
const courierController = require('../controllers/courierController');

const router = express.Router();
router.use(auth);
router.use(role('staff'));

router.get('/dashboard-stats', async (req, res) => {
    // similar to admin stats but filtered later
    res.json({ message: 'Staff dashboard' });
});
router.post('/courier', courierController.addCourier);
router.put('/courier/:id/status', courierController.updateStatus);
router.get('/courier/search', courierController.searchCourier);
// Get new couriers (status = 'Booked')
router.get('/new-couriers', staffController.getNewCouriers);

// Delete a courier
router.delete('/courier/:id', staffController.deleteCourier);

// Get courier details by ID (for modal/page)
router.get('/courier/:id', staffController.getCourierById);

module.exports = router;