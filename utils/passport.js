const passport = require('passport');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt')


const pool = require('../config/database');





passport.serializeUser( (user, done) => {
    return done(null, user.id);
});


passport.deserializeUser( async (id, done) => {
    try {
        const users = await pool.query('SELECT * FROM users WHERE id=$1;', [id]);
        if(users.rowCount < 1) {
            return done(null, false);
        }
        const user = users.rows[0]
        return done(null, user)
    } catch(err) {
        return done(err);
    }
});


passport.use(
    new LocalStrategy(
        { usernameField: "email"},
        async (email, password, done) => {
            try {
                const users = await pool.query("SELECT * FROM users WHERE email=$1;", [email]);
                if(users.rowCount < 1) {
                    return done(null, false)
                }
                const user = users.rows[0];
                const isPasswordMatch = await bcrypt.compare(password, user.password);
                if(!isPasswordMatch) {
                    return done(null, false);
                }
                return done(null, user)
            } catch(err) {
                return done(err);
            }
            
        } 
    )
);

module.exports = passport;