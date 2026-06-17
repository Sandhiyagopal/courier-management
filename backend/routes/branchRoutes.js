// backend/routes/branchRoutes.js
const express = require('express');
const branchController = require('../controllers/branchController');
const auth = require('../middleware/authMiddleware');
const role = require('../middleware/roleMiddleware');

const router = express.Router();

// All branch routes require admin authentication and role
router.use(auth);
router.use(role('admin'));

// Get all branches
router.get('/', branchController.getBranches);

// Add a new branch
router.post('/', branchController.addBranch);

// Update a branch by ID
router.put('/:id', branchController.updateBranch);

// Delete a branch by ID
router.delete('/:id', branchController.deleteBranch);

module.exports = router;