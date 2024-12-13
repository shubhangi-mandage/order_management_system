const User = require('./user');
const Order = require('./order');

User.hasMany(order);
Order.belongsTo(User);

module.exports = {
    User,
    Order
};