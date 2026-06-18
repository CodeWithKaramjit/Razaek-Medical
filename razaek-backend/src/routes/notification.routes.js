const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notification.controller');
const { authenticate } = require('../middleware/auth.middleware');

router.use(authenticate);

router.get('/my', notificationController.getMyNotifications);
router.post('/mark-read', notificationController.markAsRead);

module.exports = router;
