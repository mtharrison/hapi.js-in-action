'use strict';

const Handlers = require('./handlers');

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
