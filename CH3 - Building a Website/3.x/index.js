var Hapi = require('hapi');

var server = new Hapi.Server();
server.connection({port: 4000});

// View setup

server.views({
    engines: {
        hbs: require('handlebars')
    },
    relativeTo: __dirname,
    path: './views',
    layoutPath: './views/layout',
    layout: true,
    isCached: false,
    partialsPath: './views/partials',
    helpersPath: './views/helpers',
    context: function (request) {
      return {
        credentials: {
          suchAThing: 'Hiii!'
        },
      }
    }
});

server.bind({
    apiBaseUrl: 'http://localhost:4000/api',
    webBaseUrl: 'http://localhost:4000/'
});

// Register plugins

server.register([{
    register: require('dindin-api')
}, {
    register: require('hapi-context-credentials')
}, {
    register: require('yar'),
    options: {
        cookieOptions: {
            password: 'password',
            isSecure: false
        }
    }
}], function (err) {

    if (err) {
        throw err;
    }

    // Add routes

    server.route(require('./routes'));

    // Start server

    server.start(function () {
        console.log('Started server at', server.info.uri);
    });
});