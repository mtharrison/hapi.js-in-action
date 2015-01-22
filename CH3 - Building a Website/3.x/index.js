var Hapi = require('hapi');
var Path = require('path');

var server = new Hapi.Server();
server.connection({port: 4000});

server.views({
    engines: {
        hbs: require('handlebars')
    },
    path: Path.join(__dirname, 'views'),
    layoutPath: './views/layout',
    layout: true,
    isCached: false,
    partialsPath: './views/partials',
    helpersPath: './views/helpers',
});

server.register(require('dindin-api'),
    function (err) {

    if (err) {
        throw err;
    }

    server.route(require('./routes'));

    server.start(function () {
        console.log('Started server at', server.info.uri);
    });
});