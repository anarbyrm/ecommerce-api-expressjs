const { Router } = require('express');
const { checkSchema, matchedData, validationResult } = require('express-validator');

const Product = require('../models/products');
const { productCreateSchema, productUpdateSchema } = require('../schemas/product');
const { getProductByID } = require('../middlewares/products');

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

router.get('/:productID', getProductByID, (req, res) => {
    const product = req.product;
    res.status(200).json({
        message: 'success',
        data: product
    });
});

router.delete('/:productID', getProductByID, (req, res) => {
    const product = req.product;
    product.destroy()
        .then(() => {
            res.sendStatus(204);
        })
        .catch(() => {
            res.send(500).json({
                message: 'error',
                detail: 'product could be deleted'
            })
        });
});

router.put('/:productID', [checkSchema(productUpdateSchema), getProductByID], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            message: 'error',
            detail: errors.array()
        });
    }
    const data = matchedData(req);

    const product = req.product;
    product.update({ ...product, ...data})
        .then((updatedProduct) => {
            res.status(200).json({
                message: 'success',
                data: updatedProduct
            });
        })
        .catch(() => {
            res.status(500).json({
                message: 'error',
                detail: `product could not be updated`
            });
        });
})

module.exports = router;
