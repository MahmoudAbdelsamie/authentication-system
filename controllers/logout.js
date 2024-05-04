exports.logout = (req, res, next) => {
    req.logout(err => {
        if(err) {
            res.status(500).send({
                status: 'error',
                message: 'Error Loging Out...',
                error: err.message
            })
        } else {
            res.redirect('/api/v1/login');
        }
    });
}