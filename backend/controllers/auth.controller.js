const db = require('../models');
const User = db.User;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Register new user
exports.register = async (req, res) => {
  try {
    // Validate request
    if (!req.body.username || !req.body.email || !req.body.password || !req.body.fullName) {
      return res.status(400).send({
        message: 'Data tidak lengkap! Harap isi semua field yang diperlukan.'
      });
    }

    // Check if username or email already exists
    const existingUser = await User.findOne({
      where: {
        [db.Sequelize.Op.or]: [
          { username: req.body.username },
          { email: req.body.email }
        ]
      }
    });

    if (existingUser) {
      return res.status(400).send({
        message: 'Username atau email sudah digunakan!'
      });
    }

    // Create a new user
    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
      fullName: req.body.fullName,
      address: req.body.address || null,
      phone: req.body.phone || null,
      role: 'customer', // Default role for registration
      points: 0,
      isActive: true
    });

    // Generate QR Code for user (can be implemented later)
    // const qrCode = await QRCode.toDataURL(user.id.toString());
    // await User.update({ qrCode: qrCode }, { where: { id: user.id } });

    res.status(201).send({
      message: 'Pendaftaran berhasil!',
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        fullName: user.fullName,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).send({
      message: error.message || 'Terjadi kesalahan saat pendaftaran.'
    });
  }
};

// Login user
exports.login = async (req, res) => {
  try {
    // Validate request
    if (!req.body.username || !req.body.password) {
      return res.status(400).send({
        message: 'Username dan password diperlukan!'
      });
    }

    // Find user by username
    const user = await User.findOne({
      where: {
        username: req.body.username
      }
    });

    if (!user) {
      return res.status(404).send({
        message: 'Username tidak ditemukan!'
      });
    }

    // Check if user is active
    if (!user.isActive) {
      return res.status(403).send({
        message: 'Akun Anda telah dinonaktifkan. Silakan hubungi admin.'
      });
    }

    // Check password
    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!passwordIsValid) {
      return res.status(401).send({
        message: 'Password salah!'
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET,
      {
        expiresIn: parseInt(process.env.JWT_EXPIRES_IN) // in seconds
      }
    );

    res.status(200).send({
      id: user.id,
      username: user.username,
      email: user.email,
      fullName: user.fullName,
      role: user.role,
      points: user.points,
      accessToken: token
    });
  } catch (error) {
    res.status(500).send({
      message: error.message || 'Terjadi kesalahan saat login.'
    });
  }
};

// Get current user info
exports.getCurrentUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.userId, {
      attributes: { exclude: ['password'] }
    });

    if (!user) {
      return res.status(404).send({
        message: 'Pengguna tidak ditemukan!'
      });
    }

    res.status(200).send(user);
  } catch (error) {
    res.status(500).send({
      message: error.message || 'Terjadi kesalahan saat mengambil data pengguna.'
    });
  }
};

// Change password
exports.changePassword = async (req, res) => {
  try {
    // Validate request
    if (!req.body.oldPassword || !req.body.newPassword) {
      return res.status(400).send({
        message: 'Password lama dan baru diperlukan!'
      });
    }

    const user = await User.findByPk(req.userId);

    if (!user) {
      return res.status(404).send({
        message: 'Pengguna tidak ditemukan!'
      });
    }

    // Check old password
    const passwordIsValid = bcrypt.compareSync(
      req.body.oldPassword,
      user.password
    );

    if (!passwordIsValid) {
      return res.status(401).send({
        message: 'Password lama salah!'
      });
    }

    // Update password
    await User.update(
      { password: bcrypt.hashSync(req.body.newPassword, 8) },
      { where: { id: req.userId } }
    );

    res.status(200).send({
      message: 'Password berhasil diubah!'
    });
  } catch (error) {
    res.status(500).send({
      message: error.message || 'Terjadi kesalahan saat mengubah password.'
    });
  }
};