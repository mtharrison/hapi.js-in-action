'use strict';

const Joi = require('joi');

// String => Number

let numberString = '16';
console.log(typeof numberString);

Joi.validate(numberString, Joi.number(), (err, value) => {

    if (err) {
        throw err;
    }
    console.log(typeof value);
});

// String => Buffer

const string = 'I\'m a string';

Joi.validate(string, Joi.binary(), (err, value) => {

    if (err) {
        throw err;
    }
    console.log(value);
    console.log(value instanceof Buffer);
});

// No convert

numberString = '16';

Joi.validate(numberString, Joi.number(), { convert: false }, (err, value) => {

    if (err) {
        throw err;
    }
});
