'use strict';

const Joi = require('joi');

const goodReport = {
    station: 'Taipei',
    datetime: new Date('Wed Jul 22 2015 12:00:00 GMT+0000 (GMT)'),
    temp: 34,
    humidity: 95,
    precipitation: false,
    windDirection: 'E'
};

const badReport = {
    station: 'Taipei',
    datetime: new Date('Wed Jul 22 2015 12:00:00 GMT+0000 (GMT)'),
    temp: 34,
    humidity: 95,
    precipitation: false,
    windDirection: 'WE'     //Invalid
};

const schema = {
    station: Joi.string().max(100).required(),
    datetime: Joi.date().required(),
    temp: Joi.number().min(-140).max(140).required(),
    humidity: Joi.number().min(0).max(100),
    precipitation: Joi.boolean(),
    windDirection: Joi.string()
        .valid(['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'])
};

Joi.assert(goodReport, schema);
Joi.assert(badReport, schema);
