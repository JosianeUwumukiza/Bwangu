const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middlewares/authMiddleware');
const {
  requestRide,
  getAvailableRides,
  acceptRide,
  updateRideStatus
} = require('../controllers/rideController');

// @route   POST /api/rides/request
// @desc    Rider requests a ride
router.post('/request', protect, authorize('Rider'), requestRide);

// @route   GET /api/rides/available
// @desc    Driver gets available rides
router.get('/available', protect, authorize('Driver'), getAvailableRides);

// @route   POST /api/rides/accept/:rideId
// @desc    Driver accepts a ride
router.post('/accept/:rideId', protect, authorize('Driver'), acceptRide);

// @route   PATCH /api/rides/status/:rideId
// @desc    Driver updates ride status
router.patch('/status/:rideId', protect, authorize('Driver'), updateRideStatus);

module.exports = router;
