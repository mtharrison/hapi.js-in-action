'use strict';

const Hapi = require('hapi');

const server = new Hapi.Server();
server.connection({ port: 4000 });

const plugins = [
    require('inert'),
    require('vision'),
    require('tv')
];

server.register(plugins, (err) => {

    if (err) {
        throw err;
    }
    server.start((err) => {

        if (err) {
            throw err;
        }
        console.log('Started server');
    });
});
