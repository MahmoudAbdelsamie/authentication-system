const router = require('express').Router();


const registerController = require('../controllers/register');
const { validateResult } = require('../middlewares/register');
const { validateUserInput } = require('../validations/register');

router.route('/register')
    .get(registerController.getRegister)
    .post(
        validateUserInput,
        // validateResult,
        registerController.register
    )


module.exports = router;