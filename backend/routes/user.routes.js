const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middleware/auth.middleware');

// Admin only routes
router.get('/', [authMiddleware.verifyToken, authMiddleware.isAdmin], userController.getAllUsers);
router.post('/', [authMiddleware.verifyToken, authMiddleware.isAdmin], userController.createUser);
router.delete('/:id', [authMiddleware.verifyToken, authMiddleware.isAdmin], userController.deleteUser);

// Admin and staff routes
router.get('/:id', [authMiddleware.verifyToken, authMiddleware.isStaffOrAdmin], userController.getUserById);
router.get('/:id/points', [authMiddleware.verifyToken, authMiddleware.isStaffOrAdmin], userController.getUserPoints);
router.get('/:id/transactions', [authMiddleware.verifyToken, authMiddleware.isStaffOrAdmin], userController.getUserTransactions);

// User can update their own profile
router.put('/:id', [authMiddleware.verifyToken], userController.updateUser);

module.exports = router;