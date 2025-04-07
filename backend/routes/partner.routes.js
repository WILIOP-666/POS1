const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middleware/auth.middleware');

// Get all partners
router.get('/', [authMiddleware.verifyToken], async (req, res) => {
  req.query.role = 'partner';
  return userController.getAllUsers(req, res);
});

// Get partner by ID
router.get('/:id', [authMiddleware.verifyToken], userController.getUserById);

// Admin only routes
router.post('/', [authMiddleware.verifyToken, authMiddleware.isAdmin], async (req, res) => {
  req.body.role = 'partner';
  return userController.createUser(req, res);
});

router.put('/:id', [authMiddleware.verifyToken, authMiddleware.isAdmin], userController.updateUser);
router.delete('/:id', [authMiddleware.verifyToken, authMiddleware.isAdmin], userController.deleteUser);

module.exports = router;