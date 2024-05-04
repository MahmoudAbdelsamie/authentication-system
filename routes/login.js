const router = require('express').Router();
const passport = require('passport');

const loginController = require('../controllers/login');

router.route('/login')
    .get(loginController.getLogin)
    .post(
        passport.authenticate("local", {
            failureMessage: "Invalid Email Or Password"
        }),
        loginController.login
    )


module.exports = router;