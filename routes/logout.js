const { logout } = require('../controllers/logout');

const router = require('express').Router();

router.post('/logout', logout);

module.exports = router;