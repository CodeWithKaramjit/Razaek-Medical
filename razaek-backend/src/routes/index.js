const express = require('express');
const router = express.Router();

const authRoutes = require('./auth.routes');
const specialtyRoutes = require('./specialty.routes');
const hospitalRoutes = require('./hospital.routes');
const doctorRoutes = require('./doctor.routes');
const packageRoutes = require('./package.routes');
const bookingRoutes = require('./booking.routes');
const reportRoutes = require('./report.routes');
const notificationRoutes = require('./notification.routes');
const adminRoutes = require('./admin.routes');

router.use('/auth', authRoutes);
router.use('/specialties', specialtyRoutes);
router.use('/hospitals', hospitalRoutes);
router.use('/doctors', doctorRoutes);
router.use('/packages', packageRoutes);
router.use('/bookings', bookingRoutes);
router.use('/reports', reportRoutes);
router.use('/notifications', notificationRoutes);
router.use('/admin', adminRoutes);

module.exports = router;
