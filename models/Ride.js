const mongoose = require('mongoose');

const RideSchema = new mongoose.Schema({
  rider: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  driver: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  pickupLocation: {
    type: { type: String, default: 'Point' },
    coordinates: { type: [Number], required: true } // [longitude, latitude]
  },
  dropoffLocation: {
    type: { type: String, default: 'Point' },
    coordinates: { type: [Number], required: true }
  },
  distance: { type: Number, required: true }, // in kilometers
  fare: { type: Number, required: true }, // in RWF
  status: { type: String, enum: ['Requested', 'Accepted', 'En Route', 'Completed', 'Cancelled'], default: 'Requested' },
  createdAt: { type: Date, default: Date.now }
});

// Create geospatial index
RideSchema.index({ pickupLocation: '2dsphere' });

module.exports = mongoose.model('Ride', RideSchema);
