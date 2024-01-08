const express = require('express');
const bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sequelize = require('./config/dbconfig.js');
const User = require('./dbmodel.js')

const app = express();
const JWT_SECRET = "mhmoudSecert";

app.use(bodyParser.json()) 
app.use(bodyParser.urlencoded({ extended: true }))


sequelize
// .sync({force: true})
// .sync({ alter: true })
.sync()
.then( () => {
    console.log('Database Connected...')
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`App is listening on port ${PORT}`)
    })
})
.catch((error) => { 
    console.log(`Database connection error ${error}`)
})

// Authentication middleware 
const authenticateToken = (req, res, next) => {
    const token = req.header('Authentication');
    if( !token ) {
        return res.status(401).json({status_code: 403, message: 'Forbidden'});
    }
    req.user = {};
    next();
}


// Registration endpoint 

app.post('/register', [
    check('name').notEmpty().withMessage("name is required").isString().withMessage("name must be string"),
    check('email').isEmail().withMessage('Email must be valid'),
    check('password').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).withMessage('Password must be at least 8 characters, and must contain at least\n 1 Special character\n 1 capital letter\n 1 small letter\n 1 number'),
    check('confirmPassword').custom((value, { req }) => {
        if( value !== req.body.password ) {
            throw new Error('Password confirmation does not match passowrd');
        }
        return true;
    }),
], async (req, res) => {
    const errors = validationResult(req);

    if( !errors.isEmpty() ) {
        return res.status(400).json({ status_code: 400, message: 'Bad Request', errors: errors.array() });
    }
    try {
        const { name, email, password } = req.body;
        await bcrypt.hash(password, 10).then( async (hashedPassword) => {
            const user = User.create( { name, email, password: hashedPassword });
            // await user.save();
            res.status(201).json({
                status_code: 201,
                message: 'Registeration successful',
                data: { user_id: user.id, user_email: user.email },
            });
        })

    } catch(error) {
        console.log(error);
        res.status(500).json({status_code: 501, message: error.message, data: null});
    }
});


