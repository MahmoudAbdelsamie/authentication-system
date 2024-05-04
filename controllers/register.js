const bcrypt = require("bcrypt");
const pool = require("../config/database");


exports.getRegister = (req, res, next) => {
    res.render('register', {
        title: 'Register'
    })
}

exports.register = async (req, res, next) => {
    const {
        username,
        email,
        password
    } = req.body;
    const query = 'INSERT INTO users (username, email, password) VALUES ($1, $2, $3);';

    try {
        const isUserExistQuery = 'SELECT * FROM users WHERE email=$1;'
        const user = await pool.query(isUserExistQuery, [email]);
        if(user.rowCount < 1) {
            const saltRounds  = 10;
            const salt = await bcrypt.genSalt(saltRounds);
            const hashedPassword = await bcrypt.hash(password, salt);
            await pool.query(query, [username, email, hashedPassword]);
            return res.status(201).send({
                status: 'success',
                message: 'User Created Successfully...'
            });
            
        } else {
            return res.status(422).send({
                status: 'fail',
                message: 'User With this Email Already Exists, Please Login'
            })
        }
    } catch(err){
        return res.status(500).send({
            status: 'error',
            message: 'Internal Server Error',
            error: err.message
        })
    }
}