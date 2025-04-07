const express = require('express');
const router = express.Router();
const rewardController = require('../controllers/reward.controller');
const rewardTransactionController = require('../controllers/rewardTransaction.controller');
const authMiddleware = require('../middleware/auth.middleware');

// Public routes
router.get('/', rewardController.getAllRewards);
router.get('/:id', rewardController.getRewardById);

// Admin only routes
router.post('/', [authMiddleware.verifyToken, authMiddleware.isAdmin], rewardController.createReward);
router.put('/:id', [authMiddleware.verifyToken, authMiddleware.isAdmin], rewardController.updateReward);
router.delete('/:id', [authMiddleware.verifyToken, authMiddleware.isAdmin], rewardController.deleteReward);

// Admin and partner routes
router.put('/:id/stock', [authMiddleware.verifyToken, authMiddleware.isPartnerOrAdmin], rewardController.updateRewardStock);

// Reward transactions routes
router.get('/transactions', [authMiddleware.verifyToken, authMiddleware.isStaffOrAdmin], rewardTransactionController.getAllRewardTransactions);
router.get('/transactions/stats', [authMiddleware.verifyToken, authMiddleware.isStaffOrAdmin], rewardTransactionController.getRewardTransactionStats);
router.get('/transactions/:id', [authMiddleware.verifyToken, authMiddleware.isStaffOrAdmin], rewardTransactionController.getRewardTransactionById);
router.post('/transactions', [authMiddleware.verifyToken, authMiddleware.isStaffOrAdmin], rewardTransactionController.createRewardTransaction);
router.put('/transactions/:id/status', [authMiddleware.verifyToken, authMiddleware.isStaffOrAdmin], rewardTransactionController.updateRewardTransactionStatus);

module.exports = router;