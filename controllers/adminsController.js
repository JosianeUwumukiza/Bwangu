const User = require('../models/User');
const Ride = require('../models/Ride');
const Transaction = require('../models/Transaction');

// Get All Users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// Get All Rides
exports.getAllRides = async (req, res) => {
  try {
    const rides = await Ride.find().populate('rider driver', 'name email phone');
    res.json(rides);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// Get Transactions
exports.getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find().populate('user', 'name email phone');
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// Get Analytics
exports.getAnalytics = async (req, res) => {
  try {
    const rideCount = await Ride.countDocuments();
    const totalRevenue = await Transaction.aggregate([
      { $match: { type: 'Credit' } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);
    const userCount = await User.countDocuments();

    res.json({
      rideCount,
      totalRevenue: totalRevenue[0]?.total || 0,
      userCount
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};
