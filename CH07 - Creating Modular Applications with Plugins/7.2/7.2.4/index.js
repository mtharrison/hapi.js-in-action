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
    {
        register: require('./plugins/database'),
        options: {
            dbName: 'pingoo',
            dbTable: 'pings'
        }
    },
    { register: require('./plugins/portal') },
    { register: require('./plugins/receive') },
    { register: require('vision') }
], (err) => {

    Hoek.assert(!err, err);
    server.start((err) => {

        Hoek.assert(!err, err);
        console.log('Server started at: ' + server.info.uri);
    });
});
