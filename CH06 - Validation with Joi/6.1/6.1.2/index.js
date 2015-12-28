'use strict';

const Joi = require('joi');

const schema = Joi.string().min(6).max(10);

const updatePassword = function (password) {

    Joi.assert(password, schema);
    console.log('Validation success!');
};

updatePassword('password');
updatePassword('pass');
