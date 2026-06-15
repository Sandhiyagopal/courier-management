const express = require('express');
const courierController = require('../controllers/courierController');
const branchController = require('../controllers/branchController');
const complaintController = require('../controllers/complaintController');
const enquiryController = require('../controllers/enquiryController');
const pageController = require('../controllers/pageController');

const router = express.Router();

router.get('/track/:refNumber', courierController.trackCourier);
router.get('/branches', branchController.getBranches);
router.get('/page/:type', pageController.getPage);
router.post('/complaint', complaintController.raiseComplaint);
router.get('/complaint-status/:ticketNo', complaintController.checkComplaintStatus);
router.post('/enquiry', enquiryController.submitEnquiry);

module.exports = router;