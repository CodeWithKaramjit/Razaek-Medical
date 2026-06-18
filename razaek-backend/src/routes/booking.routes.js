const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/booking.controller');
const { authenticate } = require('../middleware/auth.middleware');

router.use(authenticate);

router.post('/', bookingController.create);
router.get('/my', bookingController.getMyBookings);
router.get('/:id', bookingController.getById);

module.exports = router;
