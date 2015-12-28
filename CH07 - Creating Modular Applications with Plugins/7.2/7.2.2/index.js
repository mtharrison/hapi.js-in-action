'use strict';

const Hapi = require('hapi');
const Hoek = require('hoek');

const server = new Hapi.Server({
    debug: {
        request: ['error'],
        log: ['error']
    }
});

server.connection({ port: 4000 });

server.register([
    { register: require('vision') },
    { register: require('./plugins/database') },
    { register: require('./plugins/portal') },
    { register: require('./plugins/receive') }
], (err) => {

    Hoek.assert(!err, err);
    server.start((err) => {

        Hoek.assert(!err, err);
        console.log('Server started at: ' + server.info.uri);
    });
});
