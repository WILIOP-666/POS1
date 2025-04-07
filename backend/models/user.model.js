module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true
    },
    role: {
      type: DataTypes.ENUM('admin', 'staff', 'customer', 'partner'),
      defaultValue: 'customer'
    },
    points: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    qrCode: {
      type: DataTypes.STRING,
      allowNull: true
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  });

  User.associate = (models) => {
    User.hasMany(models.Transaction, {
      foreignKey: 'userId',
      as: 'transactions'
    });
    
    User.hasMany(models.RewardTransaction, {
      foreignKey: 'userId',
      as: 'rewardTransactions'
    });
  };

  return User;
};