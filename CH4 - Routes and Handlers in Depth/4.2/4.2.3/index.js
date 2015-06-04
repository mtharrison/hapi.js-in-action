var AcceptLanguage = require('accept-language');
var Hapi = require('hapi');
var Path = require('path');

var server = new Hapi.Server();
server.connection({ port: 4000 });

server.views({
    engines: {
        hbs: require('handlebars'),
    },
    path: Path.join(__dirname, 'templates')
});

server.route([
    {
        method: 'GET',
        path: '/',
        handler: function (request, reply) {

            var supportedLanguages = ['en', 'fr', 'zh'];
            var defaultLanguage = 'en';
            var templateBasename = 'index';

            // Parse the accept-lang header

            var acceptLangHeader = request.headers['accept-language'];
            var langs = AcceptLanguage.parse(acceptLangHeader);

            // Loop through langs to see if we support any of them

            for (var i = 0; i < langs.length; i++) {
                if (supportedLanguages.indexOf(langs[i].language) !== -1) {
                    return reply.view(templateBasename + '_' + langs[i].language);
                }
            }

            // Otherwise render default language

            reply.view(templateBasename + '_' + defaultLanguage);
        }
    }
]);

server.start(function () {
    console.log('Server started!');
});