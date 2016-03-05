'use strict';

const Hapi = require('hapi');
const Qs = require('qs');
const Wreck = require('wreck');

const server = new Hapi.Server({
    cache: [
        {
            engine: require('catbox-redis'),
            name: 'redis-cache',
            host: '127.0.0.1',
            port: 6379
        }
    ]
});

server.connection({ port: 4000 });

const searchReviews = function (query, callback) {

    const baseUrl = 'http://api.nytimes.com/svc/movies/v2/reviews/search.json';
    const queryObj = {
        'api-key': process.env.NYT_MOVIE_API_KEY || 'YOUR_API_KEY',
        query: query
    };
    const queryUrl = baseUrl + '?' + Qs.stringify(queryObj);

    const options = { json: true };

    Wreck.get(queryUrl, options, (err, res, payload) => {

        callback(err, payload);
    });
};

server.method('reviews', searchReviews, {
    cache: {
        generateTimeout: 10000,
        expiresIn: 60000,
        staleIn: 10000,
        staleTimeout: 100,
        cache: 'redis-cache',
        segment: 'movies'
    }
});

server.route({
    method: 'GET',
    path: '/movies/{movie}',
    handler: function (request, reply) {

        const query = request.params.movie;

        server.methods.reviews(query, (err, reviews) => {

            if (err) {
                throw err;
            }

            reply(reviews);
        });
    }
});

server.start((err) => {

    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});
