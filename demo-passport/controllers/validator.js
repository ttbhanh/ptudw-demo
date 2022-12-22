'use strict';

const { body, validationResult } = require('express-validator');

function showErrorMessageIfAvailable(page) {
    return function (req, res, next) {
        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            errors = errors.array();

            let message = '';
            for (let i = 0; i < errors.length; i++) {
                message += errors[i].msg + "<br/>";
            }

            return res.render(page, { message });
        }

        next();
    }
}

module.exports = { body, showErrorMessageIfAvailable }