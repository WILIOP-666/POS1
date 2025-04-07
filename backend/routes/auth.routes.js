const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middleware/auth.middleware');

// Public routes
router.post('/register', authController.register);
router.post('/login', authController.login);

// Protected routes
router.get('/me', [authMiddleware.verifyToken], authController.getCurrentUser);
router.post('/change-password', [authMiddleware.verifyToken], authController.changePassword);

module.exports = router;