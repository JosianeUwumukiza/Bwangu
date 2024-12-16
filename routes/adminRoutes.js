const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middlewares/authMiddleware');
const {
  getAllUsers,
  getAllRides,
  getAllTransactions,
  getAnalytics
} = require('../controllers/adminController');

// @route   GET /api/admin/users
// @desc    Get all users
router.get('/users', protect, authorize('Admin'), getAllUsers);

// @route   GET /api/admin/rides
// @desc    Get all rides
router.get('/rides', protect, authorize('Admin'), getAllRides);

// @route   GET /api/admin/transactions
// @desc    Get all transactions
router.get('/transactions', protect, authorize('Admin'), getAllTransactions);

// @route   GET /api/admin/analytics
// @desc    Get analytics data
router.get('/analytics', protect, authorize('Admin'), getAnalytics);

module.exports = router;
