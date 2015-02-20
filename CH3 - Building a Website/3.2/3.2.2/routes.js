var Pages = require('./handlers/pages');
var Assets = require('./handlers/assets');

module.exports = [{
    method: 'GET',
    path: '/{param*}',
    handler: Assets.servePublicDirectory
}];