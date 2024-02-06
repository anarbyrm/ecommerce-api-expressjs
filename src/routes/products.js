const { Router } = require('express');
const { checkSchema, matchedData, validationResult } = require('express-validator');

const Product = require('../models/products');
const { productCreateSchema } = require('../schemas/product');

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

router.get('/:productID', (req, res) => {
    const productID = parseInt(req.params.productID);
    if (isNaN(productID)) {
        return res.status(400).json({
            message: 'error',
            detail: 'invalid product ID'
        });
    }
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

router.delete('/:productID', (req, res) => {
    const productID = parseInt(req.params.productID);
    if (isNaN(productID)) {
        return res.status(400).json({
            message: 'error',
            detail: 'invalid product ID'
        });
    }
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

module.exports = router;
