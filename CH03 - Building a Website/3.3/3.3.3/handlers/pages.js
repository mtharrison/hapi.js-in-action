'use strict';

const Wreck = require('wreck');

exports.home = function (request, reply) {

    const apiUrl = this.apiBaseUrl + '/recipes';

    Wreck.get(apiUrl, { json: true }, (err, res, payload) => {

        if (err) {
            throw err;
        }

        reply.view('index', {
            recipes: payload
        });
    });
};

exports.viewRecipe = function (request, reply) {

    const apiUrl = this.apiBaseUrl + '/recipes/' + request.params.id;

    Wreck.get(apiUrl, { json: true }, (err, res, payload) => {

        if (err) {
            throw err;
        }

        reply.view('recipe', {
            recipe: payload
        });
    });
};
