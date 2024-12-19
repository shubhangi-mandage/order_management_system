const { DataTypes } = require('sequelize');
const sequlize = require('../../config/databse');

const User = sequlize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(100),
    unique: true,
    allowNull: false,
  },
},{
    indexes: [
      { fields: ['email'], unique: true },
    ],
  }
);

module.exports = User;
