const db = require('../models');
const Transaction = db.Transaction;
const TransactionDetail = db.TransactionDetail;
const User = db.User;
const WasteType = db.WasteType;
const { Op } = require('sequelize');

// Get all transactions
exports.getAllTransactions = async (req, res) => {
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
    
    // Filter by status if specified
    if (req.query.status) {
      condition.status = req.query.status;
    }

    const transactions = await Transaction.findAll({
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
          model: TransactionDetail,
          as: 'details',
          include: [
            {
              model: WasteType,
              as: 'wasteType'
            }
          ]
        }
      ],
      order: [['transactionDate', 'DESC']]
    });

    res.status(200).send(transactions);
  } catch (error) {
    res.status(500).send({
      message: error.message || 'Terjadi kesalahan saat mengambil data transaksi.'
    });
  }
};

// Get transaction by ID
exports.getTransactionById = async (req, res) => {
  try {
    const transaction = await Transaction.findByPk(req.params.id, {
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
          model: TransactionDetail,
          as: 'details',
          include: [
            {
              model: WasteType,
              as: 'wasteType'
            }
          ]
        }
      ]
    });

    if (!transaction) {
      return res.status(404).send({
        message: 'Transaksi tidak ditemukan!'
      });
    }

    res.status(200).send(transaction);
  } catch (error) {
    res.status(500).send({
      message: error.message || 'Terjadi kesalahan saat mengambil data transaksi.'
    });
  }
};

// Create new transaction
exports.createTransaction = async (req, res) => {
  const t = await db.sequelize.transaction();
  
  try {
    // Validate request
    if (!req.body.userId || !req.body.details || !Array.isArray(req.body.details) || req.body.details.length === 0) {
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

    // Calculate total weight and points
    let totalWeight = 0;
    let totalPoints = 0;
    
    // Validate and calculate for each waste type
    for (const detail of req.body.details) {
      if (!detail.wasteTypeId || detail.weight === undefined || detail.weight <= 0) {
        return res.status(400).send({
          message: 'Data detail transaksi tidak valid!'
        });
      }
      
      const wasteType = await WasteType.findOne({
        where: {
          id: detail.wasteTypeId,
          isActive: true
        }
      });
      
      if (!wasteType) {
        return res.status(400).send({
          message: `Jenis sampah dengan ID ${detail.wasteTypeId} tidak ditemukan atau tidak aktif!`
        });
      }
      
      totalWeight += parseFloat(detail.weight);
      const points = Math.floor(parseFloat(detail.weight) * wasteType.pointsPerKg);
      totalPoints += points;
      
      // Add points to detail for later use
      detail.points = points;
    }

    // Create transaction
    const transaction = await Transaction.create({
      userId: req.body.userId,
      staffId: req.userId, // Current logged in staff/admin
      transactionDate: req.body.transactionDate || new Date(),
      totalWeight: totalWeight,
      totalPoints: totalPoints,
      status: req.body.status || 'completed',
      notes: req.body.notes || null
    }, { transaction: t });

    // Create transaction details
    for (const detail of req.body.details) {
      await TransactionDetail.create({
        transactionId: transaction.id,
        wasteTypeId: detail.wasteTypeId,
        weight: detail.weight,
        points: detail.points
      }, { transaction: t });
    }

    // Update user points
    await User.increment(
      { points: totalPoints },
      { where: { id: req.body.userId }, transaction: t }
    );

    // Commit transaction
    await t.commit();

    // Get the created transaction with details
    const createdTransaction = await Transaction.findByPk(transaction.id, {
      include: [
        {
          model: User,
          as: 'customer',
          attributes: ['id', 'username', 'fullName', 'points']
        },
        {
          model: TransactionDetail,
          as: 'details',
          include: [
            {
              model: WasteType,
              as: 'wasteType'
            }
          ]
        }
      ]
    });

    res.status(201).send({
      message: 'Transaksi berhasil dibuat!',
      transaction: createdTransaction
    });
  } catch (error) {
    // Rollback transaction in case of error
    await t.rollback();
    
    res.status(500).send({
      message: error.message || 'Terjadi kesalahan saat membuat transaksi.'
    });
  }
};

// Update transaction status
exports.updateTransactionStatus = async (req, res) => {
  const t = await db.sequelize.transaction();
  
  try {
    const transactionId = req.params.id;
    const transaction = await Transaction.findByPk(transactionId);

    if (!transaction) {
      return res.status(404).send({
        message: 'Transaksi tidak ditemukan!'
      });
    }

    // Only allow status update if current status is not the same as new status
    if (transaction.status === req.body.status) {
      return res.status(400).send({
        message: `Status transaksi sudah ${req.body.status}!`
      });
    }

    // If cancelling a completed transaction, subtract points from user
    if (transaction.status === 'completed' && req.body.status === 'cancelled') {
      await User.decrement(
        { points: transaction.totalPoints },
        { where: { id: transaction.userId }, transaction: t }
      );
    }
    
    // If completing a cancelled transaction, add points to user
    if (transaction.status === 'cancelled' && req.body.status === 'completed') {
      await User.increment(
        { points: transaction.totalPoints },
        { where: { id: transaction.userId }, transaction: t }
      );
    }

    // Update transaction status
    await Transaction.update(
      { 
        status: req.body.status,
        notes: req.body.notes || transaction.notes
      },
      { where: { id: transactionId }, transaction: t }
    );

    // Commit transaction
    await t.commit();

    res.status(200).send({
      message: 'Status transaksi berhasil diperbarui!'
    });
  } catch (error) {
    // Rollback transaction in case of error
    await t.rollback();
    
    res.status(500).send({
      message: error.message || 'Terjadi kesalahan saat memperbarui status transaksi.'
    });
  }
};

// Get transaction statistics
exports.getTransactionStats = async (req, res) => {
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
    const totalTransactions = await Transaction.count({
      where: condition
    });

    // Total waste collected
    const totalWaste = await Transaction.sum('totalWeight', {
      where: condition
    });

    // Total points awarded
    const totalPoints = await Transaction.sum('totalPoints', {
      where: condition
    });

    // Waste by type
    const wasteByType = await TransactionDetail.findAll({
      attributes: [
        'wasteTypeId',
        [db.sequelize.fn('SUM', db.sequelize.col('weight')), 'totalWeight'],
        [db.sequelize.fn('SUM', db.sequelize.col('points')), 'totalPoints']
      ],
      include: [
        {
          model: Transaction,
          as: 'transaction',
          attributes: [],
          where: condition
        },
        {
          model: WasteType,
          as: 'wasteType',
          attributes: ['name']
        }
      ],
      group: ['wasteTypeId', 'wasteType.name']
    });

    res.status(200).send({
      totalTransactions,
      totalWaste: totalWaste || 0,
      totalPoints: totalPoints || 0,
      wasteByType
    });
  } catch (error) {
    res.status(500).send({
      message: error.message || 'Terjadi kesalahan saat mengambil statistik transaksi.'
    });
  }
};