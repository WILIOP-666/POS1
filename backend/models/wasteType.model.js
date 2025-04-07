module.exports = (sequelize, DataTypes) => {
  const WasteType = sequelize.define('WasteType', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    pointsPerKg: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0
    },
    pricePerKg: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  });

  WasteType.associate = (models) => {
    WasteType.hasMany(models.TransactionDetail, {
      foreignKey: 'wasteTypeId',
      as: 'transactionDetails'
    });
  };

  return WasteType;
};