const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');


const CartItem = sequelize.define('item', {
    quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 1
    }
})

const Cart = sequelize.define('cart', {
    uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    }
})

module.exports = {
    CartItem,
    Cart
}