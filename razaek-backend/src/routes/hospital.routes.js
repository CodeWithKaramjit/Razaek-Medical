const express = require('express');
const router = express.Router();
const hospitalController = require('../controllers/hospital.controller');
const { authenticate, authorize } = require('../middleware/auth.middleware');

router.get('/', hospitalController.getAll);
router.get('/:id', hospitalController.getById);

// Admin only write routes
router.post('/', authenticate, authorize('ADMIN', 'SUPERADMIN'), hospitalController.create);
router.patch('/:id', authenticate, authorize('ADMIN', 'SUPERADMIN'), hospitalController.update);
router.delete('/:id', authenticate, authorize('ADMIN', 'SUPERADMIN'), hospitalController.remove);

module.exports = router;
