const axios = require('axios');
const User = require('../models/User');
const Transaction = require('../models/Transaction');
const { verifyMomoTransaction, initiateMomoPayment } = require('../utils/momo');

// Pre-upload Funds to Wallet
exports.uploadFunds = async (req, res) => {
  const { amount, momoTransactionId, phoneNumber } = req.body;
  try {
    // Verify MTN Mobile Money transaction
    const isValid = await verifyMomoTransaction(momoTransactionId, amount);
    if (!isValid) {
      return res.status(400).json({ message: 'Invalid MTN Mobile Money transaction' });
    }

    // Update user wallet
    req.user.wallet += amount;
    await req.user.save();

    // Record Transaction
    await Transaction.create({
      user: req.user._id,
      type: 'Credit',
      amount,
      description: 'Wallet top-up via MTN Mobile Money'
    });

    res.json({ message: 'Funds added to wallet', wallet: req.user.wallet });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// Initiate Payment to Driver
exports.initiateDriverPayment = async (driverPhoneNumber, amount, reference) => {
  try {
    const paymentResponse = await initiateMomoPayment(driverPhoneNumber, amount, reference);
    return paymentResponse;
  } catch (error) {
    throw new Error('Failed to initiate payment to driver');
  }
};
