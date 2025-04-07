module.exports = (sequelize, DataTypes) => {
  const RewardTransaction = sequelize.define('RewardTransaction', {
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
    rewardId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Rewards',
        key: 'id'
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    pointsSpent: {
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

  RewardTransaction.associate = (models) => {
    RewardTransaction.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'customer'
    });
    
    RewardTransaction.belongsTo(models.User, {
      foreignKey: 'staffId',
      as: 'staff'
    });
    
    RewardTransaction.belongsTo(models.Reward, {
      foreignKey: 'rewardId',
      as: 'reward'
    });
  };

  return RewardTransaction;
};