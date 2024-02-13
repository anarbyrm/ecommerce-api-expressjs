const { Router } = require('express');
const { checkSchema } = require('express-validator');

const { addToCart } = require('../controllers/carts');
const { verifyToken } = require('../middlewares/users');
const { cartItemSchema } = require('../schemas/carts');

const router = Router();

router.post('/addItem', verifyToken, checkSchema(cartItemSchema), addToCart);

module.exports = router;