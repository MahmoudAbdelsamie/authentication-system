exports.getLogin = (req, res, next) => {
    res.render('login', {
        title: 'Login'
    })
}

exports.login = async (req, res, next) => {
    return res.redirect('/api/v1/user/profile')
}