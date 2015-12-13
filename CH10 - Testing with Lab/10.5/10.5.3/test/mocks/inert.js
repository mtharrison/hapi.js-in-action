exports.register = function (server, options, next) {

    const file = function (route, options) {

        return function (request, reply) {

            reply('proxyquire');
        }
    };

    server.handler('file', file);
    next();
};

exports.register.attributes = { name: 'inert' };
