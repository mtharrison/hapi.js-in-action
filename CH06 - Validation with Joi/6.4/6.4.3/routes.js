var Handlers = require('./handlers');
var Joi = require('joi');

module.exports = [{
    method: 'GET',
    path: '/',
    handler: Handlers.form
}, {
    method: 'POST',
    path: '/',
    handler: Handlers.form
}, {
    method: 'GET',
    path: '/success',
    handler: Handlers.success
}];
