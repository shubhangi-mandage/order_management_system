const User = require('./user');
const Order = require('./order');

User.hasMany(Order);
Order.belongsTo(User);

module.exports = {
    User,
    Order
};