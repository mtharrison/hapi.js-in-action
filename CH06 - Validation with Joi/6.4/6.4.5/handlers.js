'use strict';

exports.form = function (request, reply) {

    if (request.method === 'post') {
        return reply.redirect('/success');
    }

    reply.view('form');
};

exports.success = function (request, reply) {

    reply.view('success');
};
