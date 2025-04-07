const db = require('../models');
const User = db.User;
const Transaction = db.Transaction;
const RewardTransaction = db.RewardTransaction;
const bcrypt = require('bcryptjs');
const { Op } = require('sequelize');
// QR Code generator can be added later
// const QRCode = require('qrcode');

// Get all users (admin only)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] },
      where: req.query.role ? { role: req.query.role } : {}
    });

    res.status(200).send(users);
  } catch (error) {
    res.status(500).send({
      message: error.message || 'Terjadi kesalahan saat mengambil data pengguna.'
    });
  }
};

// Get user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
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

// Create new user (admin only)
exports.createUser = async (req, res) => {
  try {
    // Validate request
    if (!req.body.username || !req.body.email || !req.body.password || !req.body.fullName || !req.body.role) {
      return res.status(400).send({
        message: 'Data tidak lengkap! Harap isi semua field yang diperlukan.'
      });
    }

    // Check if username or email already exists
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [
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
      role: req.body.role,
      points: req.body.points || 0,
      isActive: req.body.isActive !== undefined ? req.body.isActive : true
    });

    res.status(201).send({
      message: 'Pengguna berhasil dibuat!',
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
      message: error.message || 'Terjadi kesalahan saat membuat pengguna.'
    });
  }
};

// Update user
exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).send({
        message: 'Pengguna tidak ditemukan!'
      });
    }

    // Check if current user is admin or the user themselves
    const currentUser = await User.findByPk(req.userId);
    if (currentUser.role !== 'admin' && req.userId != userId) {
      return res.status(403).send({
        message: 'Anda tidak memiliki izin untuk mengubah data pengguna ini!'
      });
    }

    // Update user data
    const updateData = {};
    
    if (req.body.fullName) updateData.fullName = req.body.fullName;
    if (req.body.address) updateData.address = req.body.address;
    if (req.body.phone) updateData.phone = req.body.phone;
    
    // Only admin can update these fields
    if (currentUser.role === 'admin') {
      if (req.body.role) updateData.role = req.body.role;
      if (req.body.points !== undefined) updateData.points = req.body.points;
      if (req.body.isActive !== undefined) updateData.isActive = req.body.isActive;
    }
    
    // Update password if provided
    if (req.body.password) {
      updateData.password = bcrypt.hashSync(req.body.password, 8);
    }

    await User.update(updateData, {
      where: { id: userId }
    });

    res.status(200).send({
      message: 'Data pengguna berhasil diperbarui!'
    });
  } catch (error) {
    res.status(500).send({
      message: error.message || 'Terjadi kesalahan saat memperbarui data pengguna.'
    });
  }
};

// Delete user (admin only)
exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).send({
        message: 'Pengguna tidak ditemukan!'
      });
    }

    // Instead of deleting, set isActive to false
    await User.update({ isActive: false }, {
      where: { id: userId }
    });

    res.status(200).send({
      message: 'Pengguna berhasil dinonaktifkan!'
    });
  } catch (error) {
    res.status(500).send({
      message: error.message || 'Terjadi kesalahan saat menghapus pengguna.'
    });
  }
};

// Get user points
exports.getUserPoints = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findByPk(userId, {
      attributes: ['id', 'username', 'fullName', 'points']
    });

    if (!user) {
      return res.status(404).send({
        message: 'Pengguna tidak ditemukan!'
      });
    }

    // Check if current user is admin/staff or the user themselves
    if (req.userId != userId) {
      const currentUser = await User.findByPk(req.userId);
      if (currentUser.role !== 'admin' && currentUser.role !== 'staff') {
        return res.status(403).send({
          message: 'Anda tidak memiliki izin untuk melihat poin pengguna ini!'
        });
      }
    }

    res.status(200).send(user);
  } catch (error) {
    res.status(500).send({
      message: error.message || 'Terjadi kesalahan saat mengambil poin pengguna.'
    });
  }
};

// Get user transactions
exports.getUserTransactions = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).send({
        message: 'Pengguna tidak ditemukan!'
      });
    }

    // Check if current user is admin/staff or the user themselves
    if (req.userId != userId) {
      const currentUser = await User.findByPk(req.userId);
      if (currentUser.role !== 'admin' && currentUser.role !== 'staff') {
        return res.status(403).send({
          message: 'Anda tidak memiliki izin untuk melihat transaksi pengguna ini!'
        });
      }
    }

    // Get waste transactions
    const wasteTransactions = await Transaction.findAll({
      where: { userId: userId },
      include: [
        {
          model: User,
          as: 'staff',
          attributes: ['id', 'username', 'fullName']
        },
        {
          model: TransactionDetail,
          as: 'details',
          include: [
            {
              model: db.WasteType,
              as: 'wasteType'
            }
          ]
        }
      ],
      order: [['transactionDate', 'DESC']]
    });

    // Get reward transactions
    const rewardTransactions = await RewardTransaction.findAll({
      where: { userId: userId },
      include: [
        {
          model: User,
          as: 'staff',
          attributes: ['id', 'username', 'fullName']
        },
        {
          model: db.Reward,
          as: 'reward'
        }
      ],
      order: [['transactionDate', 'DESC']]
    });

    res.status(200).send({
      wasteTransactions,
      rewardTransactions
    });
  } catch (error) {
    res.status(500).send({
      message: error.message || 'Terjadi kesalahan saat mengambil transaksi pengguna.'
    });
  }
};