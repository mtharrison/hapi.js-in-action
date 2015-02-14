var Wreck = require('wreck');

exports.login = function (request, reply) {

	var self = this;

    var apiUrl = this.API_BASE_URL + '/login';

    Wreck.post(apiUrl, {
        payload: JSON.stringify(request.payload),
        json: true
    }, function (err, res, payload) {

        if (err) {
            throw err;
        }

        if (res.statusCode !== 200) {
            reply.redirect(self.WEB_BASE_URL + '/login');
        } else {
            request.session.set('user', {
                loggedIn: true, 
                token: payload.token
            });
            reply.redirect(self.WEB_BASE_URL);
        }

    });

};

exports.logout = function (request, reply) {

    request.session.clear('user');
    reply.redirect(this.WEB_BASE_URL);
};

exports.create = function (request, reply) {

	var self = this;

    var apiUrl = this.API_BASE_URL + '/recipes';

    Wreck.post(apiUrl, {
        payload: JSON.stringify(request.payload),
        headers: {
            'Authorization': 'Bearer ' + request.session.get('user').token
        }
    }, function (err, res, payload) {

        reply.redirect(self.WEB_BASE_URL);
    });
};

exports.star = function (request, reply) {

	var self = this;

    var apiUrl = this.API_BASE_URL + '/recipes/' + request.params.id + '/star';

    Wreck.post(apiUrl, function (err, res, payload) {
        
        reply.redirect(self.WEB_BASE_URL + '/recipes/' + request.params.id);
    });
};

exports.serveStatic = {
    directory: {
        path: 'public'
    }
};