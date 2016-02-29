'use strict';

const Code = require('code');
const Lab = require('lab');

const expect = Code.expect;
const lab = exports.lab = Lab.script();
const experiment = lab.experiment;
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

experiment('Test Authenticated Route', () => {

    test('Authenticates successfully (custom header)', (done) => {

        const options = {
            method: 'GET',
            url: '/',
            headers: {
                authorization: 'Basic ' + new Buffer('john:secret').toString('base64')
            }
        };

        server.inject(options, (res) => {

            expect(res.statusCode).to.equal(200);
            expect(res.payload).to.equal('hello john');
            done();
        });
    });

    test('Authenticates successfully (passing credentials)', (done) => {

        const options = {
            method: 'GET',
            url: '/',
            credentials: {
                username: 'steve'
            }
        };

        server.inject(options, (res) => {

            expect(res.statusCode).to.equal(200);
            expect(res.payload).to.equal('hello steve');
            done();
        });
    });

    test('fails for a non-existent user', (done) => {

        const options = {
            method: 'GET',
            url: '/',
            headers: {
                authorization: 'Basic ' + new Buffer('steve:pass').toString('base64')
            }
        };

        server.inject(options, (res) => {

            expect(res.statusCode).to.equal(401);
            done();
        });
    });
});
