var Joi = require('joi');

// String => Number

var numberString = "16";
console.log(typeof numberString);

Joi.validate(numberString, Joi.number(), function (err, value) {
    console.log(typeof value);
});

// String => Buffer

var string = "I'm a string";

Joi.validate(string, Joi.binary(), function (err, value) {
        
    console.log(value);
    console.log(value instanceof Buffer);
})

// No convert   

var numberString = "16";

Joi.validate(numberString, Joi.number(), {convert: false}, function (err, value) {
    
    if (err) {
        throw err;
    }
});