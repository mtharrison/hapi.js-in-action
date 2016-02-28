'use strict';

const Hapi = require('hapi');

const server = new Hapi.Server();
server.connection({ port: 4000 });

server.register([
    { register: require('./plugins/web') },
    { register: require('./plugins/auth'), options: {
        bell: {
            provider: 'facebook',
            isSecure: false,
            clientId: 'Your Facebook App ID goes here',
            clientSecret: 'Your Facebook App Secret goes here',
            password: 'hapi-auth-cookie'
        },
        cookies: {
            password: 'secret',
            cookie: 'session',
            isSecure: false
        }
    } },
    { register: require('vision') },
    { register: require('bell') },
    { register: require('hapi-auth-cookie') }
], (err) => {

    if (err) {
        throw err;
    }

    server.start((err) => {

        if (err) {
            throw err;
        }
        console.log('Server listening at:', server.info.uri);
    });
});
