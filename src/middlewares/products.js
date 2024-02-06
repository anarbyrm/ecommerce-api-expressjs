const Product = require('../models/products');

exports.getProductByID = async (req, res, next) => {
    const productID = parseInt(req.params.productID);
    if (isNaN(productID)) {
        return res.status(400).json({
            message: 'error',
            detail: 'invalid product ID'
        });
    }

    try {
        const product = await Product.findByPk(productID);
        if (!product) {
            throw new Error();
        }
        req.product = product;
        next();
    } catch (err) {
        res.status(404).json({
            message: 'error',
            detail: `product with ID ${productID} not found`
        });
    }
};