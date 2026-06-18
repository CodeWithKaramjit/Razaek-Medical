const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const { authenticate, authorize } = require('../middleware/auth.middleware');

router.use(authenticate);

// Admin / Coordinator level access
router.get('/bookings', authorize('ADMIN', 'COORDINATOR', 'SUPERADMIN'), adminController.getBookings);
router.get('/patients', authorize('ADMIN', 'COORDINATOR', 'SUPERADMIN'), adminController.getPatients);
router.patch('/bookings/:id/status', authorize('ADMIN', 'COORDINATOR', 'SUPERADMIN'), adminController.updateBookingStatus);

// High-level Admin only access
router.get('/stats', authorize('ADMIN', 'SUPERADMIN'), adminController.getStats);
router.post('/assign-coordinator', authorize('ADMIN', 'SUPERADMIN'), adminController.assignCoordinator);
router.patch('/users/:id/status', authorize('ADMIN', 'SUPERADMIN'), adminController.toggleUserStatus);

module.exports = router;
