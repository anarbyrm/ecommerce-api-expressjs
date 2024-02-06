exports.getProductID = (req, res, next) => {
    const productID = parseInt(req.params.productID);
    if (isNaN(productID)) {
        return res.status(400).json({
            message: 'error',
            detail: 'invalid product ID'
        });
    }
    req.productID = productID;
    next();
}