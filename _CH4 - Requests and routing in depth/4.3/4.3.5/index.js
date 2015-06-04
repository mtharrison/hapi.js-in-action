var Hapi = require('hapi');
var Wreck = require('wreck');
var Qs = require('qs');

var server = new Hapi.Server({
    cache: [
        {
            engine: require('catbox-redis'),
            name: 'article-cache',
            host: '127.0.0.1',
            port: 6379
        }
    ]
});
server.connection({ port: 4000 });

var getArticle = function (options, next) {

    var baseUrl = 'http://api.nytimes.com/svc/search/v2/articlesearch.json';
    var url = baseUrl + '?' + Qs.stringify(options);

    Wreck.get(url, { json: true }, function (err, res, payload) {

        if (err) {
            return next(err);
        }

        next(null, payload);
    });
};

server.method('getArticle', getArticle, {
    cache: {
        cache: 'article-cache',
        expiresIn: 5000,
        staleIn: 3000,
        staleTimeout: 100
    },
    generateKey: function (options) {
        return options.q + ':' + options.sort;
    }
});

server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {

        var API_KEY = '6e4deaad56fa6f8bbb47dcc4fa700ba6:5:72077307';

        var options = {
            q: request.query.search,
            'api-key': API_KEY,
            sort: request.query.sort || 'newest'
        };

        server.methods.getArticle(options, function (err, result) {

            if (err) {
                throw err;
            }

            reply(result.response.docs[0]);
        });
    }
});

server.start(function () {
    console.log('Server started');
});
