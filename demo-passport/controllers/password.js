'use strict';

const bcrypt = require('bcrypt-nodejs');

// Hash mat khau
let generateHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// so sanh mat khau va mat khau da duoc hash 
let isValidPassword = (password, hash) => {
    return bcrypt.compareSync(password, hash);
}

module.exports = { generateHash, isValidPassword };