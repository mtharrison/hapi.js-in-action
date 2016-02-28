'use strict';

const Hapi = require('hapi');

const server = new Hapi.Server();
server.connection({ port: 4000 });

const validUsers = {
    john: 'secret',
    jane: 'topsecret'
};

const validate = function (request, username, password, callback) {

    const err = null;
    let isValid = false;
    let credentials = {};

    if (validUsers[username] && validUsers[username] === password) {
        isValid = true;
        credentials = { username: username };
    }

    callback(err, isValid, credentials);
};

server.register(require('hapi-auth-basic'), (err) => {

    if (err) {
        throw err;
    }

    server.auth.strategy('simple', 'basic', { validateFunc: validate });
    server.route({
        method: 'GET',
        path: '/',
        config: {
            auth: 'simple',
            handler: function (request, reply) {

                reply('Hi ' + request.auth.credentials.username + '!' );
            }
        }
    });

    server.start((err) => {

        if (err) {
            throw err;
        }
        console.log('Server listening at:', server.info.uri);
    });
});
