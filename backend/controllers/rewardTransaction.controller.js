const db = require('../models');
const RewardTransaction = db.RewardTransaction;
const Reward = db.Reward;
const User = db.User;
const { Op } = require('sequelize');

// Get all reward transactions
exports.getAllRewardTransactions = async (req, res) => {
  try {
    const condition = {};
    
    // Filter by date range if specified
    if (req.query.startDate && req.query.endDate) {
      condition.transactionDate = {
        [Op.between]: [new Date(req.query.startDate), new Date(req.query.endDate)]
      };
    }
    
    // Filter by user if specified
    if (req.query.userId) {
      condition.userId = req.query.userId;
    }
    
    // Filter by staff if specified
    if (req.query.staffId) {
      condition.staffId = req.query.staffId;
    }
    
    // Filter by reward if specified
    if (req.query.rewardId) {
      condition.rewardId = req.query.rewardId;
    }
    
    // Filter by status if specified
    if (req.query.status) {
      condition.status = req.query.status;
    }

    const rewardTransactions = await RewardTransaction.findAll({
      where: condition,
      include: [
        {
          model: User,
          as: 'customer',
          attributes: ['id', 'username', 'fullName']
        },
        {
          model: User,
          as: 'staff',
          attributes: ['id', 'username', 'fullName']
        },
        {
          model: Reward,
          as: 'reward'
        }
      ],
      order: [['transactionDate', 'DESC']]
    });

    res.status(200).send(rewardTransactions);
  } catch (error) {
    res.status(500).send({
      message: error.message || 'Terjadi kesalahan saat mengambil data transaksi penukaran.'
    });
  }
};

// Get reward transaction by ID
exports.getRewardTransactionById = async (req, res) => {
  try {
    const rewardTransaction = await RewardTransaction.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: 'customer',
          attributes: ['id', 'username', 'fullName']
        },
        {
          model: User,
          as: 'staff',
          attributes: ['id', 'username', 'fullName']
        },
        {
          model: Reward,
          as: 'reward'
        }
      ]
    });

    if (!rewardTransaction) {
      return res.status(404).send({
        message: 'Transaksi penukaran tidak ditemukan!'
      });
    }

    res.status(200).send(rewardTransaction);
  } catch (error) {
    res.status(500).send({
      message: error.message || 'Terjadi kesalahan saat mengambil data transaksi penukaran.'
    });
  }
};

// Create new reward transaction
exports.createRewardTransaction = async (req, res) => {
  const t = await db.sequelize.transaction();
  
  try {
    // Validate request
    if (!req.body.userId || !req.body.rewardId || req.body.quantity === undefined || req.body.quantity <= 0) {
      return res.status(400).send({
        message: 'Data tidak lengkap! Harap isi semua field yang diperlukan.'
      });
    }

    // Check if user exists
    const user = await User.findOne({
      where: {
        id: req.body.userId,
        role: 'customer',
        isActive: true
      }
    });

    if (!user) {
      return res.status(400).send({
        message: 'Nasabah tidak ditemukan atau tidak aktif!'
      });
    }

    // Check if reward exists and is active
    const reward = await Reward.findOne({
      where: {
        id: req.body.rewardId,
        isActive: true
      }
    });

    if (!reward) {
      return res.status(400).send({
        message: 'Hadiah tidak ditemukan atau tidak aktif!'
      });
    }

    // Check if reward is in stock
    if (reward.stock !== null && reward.stock < req.body.quantity) {
      return res.status(400).send({
        message: 'Stok hadiah tidak mencukupi!'
      });
    }

    // Calculate total points required
    const pointsRequired = reward.pointsRequired * req.body.quantity;

    // Check if user has enough points
    if (user.points < pointsRequired) {
      return res.status(400).send({
        message: 'Poin tidak mencukupi untuk penukaran ini!'
      });
    }

    // Create reward transaction
    const rewardTransaction = await RewardTransaction.create({
      userId: req.body.userId,
      rewardId: req.body.rewardId,
      staffId: req.body.staffId || req.userId, // Current logged in staff/admin or specified staff
      transactionDate: req.body.transactionDate || new Date(),
      pointsSpent: pointsRequired,
      quantity: req.body.quantity,
      status: req.body.status || 'completed',
      notes: req.body.notes || null
    }, { transaction: t });

    // Update user points
    await User.decrement(
      { points: pointsRequired },
      { where: { id: req.body.userId }, transaction: t }
    );

    // Update reward stock if applicable
    if (reward.stock !== null) {
      await Reward.decrement(
        { stock: req.body.quantity },
        { where: { id: req.body.rewardId }, transaction: t }
      );
    }

    // Commit transaction
    await t.commit();

    // Get the created reward transaction with details
    const createdRewardTransaction = await RewardTransaction.findByPk(rewardTransaction.id, {
      include: [
        {
          model: User,
          as: 'customer',
          attributes: ['id', 'username', 'fullName', 'points']
        },
        {
          model: Reward,
          as: 'reward'
        }
      ]
    });

    res.status(201).send({
      message: 'Transaksi penukaran berhasil dibuat!',
      rewardTransaction: createdRewardTransaction
    });
  } catch (error) {
    // Rollback transaction in case of error
    await t.rollback();
    
    res.status(500).send({
      message: error.message || 'Terjadi kesalahan saat membuat transaksi penukaran.'
    });
  }
};

// Update reward transaction status
exports.updateRewardTransactionStatus = async (req, res) => {
  const t = await db.sequelize.transaction();
  
  try {
    const rewardTransactionId = req.params.id;
    const rewardTransaction = await RewardTransaction.findByPk(rewardTransactionId, {
      include: [{
        model: Reward,
        as: 'reward'
      }]
    });

    if (!rewardTransaction) {
      return res.status(404).send({
        message: 'Transaksi penukaran tidak ditemukan!'
      });
    }

    // Only allow status update if current status is not the same as new status
    if (rewardTransaction.status === req.body.status) {
      return res.status(400).send({
        message: `Status transaksi penukaran sudah ${req.body.status}!`
      });
    }

    // If cancelling a completed transaction, add points back to user and restore stock
    if (rewardTransaction.status === 'completed' && req.body.status === 'cancelled') {
      // Add points back to user
      await User.increment(
        { points: rewardTransaction.pointsSpent },
        { where: { id: rewardTransaction.userId }, transaction: t }
      );
      
      // Restore reward stock if applicable
      if (rewardTransaction.reward.stock !== null) {
        await Reward.increment(
          { stock: rewardTransaction.quantity },
          { where: { id: rewardTransaction.rewardId }, transaction: t }
        );
      }
    }
    
    // If completing a cancelled transaction, subtract points from user and reduce stock
    if (rewardTransaction.status === 'cancelled' && req.body.status === 'completed') {
      // Check if user has enough points
      const user = await User.findByPk(rewardTransaction.userId);
      
      if (user.points < rewardTransaction.pointsSpent) {
        return res.status(400).send({
          message: 'Poin nasabah tidak mencukupi untuk menyelesaikan transaksi ini!'
        });
      }
      
      // Check if reward is in stock
      const reward = await Reward.findByPk(rewardTransaction.rewardId);
      if (reward.stock !== null && reward.stock < rewardTransaction.quantity) {
        return res.status(400).send({
          message: 'Stok hadiah tidak mencukupi untuk menyelesaikan transaksi ini!'
        });
      }
      
      // Subtract points from user
      await User.decrement(
        { points: rewardTransaction.pointsSpent },
        { where: { id: rewardTransaction.userId }, transaction: t }
      );
      
      // Reduce reward stock if applicable
      if (reward.stock !== null) {
        await Reward.decrement(
          { stock: rewardTransaction.quantity },
          { where: { id: rewardTransaction.rewardId }, transaction: t }
        );
      }
    }

    // Update transaction status
    await RewardTransaction.update(
      { 
        status: req.body.status,
        notes: req.body.notes || rewardTransaction.notes
      },
      { where: { id: rewardTransactionId }, transaction: t }
    );

    // Commit transaction
    await t.commit();

    res.status(200).send({
      message: 'Status transaksi penukaran berhasil diperbarui!'
    });
  } catch (error) {
    // Rollback transaction in case of error
    await t.rollback();
    
    res.status(500).send({
      message: error.message || 'Terjadi kesalahan saat memperbarui status transaksi penukaran.'
    });
  }
};

// Get reward transaction statistics
exports.getRewardTransactionStats = async (req, res) => {
  try {
    const condition = {};
    
    // Filter by date range if specified
    if (req.query.startDate && req.query.endDate) {
      condition.transactionDate = {
        [Op.between]: [new Date(req.query.startDate), new Date(req.query.endDate)]
      };
    }
    
    // Only count completed transactions
    condition.status = 'completed';

    // Total transactions
    const totalTransactions = await RewardTransaction.count({
      where: condition
    });

    // Total points spent
    const totalPointsSpent = await RewardTransaction.sum('pointsSpent', {
      where: condition
    });

    // Most popular rewards
    const popularRewards = await RewardTransaction.findAll({
      attributes: [
        'rewardId',
        [db.sequelize.fn('SUM', db.sequelize.col('quantity')), 'totalQuantity'],
        [db.sequelize.fn('SUM', db.sequelize.col('pointsSpent')), 'totalPoints']
      ],
      include: [
        {
          model: Reward,
          as: 'reward',
          attributes: ['name', 'category']
        }
      ],
      where: condition,
      group: ['rewardId', 'reward.name', 'reward.category'],
      order: [[db.sequelize.literal('totalQuantity'), 'DESC']],
      limit: 5
    });

    res.status(200).send({
      totalTransactions,
      totalPointsSpent,
      popularRewards
    });
  } catch (error) {
    res.status(500).send({
      message: error.message || 'Terjadi kesalahan saat mengambil statistik transaksi penukaran.'
    });
  }
};