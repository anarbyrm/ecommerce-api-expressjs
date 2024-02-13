const User = require('./users');
const Product = require('./products');
const { Cart, CartItem } = require('./carts');

User.hasOne(Cart);
Product.belongsToMany(Cart, { through: CartItem});
Cart.belongsToMany(Product,{ through: CartItem });
Cart.belongsTo(User);

module.exports = {
    User,
    Product,
    Cart,
    CartItem
}