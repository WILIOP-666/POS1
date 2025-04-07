const db = require('../models');
const Reward = db.Reward;
const User = db.User;
const { Op } = require('sequelize');

// Get all rewards
exports.getAllRewards = async (req, res) => {
  try {
    const condition = {};
    
    // Filter by active status if specified
    if (req.query.active === 'true') {
      condition.isActive = true;
    }
    
    // Filter by category if specified
    if (req.query.category) {
      condition.category = req.query.category;
    }
    
    // Filter by partner if specified
    if (req.query.partnerId) {
      condition.partnerId = req.query.partnerId;
    }
    
    // Filter by available stock if specified
    if (req.query.inStock === 'true') {
      condition.stock = {
        [Op.or]: [
          { [Op.gt]: 0 },
          { [Op.eq]: null } // null means unlimited stock
        ]
      };
    }

    const rewards = await Reward.findAll({
      where: condition,
      include: [
        {
          model: User,
          as: 'partner',
          attributes: ['id', 'username', 'fullName']
        }
      ],
      order: [['pointsRequired', 'ASC']]
    });

    res.status(200).send(rewards);
  } catch (error) {
    res.status(500).send({
      message: error.message || 'Terjadi kesalahan saat mengambil data hadiah.'
    });
  }
};

// Get reward by ID
exports.getRewardById = async (req, res) => {
  try {
    const reward = await Reward.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: 'partner',
          attributes: ['id', 'username', 'fullName']
        }
      ]
    });

    if (!reward) {
      return res.status(404).send({
        message: 'Hadiah tidak ditemukan!'
      });
    }

    res.status(200).send(reward);
  } catch (error) {
    res.status(500).send({
      message: error.message || 'Terjadi kesalahan saat mengambil data hadiah.'
    });
  }
};

// Create new reward (admin only)
exports.createReward = async (req, res) => {
  try {
    // Validate request
    if (!req.body.name || req.body.pointsRequired === undefined) {
      return res.status(400).send({
        message: 'Data tidak lengkap! Harap isi semua field yang diperlukan.'
      });
    }

    // Check if partner exists if specified
    if (req.body.partnerId) {
      const partner = await User.findOne({
        where: {
          id: req.body.partnerId,
          role: 'partner',
          isActive: true
        }
      });

      if (!partner) {
        return res.status(400).send({
          message: 'Mitra tidak ditemukan atau tidak aktif!'
        });
      }
    }

    // Create a new reward
    const reward = await Reward.create({
      name: req.body.name,
      description: req.body.description || null,
      pointsRequired: req.body.pointsRequired,
      stock: req.body.stock !== undefined ? req.body.stock : null,
      category: req.body.category || 'lainnya',
      image: req.body.image || null,
      partnerId: req.body.partnerId || null,
      isActive: req.body.isActive !== undefined ? req.body.isActive : true
    });

    res.status(201).send({
      message: 'Hadiah berhasil dibuat!',
      reward: reward
    });
  } catch (error) {
    res.status(500).send({
      message: error.message || 'Terjadi kesalahan saat membuat hadiah.'
    });
  }
};

// Update reward (admin only)
exports.updateReward = async (req, res) => {
  try {
    const rewardId = req.params.id;
    const reward = await Reward.findByPk(rewardId);

    if (!reward) {
      return res.status(404).send({
        message: 'Hadiah tidak ditemukan!'
      });
    }

    // Check if partner exists if specified
    if (req.body.partnerId) {
      const partner = await User.findOne({
        where: {
          id: req.body.partnerId,
          role: 'partner',
          isActive: true
        }
      });

      if (!partner) {
        return res.status(400).send({
          message: 'Mitra tidak ditemukan atau tidak aktif!'
        });
      }
    }

    // Update reward data
    const updateData = {};
    
    if (req.body.name) updateData.name = req.body.name;
    if (req.body.description !== undefined) updateData.description = req.body.description;
    if (req.body.pointsRequired !== undefined) updateData.pointsRequired = req.body.pointsRequired;
    if (req.body.stock !== undefined) updateData.stock = req.body.stock;
    if (req.body.category) updateData.category = req.body.category;
    if (req.body.image !== undefined) updateData.image = req.body.image;
    if (req.body.partnerId !== undefined) updateData.partnerId = req.body.partnerId;
    if (req.body.isActive !== undefined) updateData.isActive = req.body.isActive;

    await Reward.update(updateData, {
      where: { id: rewardId }
    });

    res.status(200).send({
      message: 'Data hadiah berhasil diperbarui!'
    });
  } catch (error) {
    res.status(500).send({
      message: error.message || 'Terjadi kesalahan saat memperbarui data hadiah.'
    });
  }
};

// Delete reward (admin only)
exports.deleteReward = async (req, res) => {
  try {
    const rewardId = req.params.id;
    const reward = await Reward.findByPk(rewardId);

    if (!reward) {
      return res.status(404).send({
        message: 'Hadiah tidak ditemukan!'
      });
    }

    // Instead of deleting, set isActive to false
    await Reward.update({ isActive: false }, {
      where: { id: rewardId }
    });

    res.status(200).send({
      message: 'Hadiah berhasil dinonaktifkan!'
    });
  } catch (error) {
    res.status(500).send({
      message: error.message || 'Terjadi kesalahan saat menghapus hadiah.'
    });
  }
};

// Update reward stock (admin or partner)
exports.updateRewardStock = async (req, res) => {
  try {
    const rewardId = req.params.id;
    const reward = await Reward.findByPk(rewardId);

    if (!reward) {
      return res.status(404).send({
        message: 'Hadiah tidak ditemukan!'
      });
    }

    // Check if current user is admin or the partner who owns this reward
    const currentUser = await User.findByPk(req.userId);
    if (currentUser.role !== 'admin' && reward.partnerId !== req.userId) {
      return res.status(403).send({
        message: 'Anda tidak memiliki izin untuk mengubah stok hadiah ini!'
      });
    }

    // Update stock
    if (req.body.stock === undefined) {
      return res.status(400).send({
        message: 'Stok hadiah diperlukan!'
      });
    }

    await Reward.update({ stock: req.body.stock }, {
      where: { id: rewardId }
    });

    res.status(200).send({
      message: 'Stok hadiah berhasil diperbarui!'
    });
  } catch (error) {
    res.status(500).send({
      message: error.message || 'Terjadi kesalahan saat memperbarui stok hadiah.'
    });
  }
};