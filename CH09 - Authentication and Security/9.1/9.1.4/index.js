var Hapi = require('hapi');

var server = new Hapi.Server();
server.connection({ port: 4000 });

var validUsers = {
    john: 'secret',
    jane: 'topsecret'
};

var validate = function (request, username, password, callback) {

    var err = null;
    var isValid = false;
    var credentials = {};

    if (validUsers[username] && validUsers[username] === password) {
        isValid = true;
        credentials = { username: username };
    }

    callback(err, isValid, credentials);
};

server.register(require('hapi-auth-basic'), function (err) {

    server.auth.strategy('simple', 'basic', { validateFunc: validate });
    server.route({
        method: 'GET',
        path: '/',
        config: {
            auth: {
                strategy: 'simple',
                mode: 'try'
            },
            handler: function (request, reply) {

                if (request.auth.isAuthenticated) {
                    return reply('Hi ' + request.auth.credentials.username + '!' );
                }

                reply('Hi guest!');
            }
        }
    });

    server.start(function () {

        console.log('Started server');
    });
});
