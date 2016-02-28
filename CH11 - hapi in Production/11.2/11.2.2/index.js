'use strict';

const Hapi = require('hapi');
const Joi = require('joi');

const server = new Hapi.Server();
server.connection({ port: 4000, host: 'localhost' });

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
            description: 'Create a new product',
            tags: ['web', 'products'],
            notes: ['Remember to add proper functionality'],
            validate: {
                payload: {
                    name: Joi.string().required(),
                    price: Joi.number().required(),
                    sku: Joi.string().required().min(5)
                }
            }
        },
        method: 'POST',
        path: '/products',
        handler: function (request, reply) {

            reply('Made a new product!');
        }
    },
    {
        config: {
            description: 'Fetch a single product',
            tags: ['web', 'products'],
            notes: ['Remember to add proper functionality'],
            validate: {
                params: {
                    id: Joi.number().required()
                },
                query: {
                    page: Joi.number().min(1)
                }
            }
        },
        method: 'POST',
        path: '/products/{id}',
        handler: function (request, reply) {

            reply('Made a new user!');
        }
    },
    {
        config: {
            description: 'Modify a single product',
            tags: ['web', 'products'],
            notes: ['Remember to add proper functionality'],
            validate: {
                payload: {
                    name: Joi.string().required(),
                    price: Joi.number().required(),
                    sku: Joi.string().required().min(5)
                },
                params: {
                    id: Joi.number().required().min(1)
                }
            }
        },
        method: 'PUT',
        path: '/products/{id}',
        handler: function (request, reply) {

            reply('Modified a product!');
        }
    }
]);

server.register([
    require('vision'),
    require('inert'),
    require('lout')
], (err) => {

    if (err) {
        throw err;
    }
    server.start((err) => {

        if (err) {
            throw err;
        }
        console.log('Started server');
    });
});
