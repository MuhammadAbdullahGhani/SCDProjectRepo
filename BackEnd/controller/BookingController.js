const Booking = require('../models/booking');
const mongoose = require('mongoose');

// Get all bookings (for admin view)
const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('student instructor skill')  // Populate all fields
      .select('student instructor skill skillDescription date status createdAt updatedAt');

    // If no bookings are found
    if (!bookings || bookings.length === 0) {
      return res.status(404).json({ message: 'No bookings found' });
    }

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch bookings', error: error.message });
  }
};

// Controller for approving a booking
const approveBooking = async (req, res) => {
  const { bookingId } = req.params;

  try {
    // Convert the string to ObjectId using new mongoose.Types.ObjectId
    const objectId = new mongoose.Types.ObjectId(bookingId);

    // Find the booking and update its status
    const booking = await Booking.findByIdAndUpdate(objectId, {
      status: 'approved',
    }, { new: true });

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json({ message: "Booking approved", booking });
  } catch (error) {
    console.error("Error approving booking:", error);
    res.status(400).json({ message: "Failed to approve booking", error: error.message });
  }
};

// Controller for rejecting a booking
const rejectBooking = async (req, res) => {
  const { bookingId } = req.params;

  try {
    // Convert the string to ObjectId using new mongoose.Types.ObjectId
    const objectId = new mongoose.Types.ObjectId(bookingId);

    // Find the booking and update its status
    const booking = await Booking.findByIdAndUpdate(objectId, {
      status: 'rejected',
    }, { new: true });

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json({ message: "Booking rejected", booking });
  } catch (error) {
    console.error("Error rejecting booking:", error);
    res.status(400).json({ message: "Failed to reject booking", error: error.message });
  }
};

module.exports = { getBookings, approveBooking, rejectBooking };
