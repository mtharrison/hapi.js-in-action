var Hapi = require('hapi');
var Qs = require('qs');
var Wreck = require('wreck');

var server = new Hapi.Server({
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

var searchReviews = function (query, callback) {

    var baseUrl = 'http://api.nytimes.com/svc/movies/v2/reviews/search.json';
    var queryObj = {
        'api-key': '2d07d4c26378607c5e104ae3164327ff:18:72077307',
        query: query
    };
    var queryUrl = baseUrl + '?' + Qs.stringify(queryObj);

    var options = { json: true };

    Wreck.get(queryUrl, options, function (err, res, payload) {

        callback(err, payload);
    });
};

server.method('reviews', searchReviews, {
    cache: {
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

        var query = request.params.movie;

        server.methods.reviews(query, function (err, reviews) {

            if (err) {
                throw err;
            }

            reply(reviews);
        });
    }
});

server.start(function () {

    console.log('Server running at:', server.info.uri);
});
