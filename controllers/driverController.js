
const User = require('../models/User');

// Update Driver Availability
exports.updateAvailability = async (req, res) => {
  const { available } = req.body;
  try {
    const driver = await User.findById(req.user._id);
    if (!driver || driver.role !== 'Driver') {
      return res.status(404).json({ message: 'Driver not found' });
    }

    driver.available = available;
    await driver.save();

    res.json({ message: 'Availability updated', available: driver.available });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// Get Driver Profile
exports.getDriverProfile = async (req, res) => {
  try {
    const driver = await User.findById(req.user._id).select('-password');
    if (!driver || driver.role !== 'Driver') {
      return res.status(404).json({ message: 'Driver not found' });
    }
    res.json(driver);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// Get Driver Ride History
exports.getRideHistory = async (req, res) => {
  try {
    const rides = await Ride.find({ driver: req.user._id }).populate('rider', 'name email phone');
    res.json(rides);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};
