const { DataTypes } = require('sequelize');
const sequlize = require('../../config/databse');
const User = require('./user');


const Order = sequlize.define('Order',{
    id: { type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model: User,
            key: 'id',
        }
    },
    product_id: {type: DataTypes.INTEGER,
        allowNull: false
    },
    quantity: {type: DataTypes.INTEGER,
        allowNull: false
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: sequlize.NOW,
    }
},{
    indexes: [
      { fields: ['user_id'] },
      { fields: ['product_id'] },
    ],
  }
);

module.exports = Order;