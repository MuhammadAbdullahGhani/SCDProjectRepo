const express = require('express');
const { getBookings, approveBooking, rejectBooking } = require('../controller/BookingController');
const router = express.Router();

// Route to get all bookings (view bookings for admin)
router.get('/', getBookings);

// Route to approve a booking
router.put('/:id/approve', approveBooking);

// Route to reject a booking
router.put('/:id/reject', rejectBooking);

module.exports = router;
