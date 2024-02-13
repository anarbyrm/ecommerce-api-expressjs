const cartItemAddSchema = {
    productID: {
        isNumeric: {
            errorMessage: "productID is have to be an integer"
        },
        notEmpty: {
            errorMessage: "productID is required"
        }
    }
}

const cartItemDeleteSchema = {
    itemID: {
        isNumeric: {
            errorMessage: "itemID is have to be an integer"
        },
        notEmpty: {
            errorMessage: "itemID is required"
        }
    }
}

module.exports = {
    cartItemAddSchema,
    cartItemDeleteSchema
}