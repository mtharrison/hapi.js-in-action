var Hapi = require('hapi');
var Path = require('path');
var AcceptLanguage = require('accept-language');

var server = new Hapi.Server({
    app: {
        i18n: {
            supportedLangs: ['en', 'fr', 'zh'],
            defaultLang: 'en'
        }
    }
});

server.connection({ port: 4000 });

server.views({
    engines: {
        hbs: require('handlebars'),
    },
    path: Path.join(__dirname, 'templates')
});

server.handler('i18n-view', function (route, options) {

    var view = options.view;

    return function (request, reply) {

        var settings = server.settings.app.i18n;

        var langs = AcceptLanguage.parse(request.headers['accept-language']);

        for (var i = 0; i < langs.length; i++) {
            if (settings.supportedLangs.indexOf(langs[i].language) !== -1) {
                return reply.view(view + '_' + langs[i].language);
            }
        }

        reply.view(view + '_' + settings.defaultLang);
    }
});

server.route([
    {
        method: 'GET',
        path: '/',
        handler: {
            'i18n-view': {
                view: 'index',
            }
        }
    }
]);

server.start(function () {
    console.log('Server started!');
});