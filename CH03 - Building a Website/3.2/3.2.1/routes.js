'use strict';

const Pages = require('./handlers/pages');

module.exports = [{
    method: 'GET',
    path: '/',
    handler: Pages.home
}];
