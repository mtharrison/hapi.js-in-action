var Catbox = require('catbox');
var CatboxMemory = require('catbox-memory');
var Wreck = require('wreck');

var search = function (id, next) {

    var baseUrl = 'http://api.nytimes.com/svc/search/v2/articlesearch';
    var apiKey = '6e4deaad56fa6f8bbb47dcc4fa700ba6:5:72077307';
    var query = 'Node.js';

    var url = baseUrl + '.json?q=' + query + '&api-key=' + apiKey;

    Wreck.get(url, { json: true }, function (err, res, payload) {

        if (err) {
            return next(err, null);
        }

        var numArticles = payload.response.meta.hits;
        next(err, numArticles);
    });
};

var loop = function () {

    var startTime = Date.now();

    policy.get('node.js', function (err, value, cached, report) {

        if (err) {
            throw err;
        }

        var endTime = Date.now() - startTime;
        console.log('Found %d articles in %dms %s %s', value, endTime, cached ? '(CACHED)' : '', cached && cached.isStale ? '(STALE)' : '');
    });

};

var client = new Catbox.Client(CatboxMemory);

var options = {
    expiresIn: 20000,
    staleIn: 2000,
    staleTimeout: 90,
    generateFunc: search,
    generateTimeout: false
};

var policy = new Catbox.Policy(options, client, 'default');

client.start(function (err) {

    if (err) {
        throw err;
    }

    setInterval(loop, 2000);
});
