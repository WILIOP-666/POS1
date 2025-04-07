const jwt = require('jsonwebtoken');
const db = require('../models');
const User = db.User;

// Verify JWT token
verifyToken = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers['authorization'];

  if (!token) {
    return res.status(403).send({
      message: 'Token tidak disediakan!'
    });
  }

  // Remove Bearer prefix if present
  if (token.startsWith('Bearer ')) {
    token = token.slice(7, token.length);
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: 'Tidak terotorisasi!'
      });
    }
    req.userId = decoded.id;
    next();
  });
};

// Check if user is admin
isAdmin = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId);

    if (!user) {
      return res.status(404).send({
        message: 'Pengguna tidak ditemukan!'
      });
    }

    if (user.role !== 'admin') {
      return res.status(403).send({
        message: 'Memerlukan hak akses Admin!'
      });
    }

    next();
  } catch (error) {
    res.status(500).send({
      message: 'Tidak dapat memverifikasi hak akses Admin!'
    });
  }
};

// Check if user is staff or admin
isStaffOrAdmin = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId);

    if (!user) {
      return res.status(404).send({
        message: 'Pengguna tidak ditemukan!'
      });
    }

    if (user.role !== 'staff' && user.role !== 'admin') {
      return res.status(403).send({
        message: 'Memerlukan hak akses Staff atau Admin!'
      });
    }

    next();
  } catch (error) {
    res.status(500).send({
      message: 'Tidak dapat memverifikasi hak akses Staff atau Admin!'
    });
  }
};

// Check if user is partner or admin
isPartnerOrAdmin = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId);

    if (!user) {
      return res.status(404).send({
        message: 'Pengguna tidak ditemukan!'
      });
    }

    if (user.role !== 'partner' && user.role !== 'admin') {
      return res.status(403).send({
        message: 'Memerlukan hak akses Mitra atau Admin!'
      });
    }

    next();
  } catch (error) {
    res.status(500).send({
      message: 'Tidak dapat memverifikasi hak akses Mitra atau Admin!'
    });
  }
};

const authMiddleware = {
  verifyToken,
  isAdmin,
  isStaffOrAdmin,
  isPartnerOrAdmin
};

module.exports = authMiddleware;