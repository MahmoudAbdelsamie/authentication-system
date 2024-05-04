const router = require('express').Router();

const loginController = require('../controllers/login');

router
    .get('/login', loginController.getLogin)
    .post('/login', loginController.login)
