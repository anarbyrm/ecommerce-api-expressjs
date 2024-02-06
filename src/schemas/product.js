const productCreateSchema = {
    title: {
        isLength: {
            options: {
                min: 5,
                max: 255
            },
            errorMessage: 'title must be between 5-255 characters long'
        },
        notEmpty: {
            errorMessage: 'title cannot be empty'
        },
        isString: {
            errorMessage: 'title can only contain string type'
        }
    },
    description: {
        notEmpty: {
            errorMessage: 'description cannot be empty'
        },
        isString: {
            errorMessage: 'description can only contain string type'
        }
    },
    price: {
        notEmpty: {
            errorMessage: 'price cannot be empty'
        },
        isDecimal: {
            options: {
                decimal_digits: '2',
                force_decimal: true
            },
            errorMessage: 'price is not a valid'
        },
        isLength: {
            options: {
                min: 1,
                max: 8
            },
            errorMessage: 'price value can be between 1-8 long'
        }
    }
}

module.exports = {
    productCreateSchema,
};
