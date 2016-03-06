'use strict';

const Hapi = require('hapi');
const Crypto = require('crypto');

const server = new Hapi.Server();
server.connection({ port: 4000 });

server.route({
    method: 'GET',
    path: '/users',
    handler: function (request, reply) {

        const users = [
            {
                gender: 'female',
                name: {
                    title: 'ms',
                    first: 'manuela',
                    last: 'velasco'
                },
                location: {
                    street: '1969 calle de alberto aguilera',
                    city: 'la coruña',
                    state: 'asturias',
                    zip: '56298'
                }
            }
        ];

        const hash = Crypto.createHash('sha1');
        hash.update(JSON.stringify(users));
        const etag = hash.digest('base64');

        const response = reply(users);

        response.etag(etag);
    },
    config: {
        cache: {
            privacy: 'private',
            expiresIn: 86400 * 1000
        }
    }
});

server.start((err) => {

    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});
