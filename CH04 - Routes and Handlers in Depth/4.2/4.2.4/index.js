'use strict';

const Hapi = require('hapi');
const Path = require('path');
const AcceptLanguage = require('accept-language');

const server = new Hapi.Server({
    app: {
        i18n: {
            supportedLangs: ['en', 'fr', 'zh'],
            defaultLang: 'en'
        }
    }
});

server.connection({ port: 4000 });

server.register(require('vision'), (err) => {

    if (err) {
        throw err;
    }

    server.views({
        engines: {
            hbs: require('handlebars')
        },
        path: Path.join(__dirname, 'templates')
    });

    server.handler('i18n-view', (route, options) => {

        const view = options.view;

        return function (request, reply) {

            const settings = server.settings.app.i18n;
            const langs = AcceptLanguage.parse(request.headers['accept-language']);

            for (let i = 0; i < langs.length; ++i) {
                if (settings.supportedLangs.indexOf(langs[i].language) !== -1) {
                    return reply.view(view + '_' + langs[i].language);
                }
            }

            reply.view(view + '_' + settings.defaultLang);
        };
    });

    server.route([
        {
            method: 'GET',
            path: '/',
            handler: {
                'i18n-view': {
                    view: 'index'
                }
            }
        }
    ]);

    server.start(() => {

        if (err) {
            throw err;
        }
        console.log('Server started!');
    });
});
