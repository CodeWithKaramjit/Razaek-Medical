const express = require('express');
const router = express.Router();
const packageController = require('../controllers/package.controller');
const { authenticate, authorize } = require('../middleware/auth.middleware');

router.get('/', packageController.getAll);
router.get('/:id', packageController.getById);

// Admin only write routes
router.post('/', authenticate, authorize('ADMIN', 'SUPERADMIN'), packageController.create);
router.patch('/:id', authenticate, authorize('ADMIN', 'SUPERADMIN'), packageController.update);
router.delete('/:id', authenticate, authorize('ADMIN', 'SUPERADMIN'), packageController.remove);

module.exports = router;
