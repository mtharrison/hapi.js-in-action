var Hapi = require('hapi');

var server = new Hapi.Server();
server.connection({ port: 4000 });

server.bind({
    apiBaseUrl: 'http://localhost:4000/api',
    webBaseUrl: 'http://localhost:4000'
});

server.register([
    require('dindin-api'),
    require('inert')
], function (err) {

    if (err) {
        throw err;
    }

    server.route(require('./routes'));

    server.start(function () {

        console.log('Started server at', server.info.uri);
    });
});
