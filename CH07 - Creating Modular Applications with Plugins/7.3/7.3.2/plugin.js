exports.register = function (server, options, next) {

    var greeting = options.greeting;

    server.log('info', 'Loaded plugin with greeting: ' + greeting);

    server.route({
        method: 'GET',
        path: '/greet/{name}',
        handler: function (request, reply) {

            var name = request.params.name;
            request.log('info', 'Just about to greet: ' + name);

            reply(greeting + ' ' + name);
        }
    });

    next();
};

exports.register.attributes = { name: 'simple-plugin' };
