const router = require('express').Router();

const registerController = require('../controllers/register');

router.route('/login')
    // .all(middlewares)
    .get(registerController.getRegister)
    .post(registerController.register)
