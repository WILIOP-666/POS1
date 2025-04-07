module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('Transaction', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    transactionDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    staffId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    totalWeight: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0
    },
    totalPoints: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    status: {
      type: DataTypes.ENUM('pending', 'completed', 'cancelled'),
      defaultValue: 'completed'
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  });

  Transaction.associate = (models) => {
    Transaction.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'customer'
    });
    
    Transaction.belongsTo(models.User, {
      foreignKey: 'staffId',
      as: 'staff'
    });
    
    Transaction.hasMany(models.TransactionDetail, {
      foreignKey: 'transactionId',
      as: 'details'
    });
  };

  return Transaction;
};