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

    console.log('Starting test 1');

    server.inject('/add?a=1&b=2', (res) => {

        expect(res.statusCode).to.equal(200);
        expect(res.payload).to.equal('3');
        console.log('Finishing test 1');
        done();
    });
});

test('it multiplies two numbers', (done) => {

    console.log('Starting test 2');

    server.inject('/multiply?a=5&b=4', (res) => {

        expect(res.statusCode).to.equal(200);
        expect(res.payload).to.equal('20');
        console.log('Finishing test 2');
        done();
    });
});
