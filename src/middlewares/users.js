const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    console.log(req.headers);
    // jwt.verify()
}


const isAuthenticated = (req, res, next) => {
    if (!req.user){
        return res.status(401).json({
            message: 'error',
            detail: 'User have to be authenticated'
        });
    } else {
        next();
    }
}

const isAdmin = (req, res, next) => {
    this.isAuthenticated(req, res, next);

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
    isAuthenticated,
    isAdmin
}