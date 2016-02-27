'use strict';

const Hapi = require('hapi');
const Path = require('path');

const server = new Hapi.Server();
server.connection({ port: 4000 });

server.register(require('vision'), (err) => {

    if (err) {
        throw err;
    }

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

    server.start((err) => {

        if (err) {
            throw err;
        }

        console.log('Started server at', server.info.uri);
    });
});
