const Ride = require('../models/Ride');
const User = require('../models/User');
const { initiateDriverPayment } = require('./paymentController');

const { geocodeAddress } = require('../services/geocodingService');

// Request a Ride
exports.requestRide = async (req, res) => {
  const { pickupAddress, dropoffAddress } = req.body;
  try {
    // Geocode addresses to get coordinates
    const pickupCoordinates = await geocodeAddress(pickupAddress);
    const dropoffCoordinates = await geocodeAddress(dropoffAddress);

    // Calculate distance and fare
    const distance = calculateDistance(pickupCoordinates, dropoffCoordinates);
    const fare = distance * 1000; // Example: 1000 RWF per km

    const ride = await Ride.create({
      rider: req.user._id,
      pickupLocation: { coordinates: pickupCoordinates },
      dropoffLocation: { coordinates: dropoffCoordinates },
      distance,
      fare
    });

    res.status(201).json(ride);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// Helper function to calculate distance (Haversine formula)
const calculateDistance = (coords1, coords2) => {
  const toRad = (value) => (value * Math.PI) / 180;
  const [lon1, lat1] = coords1;
  const [lon2, lat2] = coords2;
  const R = 6371; // Radius of the Earth in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return distance.toFixed(2);
};

// Get Available Rides for Drivers
exports.getAvailableRides = async (req, res) => {
  try {
    const rides = await Ride.find({ status: 'Requested' });
    res.json(rides);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// Accept a Ride
exports.acceptRide = async (req, res) => {
  const { rideId } = req.params;
  try {
    const ride = await Ride.findById(rideId);
    if (!ride) {
      return res.status(404).json({ message: 'Ride not found' });
    }
    if (ride.status !== 'Requested') {
      return res.status(400).json({ message: 'Ride already taken' });
    }

    ride.driver = req.user._id;
    ride.status = 'Accepted';
    await ride.save();

    res.json(ride);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// Update Ride Status
exports.updateRideStatus = async (req, res) => {
  const { rideId } = req.params;
  const { status } = req.body;
  try {
    const ride = await Ride.findById(rideId);
    if (!ride) {
      return res.status(404).json({ message: 'Ride not found' });
    }
    if (ride.driver.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this ride' });
    }

    ride.status = status;
    await ride.save();

    // If ride is completed, process payment
    if (status === 'Completed') {
      await processPayment(ride);
    }

    res.json(ride);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// Process Payment after Ride Completion
const processPayment = async (ride) => {
  const rider = await User.findById(ride.rider);
  const driver = await User.findById(ride.driver);

  if (rider.wallet < ride.fare) {
    throw new Error('Insufficient funds');
  }

  rider.wallet -= ride.fare;
  driver.wallet += ride.fare;

  await rider.save();
  await driver.save();

  // Record Transactions
  // Rider Transaction
  await Transaction.create({
    user: rider._id,
    type: 'Debit',
    amount: ride.fare,
    description: `Ride payment for Ride ID: ${ride._id}`
  });

  // Driver Transaction
  await Transaction.create({
    user: driver._id,
    type: 'Credit',
    amount: ride.fare,
    description: `Ride earnings for Ride ID: ${ride._id}`
  });
  // Initiate MoMo Payment to Driver
  const paymentReference = `ride_${ride._id}`;
  await initiateDriverPayment(driver.phone, ride.fare, paymentReference);
};
