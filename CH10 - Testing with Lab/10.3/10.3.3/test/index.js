'use strict';

const Code = require('code');
const Lab = require('lab');

const expect = Code.expect;
const lab = exports.lab = Lab.script();
const experiment = lab.experiment;
const test = lab.test;
const before = lab.before;

let server;

before(function (done) {

    require('..')(function (err, srv) {

        server = srv;
        done();
    });
});

experiment('Test POST /user', () => {

    test('it adds two numbers', (done) => {

        const user = {
            name: {
                first: 'Craig',
                last: 'Railton'
            },
            age: 29
        };

        const options = {
            method: 'POST',
            url: '/user',
            payload: user
        };

        const start = Date.now();

        server.inject(options, (res) => {

            expect(res.statusCode).to.equal(200);
            var response = JSON.parse(res.payload);
            expect(response).to.deep.include(user);
            expect(response.createdAt)
                .to.be.greaterThan(start)
                .and.to.be.lessThan(Date.now());
            done();
        });
    });

    test('age must be a number or numeric string', (done) => {

        const user = {
            name: {
                first: 'Craig',
                last: 'Railton'
            },
            age: 'potato'
        };

        const options = {
            method: 'POST',
            url: '/user',
            payload: user
        };

        const start = Date.now();

        server.inject(options, (res) => {

            expect(res.statusCode).to.equal(400);
            var response = JSON.parse(res.payload);
            expect(response.message).to.equal('child "age" fails because ["age" must be a number]');
            done();
        });
    });
});
