const { getUserProfile } = require('../controllers/profile');

const router = require('express').Router();


router.route('/user/profile')
    .get(getUserProfile)


module.exports = router;