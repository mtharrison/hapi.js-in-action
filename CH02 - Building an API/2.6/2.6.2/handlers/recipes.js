'use strict';

exports.find = function (request, reply) {

    let sql = 'SELECT * FROM recipes';
    const params = [];

    if (request.query.cuisine) {
        sql += ' WHERE cuisine = ?';
        params.push(request.query.cuisine);
    }

    this.db.all(sql, params, (err, results) => {

        if (err) {
            throw err;
        }

        reply(results);
    });
};

exports.findOne = function (request, reply) {

    this.db.get('SELECT * FROM recipes WHERE id = ?', [request.params.id], (err, result) => {

        if (err) {
            throw err;
        }

        if (typeof result !== 'undefined') {
            reply(result);
        }
        else {
            reply('Not found').code(404);
        }
    });
};

exports.create = function (request, reply) {

    const sql = 'INSERT INTO recipes (name, cooking_time, prep_time, serves, cuisine, ingredients, directions, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';

    this.db.run(sql,
        [
            request.payload.name,
            request.payload.cooking_time,
            request.payload.prep_time,
            request.payload.serves,
            request.payload.cuisine,
            request.payload.ingredients,
            request.payload.directions,
            request.auth.credentials.id
        ],
    (err) => {

        if (err) {
            throw err;
        }

        reply({ status: 'ok' });
    });
};
