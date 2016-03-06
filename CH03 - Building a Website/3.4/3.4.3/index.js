'use strict';

const Hapi = require('hapi');

const server = new Hapi.Server();
server.connection({ port: 4000 });

server.bind({
    apiBaseUrl: 'http://localhost:4000/api',
    webBaseUrl: 'http://localhost:4000'
});

server.register([
    require('dindin-api'),
    require('inert'),
    require('vision'),
    require('hapi-auth-cookie')
], (err) => {

    if (err) {
        throw err;
    }

    server.views({
        engines: {
            hbs: require('handlebars')
        },
        relativeTo: __dirname,
        path: './views',
        layoutPath: './views/layout',
        layout: true,
        isCached: false,
        helpersPath: './views/helpers',
        partialsPath: './views/partials'
    });

    server.auth.strategy('session', 'cookie', 'try', {
        password: '70fe4f26ff9bcb5aab079875cadeec09',
        isSecure: false
    });

    server.route(require('./routes'));

    server.start((err) => {

        if (err) {
            throw err;
        }
        console.log('Server listening at:', server.info.uri);
    });
});
