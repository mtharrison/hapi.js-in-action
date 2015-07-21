var Hapi = require('hapi');
var Path = require('path');
var Crypto = require('crypto');

var server = new Hapi.Server();
server.connection({ port: 4000 });

server.route({
    method: 'GET',
    path: '/users',
    handler: function (request, reply) {

        var users = [
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

        var hash = Crypto.createHash('sha1');
        hash.update(JSON.stringify(users));
        var etag = hash.digest('base64');

        var response = reply(users);

        response.etag(etag);
    },
    config: {
        cache: {
            privacy: 'private',
            expiresIn: 86400 * 1000
        }
    }
});

server.start(function () {

    console.log('Server running at:', server.info.uri);
});
