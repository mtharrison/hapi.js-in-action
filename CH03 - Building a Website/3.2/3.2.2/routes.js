'use strict';

const Assets = require('./handlers/assets');

module.exports = [{
    method: 'GET',
    path: '/{param*}',
    handler: Assets.servePublicDirectory
}];
