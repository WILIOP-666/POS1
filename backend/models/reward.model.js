module.exports = (sequelize, DataTypes) => {
  const Reward = sequelize.define('Reward', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    pointsRequired: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    category: {
      type: DataTypes.ENUM('pulsa', 'token_listrik', 'sembako', 'voucher', 'donasi', 'lainnya'),
      defaultValue: 'lainnya'
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    partnerId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Users',
        key: 'id'
      }
    }
  });

  Reward.associate = (models) => {
    Reward.belongsTo(models.User, {
      foreignKey: 'partnerId',
      as: 'partner'
    });
    
    Reward.hasMany(models.RewardTransaction, {
      foreignKey: 'rewardId',
      as: 'rewardTransactions'
    });
  };

  return Reward;
};