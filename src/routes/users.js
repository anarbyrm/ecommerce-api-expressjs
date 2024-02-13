const { Router } = require('express');
const { checkSchema } = require('express-validator');


const { createUser, getToken } = require('../controllers/users');
const userSchema = require('../schemas/users');

const router = Router();

router.post('/create', checkSchema(userSchema), createUser);
router.post('/token', checkSchema(userSchema), getToken);

module.exports = router;
