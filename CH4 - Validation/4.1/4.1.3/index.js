var Joi = require('joi');

var report = {
    station: 'Taipei',
    datetime: new Date('Wed Jul 22 2015 12:00:00 GMT+0000 (GMT)'),
    temperature: 34,
    humidity: 95,
    precipitation: false,
    windDirection: 'E',
};

var schema = {
	station: Joi.string().max(100).required(),
	datetime: Joi.date().required(),
	temperature: Joi.number().min(-100).max(100).required(),
	humidity: Joi.number().min(0).max(100),
	precipitation: Joi.boolean(),
	windDirection: Joi.string()
		.valid(['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'])
};

Joi.assert(report, schema);