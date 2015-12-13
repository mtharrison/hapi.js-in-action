'use strict';

const Hapi = require('hapi');
const Joi = require('joi');
const MongoDb = require('mongodb');

module.exports = function (callback) {

    const server = new Hapi.Server();
    server.connection({ port: 4000 });

    const schema = {
        name: {
            first: Joi.string().required(),
            last: Joi.string().required()
        },
        age: Joi.number().required()
    };

    server.route({
        config: {
            validate: {
                payload: schema
            }
        },
        method: 'POST',
        path: '/user',
        handler: function (request, reply) {

            const db = request.server.app.db;
            const user = request.payload;
            user.createdAt = Date.now();

            db.collection('users').insertOne(user, (err, result) => {

                if (err) {
                    reply(err);
                }

                const document = result.ops[0];
                reply(document);
            });
        }
    });

    const url = 'mongodb://localhost:27017/app';
    MongoDb.MongoClient.connect(url, (err, db) => {

        if (err) {
            return callback(err);
        }

        server.app.db = db;
        callback(null, server);
    });
};
