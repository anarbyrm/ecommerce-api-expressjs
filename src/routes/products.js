const { Router } = require('express');
const { checkSchema } = require('express-validator');

const { productCreateSchema, productUpdateSchema } = require('../schemas/product');
const { getProductByID } = require('../middlewares/products');
const { isAdmin, verifyToken } = require('../middlewares/users');
const { 
    getAllProducts,
    getSingleProduct,
    createProduct,
    updateProduct,
    deleteProduct
} = require('../controllers/products');

const router = Router();

router.get('/', getAllProducts);

router.post('/',
            [verifyToken, isAdmin, checkSchema(productCreateSchema)],
            createProduct);

router.get('/:productID', getProductByID, getSingleProduct);

router.delete('/:productID',
              [verifyToken, isAdmin, getProductByID],
              deleteProduct);

router.put('/:productID',
          [verifyToken, isAdmin, checkSchema(productUpdateSchema), getProductByID],
          updateProduct);

module.exports = router;
