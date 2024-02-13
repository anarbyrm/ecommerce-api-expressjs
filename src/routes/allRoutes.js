const { Router } = require('express');

const productsRouter = require('./products');
const usersRouter = require('./users');
const cartsRouter = require('./carts');

const router = Router();

router.use('/products', productsRouter);
router.use('/auth', usersRouter);
router.use('/cart', cartsRouter);

module.exports = router;
