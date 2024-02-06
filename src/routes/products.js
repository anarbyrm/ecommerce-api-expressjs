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
        .catch((err) => {
            console.log(err);
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
        .catch((err) => {
            console.log(err);
            res.status(400).json({
                message: 'error',
                detail: 'cannot create product'
            });
        });
});

module.exports = router;
