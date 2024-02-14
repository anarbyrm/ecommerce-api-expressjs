const User = require('./users');
const Product = require('./products');
const { Cart, CartItem } = require('./carts');
const { Order, Transaction, OrderItem } = require('./orders');

User.hasOne(Cart);
Cart.belongsTo(User);

Product.belongsToMany(Cart, { through: CartItem });
Cart.belongsToMany(Product, { through: CartItem });

User.hasMany(Order);
Order.belongsTo(User);

Order.hasMany(OrderItem);
OrderItem.belongsTo(Order);

User.hasMany(Transaction);
Transaction.belongsTo(User);

Order.hasOne(Transaction);
Transaction.belongsTo(Order);

module.exports = {
    User,
    Product,
    Cart,
    CartItem,
    Order,
    OrderItem,
    Transaction
}