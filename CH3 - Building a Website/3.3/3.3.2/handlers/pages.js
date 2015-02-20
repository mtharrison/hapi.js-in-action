var Wreck = require('wreck');

exports.home = function (request, reply) {

    var apiUrl = this.apiBaseUrl + '/recipes';

    Wreck.get(apiUrl, {json: true}, function (err, res, payload) {

        if (err) {
            throw err;
        }

        reply.view('index', {
            recipes: payload
        });
    });

};