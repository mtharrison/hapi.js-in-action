var Hapi = require('hapi');
var Hoek = require('hoek');

var server = new Hapi.Server({
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
], function (err) {

    Hoek.assert(!err, err);
    server.start(function (err) {

        Hoek.assert(!err, err);
        console.log('Server started at: ' + server.info.uri);
    });
});

