'use strict';

const Code = require('code');
const Lab = require('lab');

const expect = Code.expect;
const lab = exports.lab = Lab.script();
const test = lab.test;
const before = lab.before;

let server;

before((done) => {

    require('..')((err, srv) => {

        if (err) {
            throw err;
        }

        server = srv;
        done();
    });
});

test('it adds two numbers', (done) => {

    server.inject('/add?a=1&b=2', (res) => {

        expect(res.statusCode).to.equal(200);
        expect(res.payload).to.equal('3');
        done();
    });
});
