var Wreck = require('wreck');

exports.login = function (request, reply) {

	var self = this;

    var apiUrl = this.apiBaseUrl + '/login';

    Wreck.post(apiUrl, {
        payload: JSON.stringify(request.payload),
        json: true
    }, function (err, res, payload) {

        if (err) {
            throw err;
        }

        if (res.statusCode !== 200) {
            reply.redirect(self.webBaseUrl + '/login');
        } else {
            request.session.set('user', {
                loggedIn: true, 
                token: payload.token
            });
            reply.redirect(self.webBaseUrl);
        }

    });

};

exports.logout = function (request, reply) {

    request.session.clear('user');
    reply.redirect(this.webBaseUrl);
};

exports.create = function (request, reply) {

	var self = this;

    var apiUrl = this.apiBaseUrl + '/recipes';

    Wreck.post(apiUrl, {
        payload: JSON.stringify(request.payload),
        headers: {
            'Authorization': 'Bearer ' + request.session.get('user').token
        }
    }, function (err, res, payload) {

        reply.redirect(self.webBaseUrl);
    });
};

exports.star = function (request, reply) {

	var self = this;

    var apiUrl = this.apiBaseUrl + '/recipes/' + request.params.id + '/star';

    Wreck.post(apiUrl, function (err, res, payload) {
        
        reply.redirect(self.webBaseUrl + '/recipes/' + request.params.id);
    });
};

exports.serveStatic = {
    directory: {
        path: 'public'
    }
};