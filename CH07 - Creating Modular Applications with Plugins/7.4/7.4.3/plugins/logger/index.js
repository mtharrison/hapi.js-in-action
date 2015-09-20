exports.register = function (server, options, next) {

    server.events.on('newPing', function (data) {

        server.log('info', 'received a new ping ' + JSON.stringify(data));
    });

    next();
};

exports.register.attributes = require('./package');
