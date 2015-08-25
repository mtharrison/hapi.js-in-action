exports.register = function (server, options, next) {

    server.ext('onRequest', function (request, reply) {

        request.log('info', request.id);
        reply.continue();
    });

    next();
};

exports.register.attributes = require('./package');
