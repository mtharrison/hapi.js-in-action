var Hapi = require('hapi');

var server = new Hapi.Server();
server.connection({ port: 4000 });

var db = {};

server.register([
    { register: require('./plugins/web') },
    { register: require('./plugins/auth'), options: {
        bell: {
            provider: 'facebook',
            isSecure: false,
            password: '',
            clientId: '',
            clientSecret: ''
        },
        cookies: {
            password: '',
            cookie: 'session',
            isSecure: false
        }
    } },
    { register: require('vision') },
    { register: require('bell') },
    { register: require('hapi-auth-cookie') }
], function (err) {

    if (err) {
        throw err;
    }

    server.start(function () {

        console.log('Started server');
    });
});
