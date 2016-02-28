'use strict';

const Accept = require('accept');
const Hapi = require('hapi');
const Path = require('path');

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
            const langs = Accept.languages(request.headers['accept-language']);

            for (let i = 0; i < langs.length; ++i) {
                if (settings.supportedLangs.indexOf(langs[i]) !== -1) {
                    return reply.view(view + '_' + langs[i]);
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

    server.start((err) => {

        if (err) {
            throw err;
        }
        console.log('Server listening at:', server.info.uri);
    });
});
