var Hapi = require('hapi');
var Wreck = require('wreck');

var server = new Hapi.Server();
server.connection({ port: 4000 });

var getNewestArticle = function (search, next) {

    var url = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=XXX&sort=newest&q=' + search;

    Wreck.get(url, { json: true }, function (err, res, payload) {

        if (err) {
            return next(err);
        }

        next(null, payload);
    });
};

server.method('getNewestArticle', getNewestArticle, {
    cache: {
        expiresIn: 5000
    }
});

server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {

        var search = request.query.search;

        server.methods.getNewestArticle(search, function (err, result) {

            if (err) {
                throw err;
            }

            console.log('Processed the search request for "%s" in %sms', search, Date.now() - request.info.received);

            reply(result.response.docs[0]);
        });
    }
});

server.start();
