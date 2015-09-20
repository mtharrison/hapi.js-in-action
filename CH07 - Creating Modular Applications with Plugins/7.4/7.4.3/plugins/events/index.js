var EventEmitter = require('events').EventEmitter;

exports.register = function (server, options, next) {

    var emitter = new EventEmitter();
    server.decorate('server', 'events', emitter);
    next();
};

exports.register.attributes = require('./package');
