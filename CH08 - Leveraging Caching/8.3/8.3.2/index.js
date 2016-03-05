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

const movieCache = server.cache({
    generateFunc: searchReviews,
    generateTimeout: 10000,
    expiresIn: 60000,
    staleIn: 10000,
    staleTimeout: 100,
    cache: 'redis-cache',
    segment: 'movies'
});

server.route({
    method: 'GET',
    path: '/movies/{movie}',
    handler: function (request, reply) {

        const start = Date.now();
        const query = request.params.movie;

        movieCache.get(query, (err, value, cached, report) => {

            console.log('Got reviews for %s in %dms %s %s',
                query,
                Date.now() - start,
                cached ? '(CACHED)' : '',
                cached && cached.isStale ? '(STALE)' : '');

            if (err) {
                throw err;
            }

            reply(value);
        });
    }
});

server.start((err) => {

    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});
