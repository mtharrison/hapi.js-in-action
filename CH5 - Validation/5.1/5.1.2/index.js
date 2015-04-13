var Joi = require('joi');

var schema = Joi.string().min(6).max(10);

var updatePassword = function (password) {

    Joi.assert(password, schema);
    console.log('Validation success!');
};

updatePassword('password');
updatePassword('pass');