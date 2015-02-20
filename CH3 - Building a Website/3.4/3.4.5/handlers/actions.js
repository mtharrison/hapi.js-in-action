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

exports.createRecipe = function (request, reply) {

    var self = this;

    var apiUrl = this.apiBaseUrl + '/recipes';
    var token = request.session.get('user').token;

    Wreck.post(apiUrl, {
        payload: JSON.stringify(request.payload),
        headers: {  
            'Authorization': 'Bearer ' + token
        }
    }, function (err, res, payload) {


        if(err) {
            throw err;
        }

        reply.redirect(self.webBaseUrl);
    });
};

exports.logout = function (request, reply) {

    request.session.clear('user');
    reply.redirect(this.webBaseUrl);
};