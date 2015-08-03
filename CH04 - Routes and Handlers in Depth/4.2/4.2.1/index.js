var Hapi = require('hapi');
var Path = require('path');

var server = new Hapi.Server();
server.connection({ port: 4000 });

server.views({
    engines: {
        hbs: require('handlebars')
    },
    path: Path.join(__dirname, 'templates')
});

server.route([
    {
        method: 'GET',
        path: '/',
        handler: {
            view: 'index'
        }
    }
]);

server.start(function () {

    console.log('Server started!');
});
