'use strict';

const Hapi = require('hapi');

module.exports = function (callback) {

    const server = new Hapi.Server();
    server.connection({ port: 4000 });

    server.register(require('inert'), (err) => {

        if (err) {
            throw err;
        }

        server.route({
            method: 'GET',
            path: '/',
            handler: {
                file: 'file.txt'
            }
        });

        server.initialize((err) => {

            if (err) {
                throw err;
            }
            callback(null, server);
        });
    });
};
