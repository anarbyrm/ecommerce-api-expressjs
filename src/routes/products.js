const { Router } = require('express');

const Product = require('../models/products');

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
        });
})

module.exports = router;
