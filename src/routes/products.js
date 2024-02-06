const { Router } = require('express');
const { checkSchema, matchedData, validationResult } = require('express-validator');

const Product = require('../models/products');
const { productCreateSchema, productUpdateSchema } = require('../schemas/product');
const { getProductID } = require('../middlewares/products');

const router = Router();

router.get('/', (req, res) => {
    Product.findAll()
        .then((products) => {
            res.status(200).json({
                message: 'success',
                data: products
            });
        })
        .catch(() => {
            res.status(404).json({
                message: 'error',
                detail: 'products not found'
            });
        });
});

router.post('/', checkSchema(productCreateSchema) , (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({
            message: 'error',
            detail: errors.array()
        });
    }

    const data = matchedData(req);
    Product.create({ ...data })
        .then((product) => {
            res.status(201).json({
                message: 'success',
                data: product
            })
        })
        .catch(() => {
            res.status(400).json({
                message: 'error',
                detail: 'cannot create product'
            });
        });
});

router.get('/:productID', getProductID, (req, res) => {
    const productID = req.productID;
    Product.findByPk(productID)
        .then((product) => {
            if (!product) {
                throw new Error();
            }
            res.status(200).json({
                message: 'success',
                data: product
            });
        })
        .catch(() => {
            res.status(404).json({
                message: 'error',
                detail: `product with ID ${productID} not found`
            });
        })
});

router.delete('/:productID', getProductID, (req, res) => {
    const productID = req.productID;
    Product.findByPk(productID)
        .then((product) => {
            if (!product) {
                throw new Error();
            }
            return product.destroy();
        })
        .then(() => {
            res.sendStatus(204);
        })
        .catch(() => {
            res.status(404).json({
                message: 'error',
                detail: `product with ID ${productID} not found`
            });
        })
});

router.put('/:productID', 
            [checkSchema(productUpdateSchema), getProductID],
            (req, res) => {
    const productID = req.productID;
    Product.findByPk(productID)
        .then((product) => {
            if (!product) {
                throw new Error();
            }
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({
                    message: 'error',
                    detail: errors.array()
                });
            }
            const data = matchedData(req);
            return product.update({ ...product, ...data});
        })
        .then((updatedProduct) => {
            res.status(200).json({
                message: 'success',
                data: updatedProduct
            });
        })
        .catch(() => {
            res.status(404).json({
                message: 'error',
                detail: `product with ID ${productID} not found`
            });
        })
})

module.exports = router;
