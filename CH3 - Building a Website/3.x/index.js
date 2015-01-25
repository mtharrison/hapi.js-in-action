var Hapi = require('hapi');
var Path = require('path');

var server = new Hapi.Server();
server.connection({port: 4000});

// View setup

server.views({
    engines: {
        hbs: require('handlebars')
    },
    relativeTo: __dirname,
    path: './views',
    layoutPath: './views/layout',
    layout: true,
    isCached: false,
    partialsPath: './views/partials',
    helpersPath: './views/helpers',
});

server.register([
        {
            register: require('dindin-api')
        },
        {
            register: require('yar'),
            options: {
                cookieOptions: {
                    password: 'password',
                    isSecure: false
                }
            }
        },
    ],
    function (err) {

    if (err) {
        throw err;
    }

    // Register routes

    server.route(require('./routes'));

    // Start server

    server.start(function () {
        console.log('Started server at', server.info.uri);
    });
});