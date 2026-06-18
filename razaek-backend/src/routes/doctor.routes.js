const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctor.controller');
const { authenticate, authorize } = require('../middleware/auth.middleware');

router.get('/', doctorController.getAll);
router.get('/:id', doctorController.getById);

// Admin only write routes
router.post('/', authenticate, authorize('ADMIN', 'SUPERADMIN'), doctorController.create);
router.patch('/:id', authenticate, authorize('ADMIN', 'SUPERADMIN'), doctorController.update);
router.delete('/:id', authenticate, authorize('ADMIN', 'SUPERADMIN'), doctorController.remove);

module.exports = router;
