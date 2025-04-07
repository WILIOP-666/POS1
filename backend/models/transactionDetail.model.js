module.exports = (sequelize, DataTypes) => {
  const TransactionDetail = sequelize.define('TransactionDetail', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    transactionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Transactions',
        key: 'id'
      }
    },
    wasteTypeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'WasteTypes',
        key: 'id'
      }
    },
    weight: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0
    },
    points: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  });

  TransactionDetail.associate = (models) => {
    TransactionDetail.belongsTo(models.Transaction, {
      foreignKey: 'transactionId',
      as: 'transaction'
    });
    
    TransactionDetail.belongsTo(models.WasteType, {
      foreignKey: 'wasteTypeId',
      as: 'wasteType'
    });
  };

  return TransactionDetail;
};