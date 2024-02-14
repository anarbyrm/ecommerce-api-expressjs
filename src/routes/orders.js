const { Router } = require('express');
const { getPendingOrder, getCompletedOrders, createNewOrder } = require('../controllers/orders');
const { verifyToken } = require('../middlewares/users');

const router = Router();

router.use(verifyToken);

router.get('/pending', getPendingOrder);
router.get('/completed', getCompletedOrders);
router.post('/', createNewOrder);

module.exports = router;
