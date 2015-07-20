exports.find = function (request, reply) {

    var sql = 'SELECT * FROM recipes';
    var params = [];

    if (request.query.cuisine) {
        sql += ' WHERE cuisine = ?';
        params.push(request.query.cuisine);
    }

    this.db.all(sql, params, function (err, results) {

        if (err) {
            throw err;
        }

        reply(results);
    });
};

exports.findOne = function (request, reply) {

    this.db.get('SELECT * FROM recipes WHERE id = ?', [request.params.id], function (err, result) {

        if (err) {
            throw err;
        }

        if (typeof result !== 'undefined') {
            reply(result);
        } else {
            reply('Not found').code(404);
        }
    });
};
