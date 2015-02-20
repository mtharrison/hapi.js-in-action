var Pages = require('./handlers/pages');
var Assets = require('./handlers/assets');

module.exports = [{
	method: 'GET',
	path: '/',
	handler: Pages.home
},{
    method: 'GET',
    path: '/{param*}',
    handler: Assets.servePublicDirectory
}];