'use strict';

exports.register = function (server, options, next) {

    server.events.on('newPing', (data) => {

        server.log('info', 'received a new ping ' + JSON.stringify(data));
    });

    next();
};

exports.register.attributes = {
    pkg: require('./package')
};
