'use strict';

const Accept = require('accept');
const Hapi = require('hapi');
const Path = require('path');

const server = new Hapi.Server();
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

    server.route([
        {
            method: 'GET',
            path: '/',
            handler: function (request, reply) {

                const supportedLanguages = ['en', 'fr', 'zh'];
                const defaultLanguage = 'en';
                const templateBasename = 'index';

                // Parse the accept-lang header

                const langs = Accept.languages(request.headers['accept-language']);

                // Loop through langs to see if we support any of them

                for (let i = 0; i < langs.length; ++i) {
                    if (supportedLanguages.indexOf(langs[i]) !== -1) {
                        return reply.view(templateBasename + '_' + langs[i]);
                    }
                }

                // Otherwise render default language

                reply.view(templateBasename + '_' + defaultLanguage);
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
