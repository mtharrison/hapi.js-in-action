'use strict';

const Wreck = require('wreck');

exports.login = function (request, reply) {

    const apiUrl = this.apiBaseUrl + '/login';

    Wreck.post(apiUrl, {
        payload: JSON.stringify(request.payload),
        json: true
    }, (err, res, payload) => {

        if (err) {
            throw err;
        }

        if (res.statusCode !== 200) {
            return reply.redirect(this.webBaseUrl + '/login');
        }

        request.cookieAuth.set({
            loggedIn: true,
            token: payload.token
        });
        reply.redirect(this.webBaseUrl);
    });
};
