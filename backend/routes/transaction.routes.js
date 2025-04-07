const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transaction.controller');
const authMiddleware = require('../middleware/auth.middleware');

// Protected routes - Staff and Admin only
router.get('/', [authMiddleware.verifyToken, authMiddleware.isStaffOrAdmin], transactionController.getAllTransactions);
router.get('/stats', [authMiddleware.verifyToken, authMiddleware.isStaffOrAdmin], transactionController.getTransactionStats);
router.get('/:id', [authMiddleware.verifyToken, authMiddleware.isStaffOrAdmin], transactionController.getTransactionById);
router.post('/', [authMiddleware.verifyToken, authMiddleware.isStaffOrAdmin], transactionController.createTransaction);
router.put('/:id/status', [authMiddleware.verifyToken, authMiddleware.isStaffOrAdmin], transactionController.updateTransactionStatus);

module.exports = router;