var Hapi = require('hapi');
var Joi = require('joi');
var Path = require('path');

var server = new Hapi.Server();
server.connection({ port: 4000 });

server.register(require('vision'), function (err) {

    server.views({
        engines: {
            hbs: require('handlebars')
        },
        path: Path.join(__dirname, 'views'),
        layoutPath: Path.join(__dirname, 'views/layouts'),
        isCached: false,
        layout: true
    });

    server.route(require('./routes'));

    server.start(function () {

        console.log('Started server at', server.info.uri);
    });
});
