const { validationResult, matchedData } = require('express-validator'); 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { User, Cart } = require('../models/config');

const createUser = (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({
            message: 'error',
            detail: errors.array()
        });
    }

    const data = matchedData(req);

    bcrypt.hash(data.password, 10, (err, hpass) => {
        if(!err) {
            data.password = hpass;

            // store user data in db 
            User.create({ ...data })
                .then(user => {
                    Cart.create()
                        .then(cart => {
                            user.setCart(cart);
                            res.status(201).json({
                                message: 'success',
                                data: {
                                    email: user.email,
                                    createdAt: user.createdAt
                                }
                            });
                        })
                        .catch(error => {
                            res.status(500).json({
                                message: 'error',
                                detail: error
                            });
                        });
                })
                .catch(error => {
                    res.status(500).json({
                        message: 'error',
                        detail: error
                    });
                });
        } else {
            res.status(500).json({
                message: 'error',
                detail: err
            });
        }
    });
}

const getToken = (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({
            message: 'error',
            detail: errors.array()
        });
    }

    const data = matchedData(req);

    User.findOne({where: { email: data.email }})
        .then(user => {
            if (user) {
                bcrypt.compare(data.password, user.password, (err, result) => {
                    if (!err) {
                        if (result) {
                            jwt.sign({ email: data.email }, "secretKey", (err, token) => {
                                if (!err){
                                    res.status(200).json({
                                        message: 'success',
                                        detail: {
                                            token: token
                                        }
                                    })
                                }
                            })
                        } else {
                            res.status(400).json({
                                message: 'error',
                                detail: "Email or password is not valid"
                            });
                        }
                    } else {
                        res.status(400).json({
                            message: 'error',
                            detail: err
                        });
                    } 
                })   
            } else {
                res.status(400).json({
                    message: 'error',
                    detail: "Email or password is not valid"
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                message: 'error',
                detail: err
            });
        })
}


module.exports = {
    createUser,
    getToken
}