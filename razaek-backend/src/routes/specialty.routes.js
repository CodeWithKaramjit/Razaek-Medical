const express = require('express');
const router = express.Router();
const specialtyController = require('../controllers/specialty.controller');
const { authenticate, authorize } = require('../middleware/auth.middleware');

router.get('/', specialtyController.getAll);
router.get('/:id', specialtyController.getById);

// Admin only write routes
router.post('/', authenticate, authorize('ADMIN', 'SUPERADMIN'), specialtyController.create);
router.patch('/:id', authenticate, authorize('ADMIN', 'SUPERADMIN'), specialtyController.update);
router.delete('/:id', authenticate, authorize('ADMIN', 'SUPERADMIN'), specialtyController.remove);

module.exports = router;
