const { Order, OrderItem, CartItem } = require("../models/config");
const sequelize = require("../utils/database");

const createNewOrder = async (req, res) => {
    const t = await sequelize.transaction();

    try {
        const user = req.user;
        const cart = await user.getCart();
        const cartItems = await cart.getProducts();

        if (cartItems.length < 1) {
            return res.status(400).json({
                message: 'error',
                detail: 'cannot create order because cart is empty'
            })
        }

        const existingOrder = await Order.findOne({
            where: {
                userId: user.id,
                completed: false
            }
        })

        if (existingOrder) {
            return res.status(400).json({
                message: 'error',
                detail: `cannot create new order while pending order exists.
                         Please complete that order or cancel it.`
            })
        }

        const order = await Order.create({
            orderTotal: "0.00",
            userId: user.id
        }, { transaction: t });

        const orderItems = [];
        let orderTotal = 0;

        for (let item of cartItems) {
            const quantity = item.cartItem.quantity;
            const productPrice = item.price;
            const totalPrice = quantity * parseFloat(productPrice)

            orderTotal += totalPrice;

            const orderItem = await order.createOrderItem({
                title: item.title,
                quantity: quantity,
                unitPrice: productPrice,
                totalPrice: totalPrice.toFixed(2)
            }, { transaction: t});

            orderItems.push(orderItem);
        }

        order.orderTotal = orderTotal;
        await order.save( { transaction: t} );

        // await CartItem.destroy({
        //     where: { id: [ cartItems.map(item => item.id) ] },
        //     transaction: t
        // })

        await t.commit();

        res.status(201).json({
            message: 'success',
            detail: 'order is created. waiting for payment...'
        })

    } catch (err) {
        await t.rollback();

        res.status(500).json({
            message: 'error',
            detail: err.message
        })
    }
}

// const cancelOrder = (req, res) => {

// }

// const completeOrder = (req, res) => {

// }

const getCompletedOrders = async (req, res) => {
    try {
        const user = req.user;

        const completedOrders = await user.getOrders({
            where: { completed: true }
        });

        res.status(200).json({
            message: 'success',
            data: completedOrders
        })

    } catch (err) {
        res.status(500).json({
            message: 'error',
            detail: err.message 
        })
    }
}

const getPendingOrder = async (req, res) => {
    try {
        const user = req.user;

        let completedOrders = await user.getOrders({
            where: { completed: false }
        });

        let order;
        let orderItems;

        if (completedOrders.length < 1) {
            order = {};
            orderItems = {};
        } else {
            order = completedOrders[0];
            orderItems = await order.getOrderItems();
        }

        res.status(200).json({
            message: 'success',
            data: {
                order: order,
                items: orderItems
            }
        })

    } catch (err) {
        res.status(500).json({
            message: 'error',
            detail: err.message 
        })
    }
}


module.exports = {
    getCompletedOrders,
    getPendingOrder,
    createNewOrder
}