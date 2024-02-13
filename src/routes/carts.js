const { Router } = require('express');
const { checkSchema } = require('express-validator');

const { addToCart, removeFromCart, getCart } = require('../controllers/carts');
const { verifyToken } = require('../middlewares/users');
const { cartItemAddSchema, cartItemDeleteSchema } = require('../schemas/carts');

const router = Router();


router.get('/', verifyToken, getCart)
router.post('/addItem', verifyToken, checkSchema(cartItemAddSchema), addToCart);
router.post('/removeItem', verifyToken, checkSchema(cartItemDeleteSchema), removeFromCart);

module.exports = router;