exports.register = function (server, options, next) {

    server.route({
        method: 'GET',
        path: '/',
        handler: function (request, reply) {

            reply('Welcome home!');
        }
    });

    next();
};

exports.register.attributes = { name: 'my-simple-plugin' };
