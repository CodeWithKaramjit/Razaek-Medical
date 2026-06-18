const express = require('express');
const router = express.Router();
const reportController = require('../controllers/report.controller');
const upload = require('../middleware/upload.middleware');
const { authenticate } = require('../middleware/auth.middleware');

router.use(authenticate);

// Handle file upload matching 'report' field name in form-data
router.post('/upload', upload.single('report'), reportController.upload);
router.get('/booking/:bookingId', reportController.getByBooking);

module.exports = router;
