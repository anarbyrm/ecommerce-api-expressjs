const cartItemSchema = {
    productID: {
        isNumeric: {
            errorMessage: "productID is have to be an integer"
        },
        notEmpty: {
            errorMessage: "productID is required"
        }
    }
}

module.exports = {
    cartItemSchema,
}