const express = require('express');
const auth = require('../middleware/authMiddleware');
const role = require('../middleware/roleMiddleware');
const adminController = require('../controllers/adminController');
const branchController = require('../controllers/branchController');
const complaintController = require('../controllers/complaintController');
const enquiryController = require('../controllers/enquiryController');
const courierController = require('../controllers/courierController');
const pageController = require('../controllers/pageController');
const reportController = require('../controllers/reportController');

const router = express.Router();
router.use(auth);
router.use(role('admin'));

// Dashboard
router.get('/stats', adminController.getStats);

// Staff management
router.get('/staff', adminController.getStaff);
router.post('/staff', adminController.addStaff);
router.put('/staff/:id', adminController.updateStaff);
router.delete('/staff/:id', adminController.deleteStaff);

// Branch management
router.get('/branches', branchController.getBranches);
router.post('/branches', branchController.addBranch);
router.put('/branches/:id', branchController.updateBranch);
router.delete('/branches/:id', branchController.deleteBranch);

// Couriers
router.get('/couriers', courierController.getAllCouriers);

// Complaints
router.get('/complaints', complaintController.getComplaints);
router.put('/complaints/:id/resolve', complaintController.resolveComplaint);

// Enquiries
router.get('/enquiries', enquiryController.getEnquiries);

// Pages
router.put('/page/:type', pageController.updatePage);

// Reports
router.get('/reports/couriers', reportController.getCourierReport);
router.get('/reports/sales', reportController.getSalesReport);

module.exports = router;