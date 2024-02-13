const { CartItem, Product } = require('../models/config');
const sequelize = require('../utils/database')

const { matchedData, validationResult } = require('express-validator');

const addToCart = async (req, res) => {
    const t = await sequelize.transaction();

    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            await t.rollback();

            return res.status(422).json({
                message: 'error',
                detail: errors.array()
            })
        }

        const { productID } = matchedData(req);

        const user = req.user;
        const cart = await user.getCart({ transaction: t });

        const product = await Product.findByPk(productID, { transaction: t });
        
        const [existingItem, created] = await CartItem.findOrCreate({
            where: { cartUuid: cart.uuid, productId: product.id },
            transaction: t
        })

        if (!created) {
            existingItem.quantity += 1;
            await existingItem.save( { transaction: t } );
        }

        await t.commit();

        res.status(200).json({
            message: 'success',
            detail: 'product has been successfully added'
        })

    } catch (err) {
        await t.rollback();

        res.status(500).json({
            message: 'error',
            detail: err
        })
    }
}

const removeFromCart = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(422).json({
                message: 'error',
                detail: errors.array()
            })
        }

        const { itemID } = matchedData(req);

        const cartItem = await CartItem.findByPk(itemID);
        
        await cartItem.destroy();

        res.status(204).json({
            message: 'success',
            detail: 'item has been successfully deleted from cart'
        })

    } catch (err) {
        res.status(500).json({
            message: 'error',
            detail: err
        })
    }
}



module.exports = {
    addToCart,
    removeFromCart
}