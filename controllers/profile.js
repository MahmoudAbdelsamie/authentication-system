exports.getUserProfile = async (req, res, next) => {
    if(!req.user) {
        return res.status(403).send({
            status: 'fail',
            message: 'Forbidden! You Are not Allowed to access this resources'
        })
    } else {
        res.render('profile', {
            title: `${req.user.username} Profile Page`,
            user: req.user
        })
    }
}