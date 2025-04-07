const db = require('../models');
const WasteType = db.WasteType;

// Get all waste types
exports.getAllWasteTypes = async (req, res) => {
  try {
    const wasteTypes = await WasteType.findAll({
      where: req.query.active === 'true' ? { isActive: true } : {}
    });

    res.status(200).send(wasteTypes);
  } catch (error) {
    res.status(500).send({
      message: error.message || 'Terjadi kesalahan saat mengambil data jenis sampah.'
    });
  }
};

// Get waste type by ID
exports.getWasteTypeById = async (req, res) => {
  try {
    const wasteType = await WasteType.findByPk(req.params.id);

    if (!wasteType) {
      return res.status(404).send({
        message: 'Jenis sampah tidak ditemukan!'
      });
    }

    res.status(200).send(wasteType);
  } catch (error) {
    res.status(500).send({
      message: error.message || 'Terjadi kesalahan saat mengambil data jenis sampah.'
    });
  }
};

// Create new waste type (admin only)
exports.createWasteType = async (req, res) => {
  try {
    // Validate request
    if (!req.body.name || req.body.pointsPerKg === undefined || req.body.pricePerKg === undefined) {
      return res.status(400).send({
        message: 'Data tidak lengkap! Harap isi semua field yang diperlukan.'
      });
    }

    // Check if name already exists
    const existingWasteType = await WasteType.findOne({
      where: { name: req.body.name }
    });

    if (existingWasteType) {
      return res.status(400).send({
        message: 'Nama jenis sampah sudah digunakan!'
      });
    }

    // Create a new waste type
    const wasteType = await WasteType.create({
      name: req.body.name,
      description: req.body.description || null,
      pointsPerKg: req.body.pointsPerKg,
      pricePerKg: req.body.pricePerKg,
      isActive: req.body.isActive !== undefined ? req.body.isActive : true
    });

    res.status(201).send({
      message: 'Jenis sampah berhasil dibuat!',
      wasteType: wasteType
    });
  } catch (error) {
    res.status(500).send({
      message: error.message || 'Terjadi kesalahan saat membuat jenis sampah.'
    });
  }
};

// Update waste type (admin only)
exports.updateWasteType = async (req, res) => {
  try {
    const wasteTypeId = req.params.id;
    const wasteType = await WasteType.findByPk(wasteTypeId);

    if (!wasteType) {
      return res.status(404).send({
        message: 'Jenis sampah tidak ditemukan!'
      });
    }

    // Update waste type data
    const updateData = {};
    
    if (req.body.name) updateData.name = req.body.name;
    if (req.body.description !== undefined) updateData.description = req.body.description;
    if (req.body.pointsPerKg !== undefined) updateData.pointsPerKg = req.body.pointsPerKg;
    if (req.body.pricePerKg !== undefined) updateData.pricePerKg = req.body.pricePerKg;
    if (req.body.isActive !== undefined) updateData.isActive = req.body.isActive;

    await WasteType.update(updateData, {
      where: { id: wasteTypeId }
    });

    res.status(200).send({
      message: 'Data jenis sampah berhasil diperbarui!'
    });
  } catch (error) {
    res.status(500).send({
      message: error.message || 'Terjadi kesalahan saat memperbarui data jenis sampah.'
    });
  }
};

// Delete waste type (admin only)
exports.deleteWasteType = async (req, res) => {
  try {
    const wasteTypeId = req.params.id;
    const wasteType = await WasteType.findByPk(wasteTypeId);

    if (!wasteType) {
      return res.status(404).send({
        message: 'Jenis sampah tidak ditemukan!'
      });
    }

    // Instead of deleting, set isActive to false
    await WasteType.update({ isActive: false }, {
      where: { id: wasteTypeId }
    });

    res.status(200).send({
      message: 'Jenis sampah berhasil dinonaktifkan!'
    });
  } catch (error) {
    res.status(500).send({
      message: error.message || 'Terjadi kesalahan saat menghapus jenis sampah.'
    });
  }
};