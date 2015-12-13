'use strict';

const Hapi = require('hapi');

module.exports = function (callback) {

    const server = new Hapi.Server();
    server.connection({ port: 4000 });

    server.register(require('hapi-auth-basic'), (err) => {

        if (err) {
            return callback(err);
        }

        const validate = function (request, username, password, cb) {

            if (username === 'john' && password === 'secret') {
                return cb(null, true, { username: 'john' });
            }
            cb(null, false);
        };

        server.auth.strategy('basic', 'basic', { validateFunc: validate });

        server.route({
            config: {
                auth: 'basic'
            },
            method: 'GET',
            path: '/',
            handler: function (request, reply) {

                reply('hello ' + request.auth.credentials.username);
            }
        });

        server.initialize((err) => {

            if (err) {
                return callback(err);
            }
            callback(null, server);
        });
    });
};
