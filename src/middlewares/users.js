const jwt = require('jsonwebtoken');

const User = require('../models/users');

const verifyToken = (req, res, next) => {
    if (req.headers?.authorization) {
        const token = req.headers.authorization.split(" ").at(-1);
        jwt.verify(token, "secretKey", (err, data) => {
            if (!err) {
                User.findOne({ where: { email: data.email }})
                    .then(user => {
                        if (!user) {
                            res.status(401).json({
                                message: 'error',
                                detail: 'user is not authenticated'
                            })
                        } else {
                            req.user = user;
                            next();
                        }
                    })
                    .catch(err => {
                        res.status(500).json({
                            message: 'error',
                            detail: err
                        })
                    })
            } else {
                res.status(500).json({
                    message: 'error',
                    detail: err
                })
            }
        })
    }
}

const isAdmin = (req, res, next) => {
    if (!req.user.isAdmin){
        return res.status(403).json({
            message: 'error',
            detail: 'Only users with admin status can access'
        });
    } else {
        next();
    }
}

module.exports = {
    isAdmin,
    verifyToken
}