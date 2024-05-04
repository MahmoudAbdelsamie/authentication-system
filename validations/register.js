const { check } = require('express-validator')


exports.validateUserInput = [
    check('username')
        .isLength({ min: 3})
        .withMessage('Username Must have at least 3 Characters')
        .trim()
        .escape(),
    check('email')
        .isEmail()
        .withMessage('Email is not Valid')
        .normalizeEmail(),
    check('password')
        .isLength({ min: 8, max: 32 })
        .withMessage('Password Length must be between 8-32')
        .isStrongPassword({
            minLowercase: 1,
            minUppercase: 1,
            minSymbols: 1,
            minNumbers: 1
        })
        .withMessage('Password must have at least 1 Lower Character, 1 Upper Character, 1 Number, and 1 Symbol'),
    check('confirmPassword').custom((value, { req }) => {
        if(value !== req.body.password) {
            throw new Error('Password Confirmation Not Correct')
        }
    })
]