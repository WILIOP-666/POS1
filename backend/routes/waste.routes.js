const express = require('express');
const router = express.Router();
const wasteController = require('../controllers/waste.controller');
const authMiddleware = require('../middleware/auth.middleware');

// Public routes
router.get('/', wasteController.getAllWasteTypes);
router.get('/:id', wasteController.getWasteTypeById);

// Admin only routes
router.post('/', [authMiddleware.verifyToken, authMiddleware.isAdmin], wasteController.createWasteType);
router.put('/:id', [authMiddleware.verifyToken, authMiddleware.isAdmin], wasteController.updateWasteType);
router.delete('/:id', [authMiddleware.verifyToken, authMiddleware.isAdmin], wasteController.deleteWasteType);

module.exports = router;