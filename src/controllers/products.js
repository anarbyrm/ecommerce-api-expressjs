const { matchedData, validationResult } = require('express-validator');

const Product = require('../models/products');

exports.getAllProducts = (req, res) => {
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
};

exports.createProduct = (req, res) => {
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
};

exports.getSingleProduct = (req, res) => {
    const product = req.product;
    res.status(200).json({
        message: 'success',
        data: product
    });
};

exports.updateProduct = (req, res) => {
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
};

exports.deleteProduct = (req, res) => {
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
};