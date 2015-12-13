'use strict';

const Hapi = require('hapi');

const server = new Hapi.Server();
server.connection({ port: 4000 });

server.route([
    {
        config: {
            description: 'The home page route',
            tags: ['web', 'home'],
            notes: ['Remember to add proper functionality']
        },
        method: 'GET',
        path: '/',
        handler: function (request, reply) {

            reply('Hello world!');
        }
    },
    {
        config: {
            description: 'The users page route',
            tags: ['web', 'users'],
            notes: ['Remember to add proper functionality']
        },
        method: 'GET',
        path: '/users',
        handler: function (request, reply) {

            reply('Users page!');
        }
    }
]);

server.start((err) => {

    if (err) {
        throw err;
    }
    console.log('Started server');
});
