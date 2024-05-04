const { validationResult } = require('express-validator');

exports.validateResult = async (req, res, next) => {
    const errors = validationResult(req).formatWith(({msg}) => msg);
    if(errors.isEmpty()) {
        next();
    } else {
        return res.status(422).send({
            message: 'Cannot Procced Request',
            error : errors.array()
        })
    }
}