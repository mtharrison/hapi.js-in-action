'use strict';

const Hapi = require('hapi');

const server = new Hapi.Server({
    debug: {
        request: ['error'],
        log: ['error']
    }
});

server.connection({ port: 4000 });

server.register([
    { register: require('./plugins/database') },
    { register: require('./plugins/portal') },
    { register: require('./plugins/receive') },
    { register: require('vision') }
], (err) => {

    if (err) {
        throw err;
    }
    server.start((err) => {

        if (err) {
            throw err;
        }
        console.log('Server started at: ' + server.info.uri);
    });
});
